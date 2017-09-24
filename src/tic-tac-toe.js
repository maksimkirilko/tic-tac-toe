class TicTacToe {
    constructor() {
        this.size = 3;
        this.initPlayerSymbol = 'x';
        this.currentPlayerSymbol = this.initPlayerSymbol;
        this.tableStorage = this.generateArray();
    }

    getCurrentPlayerSymbol() {
        return this.currentPlayerSymbol;
    }

    nextTurn(rowIndex, columnIndex) {
        if (this.tableStorage[rowIndex][columnIndex]) {
            return null;
        }
        this.tableStorage[rowIndex][columnIndex] = this.currentPlayerSymbol;
        this.currentPlayerSymbol = TicTacToe.nextStep(this.currentPlayerSymbol);
    }

    isFinished() {
        return !!this.getWinner() || this.noMoreTurns();
    }

    getWinner() {
        const b = this.tableStorage;
        for (let i = 0; i < b.length; i++) {
            const check = TicTacToe.chain(b[i]);
            if (check) return check;
            for (let j = 0; j < b[i].length; j++) {
                if (i === 0 &&
                    ( (b[i][j] === b[i+1][j] && b[i+1][j] === b[i+2][j])
                    || (b[i][j] === b[i+1][j+1] && b[i+1][j+1] === b[i+2][j+2])
                    || (b[i][j] === b[i+1][j-1] && b[i+1][j-1] === b[i+2][j-2]) )
                ) {
                    return b[i][j];
                }
            }
        }
        return null;
    }

    noMoreTurns() {
        const array = [];
        this.tableStorage.forEach(item => array.push(...item));
        return array.filter(item => item !== null).length === array.length;
    }

    isDraw() {
        return !this.getWinner() && this.noMoreTurns();
    }

    getFieldValue(rowIndex, colIndex) {
        return this.tableStorage[rowIndex][colIndex];
    }

    static nextStep(currentSymbol) {
        return currentSymbol === 'x' ? 'o' : 'x';
    }

    generateArray(length = 3, value = null) {
        return Array.from({ length },
            () => Array.from({ length }, () => null));
    }

    static chain(row) {
        if (row.every(item => item === 'x')) {
            return 'x';
        } else if (row.every(item => item === 'o')) {
            return 'o';
        }
        return null;
    }
}

module.exports = TicTacToe;
