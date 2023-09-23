
const marker_field = document.querySelectorAll(".marker-field");

const gameboard = [];

//field constructor
function gameboard_field(field, sign) {
    this.field = field;
    this.taken = false;
    this.sign = sign;
}
//generate a random mark(for testing)
let randomMark = function() {
    let num = Math.random();
    if (num > 0.5) {
        return 'X'
    } else {
        return 'O'
    }
}
//push a gameboard file into the gameboard array
for (let i = 0; i < marker_field.length; i++) {
    gameboard.push(new gameboard_field(marker_field[i], randomMark()))
    
}
//overwrite innerHTML of a field
function displayMarkers() {
    for (let i = 0; i < gameboard.length; i++) {
        if (gameboard[i].taken === false) {
            gameboard[i].field.innerHTML = gameboard[i].sign
            gameboard[i].taken = true
        }
    }
}

displayMarkers()
console.log(gameboard)