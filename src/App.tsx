import {useCallback, useEffect, useState} from "react";
import words from './wordList.json'
import {HangmanDrawing} from "./Components/HangmanDrawing.tsx";
import {HangmanWord} from "./Components/HangmanWord.tsx";
import {Keyboard} from "./Components/Keyboard.tsx";
function getWord(){
    return words[Math.floor(Math.random() * words.length)];
}
function App() {
    const [wordToGuess, setWordToGuess] = useState(getWord)
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    console.log(wordToGuess)

    const incorrectLetters = guessedLetters.filter(
        letter => !wordToGuess.includes(letter)
    );

    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess
        .split('')
        .every(letter => guessedLetters.includes(letter))
    const addGuessedLetter = useCallback(
        (letter: string) => {
            if (guessedLetters.includes(letter) || isWinner || isLoser) return

            setGuessedLetters(currentLetters => [...currentLetters, letter])

        }, [guessedLetters,isWinner,isLoser])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key
            if (!key.match(/^[a-z]$/)) return
            e.preventDefault()
            addGuessedLetter(key)
        }
        document.addEventListener('keypress', handler);
        return () => {
            document.removeEventListener("keypress", handler);
        }
    }, [guessedLetters])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key
            if (key !== "Enter") return
            e.preventDefault()
            setGuessedLetters([])
            setWordToGuess(getWord())
        }
        document.addEventListener('keypress', handler);
        return () => {
            document.removeEventListener("keypress", handler);
        }
    }, [guessedLetters])
    return (
        <div style={{
            maxWidth: '800px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            margin: '0 auto',
            alignItems: 'center',
        }}>
            <div style={{
                fontSize: '2rem',
                textAlign: 'center'
            }}
            >
                {isWinner && "Winner! - Refresh to try again"}
                {isLoser && "Looser (L)! - Refresh to try again"}
            </div>
            <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
            <HangmanWord
                reveal={isLoser}
                guessedLetters={guessedLetters}
                wordToGuess={wordToGuess}/>
            <div style={{alignSelf: "stretch"}}>
                <Keyboard
                    disabled={isLoser || isWinner}
                    activeLetters={guessedLetters.filter(letter =>
                        wordToGuess.includes(letter)
                    )}
                    inactiveLetters={incorrectLetters}
                    addGuessedLetter={addGuessedLetter}
                />
            </div>
        </div>
    )
}

export default App
