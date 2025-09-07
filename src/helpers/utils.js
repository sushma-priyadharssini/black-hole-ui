const PYRAMID_BASE_COUNT = 6; // Base row has 6 squares

export const getWinner = (firstCount, secondCount) => {
    let score, winner;
    if (firstCount > secondCount) {
        score = (firstCount - secondCount);
        winner = 'P2';
    } else if (firstCount < secondCount) {
        score = (secondCount - firstCount);
        winner = 'P1';
    } else {
        score = 0;
        winner = 'tie';
    }
    return { score, winner };
}

export const getScoreBoardMessage = (playerType, winner, score) => {
    if (score === 0) {
        return 'The game ended in tie!'
    }
    if (winner === playerType) {
        return `Yay! You won by ${score} points`;
    } else {
        return `Uh oh! You lost by ${score} points`;
    }
}

export const initializeBoard = () => {
    return Array.from({ length: PYRAMID_BASE_COUNT }, (_, rowIndex) =>
        Array.from({ length: PYRAMID_BASE_COUNT - rowIndex }, () => ({ text: '?', color: "#959ba5" }))
    ).reverse();
}

export const findBlackHole = (board) => {
    return board.reduce((found, row, rowIndex) => {
        if (found) return found; // already found
        const colIndex = row.findIndex(val => val === '?');
        return colIndex !== -1 ? [rowIndex, colIndex] : null;
    }, null);
}