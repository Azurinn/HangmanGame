import styles from "./HangmanDrawing.module.css"
const HEAD = (
    <div className={styles.head}>
        <div className={styles.eye} style={{ top: '15px', left: '12px' }}></div>
        <div className={styles.eye} style={{ top: '15px', right: '12px' }}></div>
        <div className={styles.mouth}></div>
    </div>
);

const BODY = (
    <div className={styles.body}/>
)
const RIGHT_ARM = (
    <div className={styles.right_arm}/>
)
const LEFT_ARM = (
    <div className={styles.left_arm}/>
)
const RIGHT_LEG = (
    <div className={styles.right_leg}/>
)
const LEFT_LEG = (
    <div className={styles.left_leg}/>
)
type HangmanDrawingProps = {
    numberOfGuesses: number
}
const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

export function HangmanDrawing({numberOfGuesses}: HangmanDrawingProps) {
    return <div
        className={styles.hanger}>
        {BODY_PARTS.slice(0,numberOfGuesses)}
        <div className={styles.hanger_part4}/>
        <div className={styles.hanger_part3}/>
        <div className={styles.hanger_part2}/>
        <div className={styles.hanger_part1}/>
    </div>
}