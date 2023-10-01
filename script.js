
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
                checkForDraw();
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

    const checkForDraw = () => {

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
            alert('win')
        }
        
        if (result && winningCondition !== true) {
            alert("draw");
        }};

    return {
        createGrid,
        playerFactory,
        fieldsArr,
        checkForDraw
    }})();

Gameboard.createGrid();