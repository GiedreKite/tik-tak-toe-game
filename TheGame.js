export class TheGame {
    constructor() {
        this.winCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ];
        this.boxes = document.querySelectorAll('.box');
        this.isGameOver = false;
        this.currPlayer = 'X';
        this.board = [];
        this.gameData = [0, 0];
        this.data = [];
        this.xPlayerDOM = document.querySelector('.xPlayer');
        this.oPlayerDOM = document.querySelector('.oPlayer');
        this.gameStart();
        this.showScore()
        this.restart();
    }

    showScore() {
        this.data = JSON.parse(localStorage.getItem('gameData', this.gameData))
        if (this.data !== null) {
            this.gameData = this.data
            this.xPlayerDOM.textContent = this.data[0];
            this.oPlayerDOM.textContent = this.data[1];
        } else {
            this.xPlayerDOM.textContent = 0;
            this.oPlayerDOM.textContent = 0;
        }
    }

    gameStart() {
        for (let i = 0; i < this.boxes.length; i++) {
            const eventHandler = () => {
                if (this.boxes[i].textContent !== '') {
                    return;
                }
                if (this.isGameOver !== true) {
                    this.boxes[i].textContent = this.checkBox();
                    this.checkWin();
                    this.checkend();
                }
            }
            this.boxes[i].addEventListener('click', eventHandler);
        }
    }

    restart() {
        const restartBtn = document.querySelector('button');
        const endDOM = document.querySelector('.end');
        restartBtn.addEventListener('click', () => {
            for (let i = 0; i < this.boxes.length; i++) {
                this.boxes[i].textContent = '';
                this.currPlayer = 'X';
                this.board = [];
                this.isGameOver = false;
                endDOM.textContent = '';
                if (this.boxes[i].classList.contains('winHighlight')) {
                    this.boxes[i].classList.remove('winHighlight');
                }
            }
            this.showScore()
        });
    }

    checkBox() {
        if (this.currPlayer === 'X') {
            this.currPlayer = 'O';
            this.board.push('X');
            return 'X';
        } else if (this.currPlayer === 'O') {
            this.currPlayer = 'X';
            this.board.push('O');
            return 'O'
        }
    }

    checkWin() {
        for (let i = 0; i < this.winCombos.length; i++) {
            const [a, b, c] = this.winCombos[i];
            if (this.boxes[a].textContent === 'X' && this.boxes[b].textContent === 'X' && this.boxes[c].textContent === 'X') {
                this.gameData[0]++
                this.isGameOver = true;
                this.boxes[a].classList.add('winHighlight');
                this.boxes[b].classList.add('winHighlight');
                this.boxes[c].classList.add('winHighlight');
                localStorage.setItem('gameData', JSON.stringify(this.gameData));
                this.showScore()
            } else if (this.boxes[a].textContent === 'O' && this.boxes[b].textContent === 'O' && this.boxes[c].textContent === 'O') {
                this.gameData[1]++;
                this.isGameOver = true;
                this.boxes[a].classList.add('winHighlight');
                this.boxes[b].classList.add('winHighlight');
                this.boxes[c].classList.add('winHighlight');
                localStorage.setItem('gameData', JSON.stringify(this.gameData));
                this.showScore()
            }
        }
        return this.isGameOver;
    }

    checkend() {
        const endDOM = document.querySelector('.end');
        if (this.board.length === 9) {
            this.isGameOver = true;
            endDOM.textContent = 'Dar kartą?';
        }
    }
}