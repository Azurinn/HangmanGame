import styles from "./HangmanWord.module.css"
type HangmanWordProps = {
    guessedLetters: string[]
    wordToGuess: string
    reveal? :boolean
}
export function HangmanWord({guessedLetters,wordToGuess,reveal=false}:HangmanWordProps) {

    return <div className={styles.letters}>
        {wordToGuess.split("").map((letter, index) => (
            <span className={styles.underscore} key={index}>
                <span style={{visibility: guessedLetters.includes(letter) || reveal ? 'visible' : "hidden",
                color: !guessedLetters.includes(letter) && reveal ? "red" :"black"
                }}>
                    {letter}
                </span>
            </span>))}
    </div>
}