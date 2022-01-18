// @ts-ignore
import {Dictionary} from "./dictionary.ts";

/** Util Constants **/
export const Attempts = 6;
export const WordLength = 5;
export const KeyRows = [
    "QWERTYUIOP",
    "ASDFGHJKL",
    "!ZXCVBNM?"
];
export const DICTIONARY = new Dictionary();
export const SEED_URL_PREFIX = "https://wordle.earman.io/?seed=";


/** Util Enums, Types, & Interfaces **/
interface Square {
    value: string;
    letterState: LetterState;
}
export type Row = Square[];
export type Rows = Row[];

export enum LetterState {
    none,
    wrongSpot,
    rightSpot,
    wrong
}

export enum KeyType {
    letter,
    large
}

/** Util Functions **/
export function validateWord(word: Row, correctWord: String): LetterState[] {
    let rowWord = word.map(e => e.value).join("");
    let letterStates = new Array(WordLength).fill(null);
    let validChars = correctWord.split("")

    // check for perfect matches first
    for (let i = 0; i < WordLength; i++) {
        if (rowWord[i] === correctWord[i]) {
            letterStates[i] = (LetterState.rightSpot);
            validChars[i] = "?"; // wipe the used letters from the remaining chars for the wrong space check
        }
    }

    for (let i = 0; i < WordLength; i++) {
        if (rowWord[i] === correctWord[i]) {
            // letterStates.push(LetterState.rightSpot);
        } else if (validChars.includes(rowWord[i])) {
            letterStates[i] = LetterState.wrongSpot;
            let wipeIndex = validChars.indexOf(rowWord[i]);
            validChars[wipeIndex] = "?";
        } else {
            letterStates[i] = LetterState.wrong;
        }
    }
    return letterStates;
}

export function keyStates(attempts: Rows): Map<string, LetterState> {
    let lMap = new Map<string, LetterState>()
    for (let i = 0; i < attempts.length; i++) {
        let attempt = attempts[i];
        // Mark all correct letters
        for (let j = 0; j < attempt.length; j++) {
            let letter = attempt[j].value;
            let state = attempt[j].letterState;

            if (LetterState.rightSpot === state) {
                lMap.set(letter, state);
            }
        }

        // Mark all wrong or wrongSpot letters
        for (let j = 0; j < attempt.length; j++) {
            let letter = attempt[j].value;
            let state = attempt[j].letterState;
            if (!lMap.has(letter) || LetterState.none === lMap.get(letter)) {
                // none -> wrong || wrongSpot
                lMap.set(letter, state);
            }
        }
    }
    return lMap;
}

export function remainingWords(attempts: Rows): string[] {
    let words = DICTIONARY.wordList;
    let inWord = new Set<string>();

    // Filter words with all letters we know are in the right spot
    // Filter words with all letters we know are in the word but wrong spot
    for (let i = 0; i < attempts.length; i++) {
        let attempt = attempts[i];
        for (let j = 0; j < attempt.length; j++) {
            let letter = attempt[j].value;
            let state = attempt[j].letterState;
            if (LetterState.rightSpot === state) {
                words = words.filter(word => word[j] === letter);
                inWord.add(letter);
            } else if (LetterState.wrongSpot === state) {
                words = words.filter(word => word.includes(letter) && word[j] !== letter);
                inWord.add(letter);
            }
        }
    }

    // Filter words with all letters we know aren't in unclaimed spots
    for (let i = 0; i < attempts.length; i++) {
        let attempt = attempts[i];
        for (let j = 0; j < attempt.length; j++) {
            let letter = attempt[j].value;
            let state = attempt[j].letterState;
            if (LetterState.wrong === state) {
                if (!inWord.has(letter)) {
                    words = words.filter(word => !word.includes(letter));
                } else {
                    /** there is a case here which I dont feel like adding right now, where a squares
                     *   state is "wrong" but it is still in the word.
                     *   Ex. guess: STEEL for word: EARNS
                     *   In this case the first E or STEEL is LetterState.wrongSpot and the second is LetterState.wrong
                     *   In the above filtering, b/c E is in the inWord set, then we dont treat it like a normal "wrong" letter
                     *   But we also _miss_ information b/c we do know that E is not in that 4th character spot.
                     */
                    words = words.filter(word => word[j] !== letter);
                    /** TODO: we should technically check cardinality of occurrences of the letter here because
                     *        we have additional information on that, but I'm too lazy right now to implement it (or
                     *        realistically too lazy to build the appropriate unit test that exposes the bug).
                     */
                }
            }
        }
    }
    console.log(words);
    console.log(words.map(word => DICTIONARY.define(word)))
    return words;
}