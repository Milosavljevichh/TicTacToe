
const turnDisplayer = document.getElementById('turnDisplayer');
const resultDisplayer = document.getElementById('resultDisplayer');

const Gameboard = (() => {

    let gameboard = document.querySelector(".game-board");
    let fieldsArr = [];

    const fieldFactory = (taken, mark) => {
        return {taken, mark};
    };
    
    const createGrid = () => {
        
        const turnHandler = (currentPlayer, nextPlayer, e, f) => {
                e.innerHTML = currentPlayer.marker;
                f.mark = currentPlayer.marker;
                f.taken = true;
                currentPlayer.showMarker();
                currentPlayer.turn = !currentPlayer.turn;
                nextPlayer.turn = !nextPlayer.turn;
                turnDisplayer.innerHTML = `Current player: ${nextPlayer.marker}`;
                checkForResult(currentPlayer);
        };

        for (i=0;i<9;i++) {
            let newField = {
                element: document.createElement("button"),
                field: fieldFactory(false, 'empty')
            }
            newField.element.classList.add("marker-field");
            
            newField.element.onclick = () => {
                if (!newField.field.taken) {
                    if (player1.turn) {
                        turnHandler(player1, player2, newField.element, newField.field);
                    } else if (player2.turn) {
                        turnHandler(player2, player1, newField.element, newField.field);
                    }
                }}
            gameboard.appendChild(newField.element);
            fieldsArr.push(newField);
        }};
    
    const playerFactory = (marker, turn) => {
        const showMarker = () => console.log(`Next marker:${marker}`)
        return {marker, turn, showMarker};
    };

    const player1 = playerFactory('X', true);
    const player2 = playerFactory('O', false);

    const checkForResult = (winningPlayer) => {

        let result = fieldsArr.every(function (e) {
            return e.field.taken;
        });

        let winningCondition = (() => {
            let con = [
                [fieldsArr[1].field.mark, fieldsArr[4].field.mark, fieldsArr[7].field.mark],
                [fieldsArr[2].field.mark, fieldsArr[5].field.mark, fieldsArr[8].field.mark],
                [fieldsArr[0].field.mark, fieldsArr[1].field.mark, fieldsArr[2].field.mark],
                [fieldsArr[0].field.mark, fieldsArr[3].field.mark, fieldsArr[6].field.mark],
                [fieldsArr[3].field.mark, fieldsArr[4].field.mark, fieldsArr[5].field.mark],
                [fieldsArr[6].field.mark, fieldsArr[7].field.mark, fieldsArr[8].field.mark],
                [fieldsArr[0].field.mark, fieldsArr[4].field.mark, fieldsArr[8].field.mark],
                [fieldsArr[2].field.mark, fieldsArr[4].field.mark, fieldsArr[6].field.mark]
            ];
            for (let i = 0;i<con.length;i++) {
                if (con[i][1] !== 'empty') {
                    if((con[i][1] === con[i][0]) && (con[i][1] === con[i][2])) {
                        return true;
                    }
                }
            }
        })()

        if (winningCondition) {
            gameStates.winDeclaration(winningPlayer)
        }
        
        if (result && winningCondition !== true) {
            gameStates.drawDeclaration()
        }};

    const gameStates = {
        winDeclaration: function(winningPlayer) {
            resultDisplayer.style.color = '#0C356A';
            turnDisplayer.innerHTML = '🎉';
            resultDisplayer.innerHTML = `${winningPlayer.marker} is the winner!`;
            stopPlayers();
        },
        drawDeclaration: function() {
            resultDisplayer.style.color = '#0C356A';
            turnDisplayer.innerHTML = '👍';
            turnDisplayer.style.textShadow = "0px 2px 1px white"
            resultDisplayer.innerHTML = `It's a draw!`;
        },
        resetGame: function() {
            fieldsArr.length = 0;
            let gameboardFields = document.querySelectorAll('.marker-field');
            for (let i = 0;i<gameboardFields.length;i++) {
                gameboardFields[i].remove()
            }
            resultDisplayer.innerHTML = `Who will win?`;
            resultDisplayer.style.color = 'white'
            createGrid();
        }
    }

    const stopPlayers = () => {
        fieldsArr.forEach((e) => {
            e.element.disabled = true
        })
    }

    
    return {
        createGrid,
        playerFactory,
        fieldsArr,
        checkForResult,
        stopPlayers,
        gameStates
    }})();

Gameboard.createGrid();