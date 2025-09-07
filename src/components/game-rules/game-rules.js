import styles from "./rules.module.css"

const GameRules = () => {
    return <div className={styles.rulesContainer}>
        <h2 className={styles.rulesTitle}>Game Rules</h2>
        <ul className={styles.gameRules}>
            <li className={styles.ruleItem}>Black Hole is a two-player strategy game where each player starts with 10 tiles numbered 1 through 10. </li>
            <li className={styles.ruleItem}>The number on the tiles represent both their values and the order in which they are placed onto a triangular board. </li>
            <li className={styles.ruleItem}>The board has 21 spaces so one space remains uncovered. </li>
            <li className={styles.ruleItem}> Once all the tiles have been placed, the tiles that surround the empty space are sucked into the black hole. </li>
            <li className={styles.ruleItem}>The objective of the game is to have fewer points sucked into the black hole (so you have the higher overall score remaining on the board) than the other player.</li>
        </ul>
    </div>
}

export default GameRules;