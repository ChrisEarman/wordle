import {keyStates, LetterState, remainingWords, Row, validateWord} from "./wordleUtils";


function rowMock(word: string): Row {
    let out = [];
    for (let i = 0; i < word.length; i++) {
        out.push({value: word[i], letterState: LetterState.none});
    }
    return out;
}

/** ValidateWords tests **/
test("validateWord hello hello", () => {
    const hello = validateWord(rowMock("HELLO"),
        "HELLO");
    let expected = [
        LetterState.rightSpot,
        LetterState.rightSpot,
        LetterState.rightSpot,
        LetterState.rightSpot,
        LetterState.rightSpot];
    expect(hello).toEqual(expected)
})

test("validateWord hello great", () => {
    const great = validateWord(rowMock("HELLO"),
        "GREAT");
    let expected = [
        LetterState.wrong,
        LetterState.wrongSpot,
        LetterState.wrong,
        LetterState.wrong,
        LetterState.wrong];
    expect(great).toEqual(expected)
})

test("validateWord hotel hello", () => {
    const hotel = validateWord(rowMock("HOTEL"),
        "HELLO");
    let expected = [
        LetterState.rightSpot,
        LetterState.wrongSpot,
        LetterState.wrong,
        LetterState.wrongSpot,
        LetterState.wrongSpot]
    expect(hotel).toEqual(expected)
})

test("validateWord catch watch", () => {
    const watch = validateWord(rowMock("CATCH"),
        "WATCH");
    let expected = [
        LetterState.wrong,
        LetterState.rightSpot,
        LetterState.rightSpot,
        LetterState.rightSpot,
        LetterState.rightSpot]
    expect(watch).toEqual(expected)
})

test("validateWord spell lofty", () => {
    const watch = validateWord(rowMock("SPELL"),
        "LOFTY");
    let expected = [
        LetterState.wrong,
        LetterState.wrong,
        LetterState.wrong,
        LetterState.wrongSpot,
        LetterState.wrong]
    expect(watch).toEqual(expected)
})

test("validateWord puffy lofty", () => {
    const watch = validateWord(rowMock("PUFFY"),
        "LOFTY");
    let expected = [
        LetterState.wrong,
        LetterState.wrong,
        LetterState.rightSpot,
        LetterState.wrong,
        LetterState.rightSpot]
    expect(watch).toEqual(expected)
})

/** KeyStates tests **/
test("keyStates motor vizor", () => {
    const guess = rowMock("MOTOR");
    const guessValidation = validateWord(guess,
        "VIZOR");
    for (let i = 0; i < guess.length; i++) {
        guess[i].letterState = guessValidation[i];
    }
    const states = keyStates([guess]);
    let expected = new Map<string, LetterState>([
        ["M", LetterState.wrong],
        ["O", LetterState.rightSpot],
        ["T", LetterState.wrong],
        ["R", LetterState.rightSpot]
    ]);
    expect(states).toEqual(expected);
})

test("keyStates motro vizor", () => {
    const guess = rowMock("MOTRO");
    const guessValidation = validateWord(guess,
        "VIZOR");
    for (let i = 0; i < guess.length; i++) {
        guess[i].letterState = guessValidation[i];
    }
    const states = keyStates([guess]);
    let expected = new Map<string, LetterState>([
        ["M", LetterState.wrong],
        ["O", LetterState.wrongSpot],
        ["T", LetterState.wrong],
        ["R", LetterState.wrongSpot]
    ]);
    expect(states).toEqual(expected);
})

/** RemainingWords tests **/
test("remainingWords globe, shady, mucky, tripy", () => {
    const globe = rowMock("GLOBE").map(orig => { return {...orig, letterState: LetterState.wrong}});
    const shady = rowMock("SHADY").map(orig => { return {...orig, letterState: LetterState.wrong}});
    shady[4].letterState = LetterState.rightSpot;
    const mucky = rowMock("MUCKY").map(orig => { return {...orig, letterState: LetterState.wrong}});
    mucky[4].letterState = LetterState.rightSpot;
    const tripy = rowMock("TRIPY").map(orig => { return {...orig, letterState: LetterState.wrong}});
    tripy[4].letterState = LetterState.rightSpot;
    tripy[2].letterState = LetterState.wrongSpot;

    const remaining = remainingWords([globe, shady, mucky, tripy])
    let expected = ["FINNY", "FIZZY", "NIFFY", "NINNY"];
    expect(remaining).toEqual(expected);
})

test("remainingWords minty, never, rants, under, plows", () => {
    const minty = rowMock("MINTY").map(orig => { return {...orig, letterState: LetterState.wrong}});
    minty[2].letterState = LetterState.wrongSpot;
    const never = rowMock("NEVER").map(orig => { return {...orig, letterState: LetterState.wrong}});
    never[0].letterState = LetterState.wrongSpot;
    never[4].letterState = LetterState.wrongSpot;
    const rants = rowMock("RANTS").map(orig => { return {...orig, letterState: LetterState.wrong}});
    rants[0].letterState = LetterState.wrongSpot;
    rants[2].letterState = LetterState.wrongSpot;
    const under = rowMock("UNDER").map(orig => { return {...orig, letterState: LetterState.wrong}});
    under[0].letterState = LetterState.rightSpot;
    under[1].letterState = LetterState.wrongSpot;
    under[4].letterState = LetterState.wrongSpot;
    const plows = rowMock("PLOWS").map(orig => { return {...orig, letterState: LetterState.wrong}});
    plows[0].letterState = LetterState.wrongSpot;

    const remaining = remainingWords([minty, never, rants, under, plows])
    let expected = ["UPRUN"];
    expect(remaining).toEqual(expected);
})

test("remainingWords help", () => {
    const plays = rowMock("PLAYS").map(orig => { return {...orig, letterState: LetterState.wrong}});
    plays[4].letterState = LetterState.rightSpot;
    const rites = rowMock("RITES").map(orig => { return {...orig, letterState: LetterState.wrong}});
    rites[3].letterState = LetterState.rightSpot;
    rites[4].letterState = LetterState.rightSpot;
    const bones = rowMock("BONES").map(orig => { return {...orig, letterState: LetterState.wrong}});
    bones[3].letterState = LetterState.rightSpot;
    bones[4].letterState = LetterState.rightSpot;
    const dukes = rowMock("DUKES").map(orig => { return {...orig, letterState: LetterState.wrong}});
    dukes[1].letterState = LetterState.rightSpot;
    dukes[3].letterState = LetterState.rightSpot;
    dukes[4].letterState = LetterState.rightSpot;
    const muses = rowMock("MUSES").map(orig => { return {...orig, letterState: LetterState.wrong}});
    muses[1].letterState = LetterState.rightSpot;
    muses[3].letterState = LetterState.rightSpot;
    muses[4].letterState = LetterState.rightSpot;

    const remaining = remainingWords([plays, rites, bones, dukes, muses])
    let expected = ["FUZES"];
    expect(remaining).toEqual(expected);
})