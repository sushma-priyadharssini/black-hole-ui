import styles from './home.module.css';
import LoginForm from "../login-form/form";
import GameRules from "../game-rules/game-rules"


const Home = () => {
    return <div className={styles.loginContainer}>
        <h2 className={styles.gameTitle}>Black Hole Game</h2>
        <GameRules />
        <LoginForm />
    </div>
};

export default Home;
