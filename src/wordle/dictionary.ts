// @ts-ignore
import {DICTIONARY_JSON} from "./dictionaryRaw.ts";

export class Dictionary {
    wordSet: Set<string>;
    wordList: Array<string>;
    wordMap: Map<string, string>;

    constructor() {
        this.wordMap = new Map<string, string>();
        this.wordList = new Array<string>();
        for (let value in DICTIONARY_JSON) {
            if (value.length === 5) {
                this.wordList.push(value);
                this.wordMap.set(value, DICTIONARY_JSON[value])
            }
        }
        this.wordSet = new Set<string>(this.wordList)
        console.log(this.wordMap.size)

    }

    define(word: string): string {
        return this.wordMap.get(word);
    }

    contains(word: string): boolean {
        return this.wordSet.has(word);
    }

    get_word_random() {
        console.log("random word")
        return this.wordList[Math.floor(Math.random()*this.wordList.length)];
    }

    get_word_seeded(seed: string) {
        console.log("seed word")
        let dIndex = 0;
        let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
        for (let i = 0; i < seed.length; i++) {
            let prime = primes[primes.length - (i % primes.length)]; // traversing primes backwards
            let incr = prime * seed.charCodeAt(i);
            if (!isNaN(incr)) {
                dIndex = dIndex + incr;
            }
        }
        let word = this.wordList[dIndex % this.wordList.length];
        console.log(dIndex, this.wordList.length, dIndex % this.wordList.length, word)
        return word;
    }
}