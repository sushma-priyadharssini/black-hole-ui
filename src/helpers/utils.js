import { PYRAMID_BASE_COUNT, STATUS } from "./constants"

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
        Array.from({ length: PYRAMID_BASE_COUNT - rowIndex }, () => ({ text: '?', status: STATUS.DEFAULT }))
    ).reverse();
}

export const findBlackHole = (board) => {
    return board.reduce((found, row, rowIndex) => {
        if (found) return found; // already found
        const colIndex = row.findIndex(block => block.status === STATUS.DEFAULT);
        return colIndex !== -1 ? [rowIndex, colIndex] : null;
    }, null);
}

export const getNeighbours = ([row, column]) => {
    let neighbours = [];
    if ((row - 1) >= 0) {
        neighbours.push([row - 1, column]);
    }
    if ((column - 1) >= 0) {
        neighbours.push([row, column - 1]);
    }
    if ((row - 1) >= 0 && (column - 1) >= 0) {
        neighbours.push([row - 1, column - 1]);
    }
    if ((row + 1) <= 5) {
        neighbours.push([row + 1, column]);
    }
    if ((column + 1) <= 5) {
        neighbours.push([row, column + 1]);
    }
    if ((row + 1) <= 5 && (column + 1) <= 5) {
        neighbours.push([row + 1, column + 1]);
    }
    return neighbours;
}

export const calculateScore = (board, neighbours) => {
    let firstCount = 0,
        secondCount = 0;

    neighbours.forEach(([row, col]) => {
        const { text, status } = board[row][col];
        if (status !== STATUS.DEFAULT) {
            if (status === STATUS.P1) {
                firstCount = firstCount + text;
            } else {
                secondCount = secondCount + text;
            }
        }
    });

    return getWinner(firstCount, secondCount);
}