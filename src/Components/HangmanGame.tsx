import { HangmanDrawing } from "./HangmanDrawing.tsx";
import { HangmanWord } from "./HangmanWord.tsx";
import { Keyboard } from "./Keyboard.tsx";
import "./HangmanGame.css"
import words from "../wordList.json";
import { useCallback, useEffect, useState } from "react";

function getWord() {
    return words[Math.floor(Math.random() * words.length)];
}

export function HangmanGame() {
    const [wordToGuess, setWordToGuess] = useState(getWord);
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    console.log(wordToGuess);

    const incorrectLetters = guessedLetters.filter(
        (letter) => !wordToGuess.includes(letter)
    );

    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess
        .split("")
        .every((letter) => guessedLetters.includes(letter));

    const addGuessedLetter = useCallback(
        (letter: string) => {
            if (guessedLetters.includes(letter) || isWinner || isLoser) return;

            setGuessedLetters((currentLetters) => [...currentLetters, letter]);
        },
        [guessedLetters, isWinner, isLoser]
    );

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if (!key.match(/^[a-z]$/)) return;
            e.preventDefault();
            addGuessedLetter(key);
        };

        document.addEventListener("keypress", handler);
        return () => {
            document.removeEventListener("keypress", handler);
        };
    }, [addGuessedLetter]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key !== "Enter") return;
            e.preventDefault();
            setGuessedLetters([]);
            setWordToGuess(getWord());
        };

        document.addEventListener("keypress", handler);
        return () => {
            document.removeEventListener("keypress", handler);
        };
    }, []);

    return (
        <div className={"main"}>
            <div className={"endText"}>
                {isWinner && "Winner! - Press ENTER or refresh to try again"}
                {isLoser && "Loser! - Press ENTER or refresh to try again"}
            </div>
            <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
            <HangmanWord
                reveal={isLoser}
                guessedLetters={guessedLetters}
                wordToGuess={wordToGuess}
            />
            <div style={{ alignSelf: "stretch" }}>
                <Keyboard
                    disabled={isLoser || isWinner}
                    activeLetters={guessedLetters.filter((letter) =>
                        wordToGuess.includes(letter)
                    )}
                    inactiveLetters={incorrectLetters}
                    addGuessedLetter={addGuessedLetter}
                />
            </div>
        </div>
    );
}

export default HangmanGame;
