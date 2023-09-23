
const marker_field = document.querySelectorAll(".marker-field");

const gameboard = [];

//field constructor
function gameboard_field(field, sign) {
    this.field = field;
    this.taken = false;
    this.sign = sign;
    let self = this
    this.field.onclick = function() {
        console.log(self.sign)
        if (self.taken === false) {
            self.field.innerHTML = self.sign;
            self.taken = true;
            console.log('hi')
        }
    };
    
};
//generate a random mark(for testing)
let randomMark = function() {
    let num = Math.random();
    if (num > 0.5) {
        return 'X'
    } else {
        return 'O'
    }
};
//push a gameboard field into the gameboard array
for (let i = 0; i < marker_field.length; i++) {
    let newField = new gameboard_field(marker_field[i], randomMark());
    gameboard.push(newField);
    
};
// //overwrite innerHTML of a field (for testing)
// function displayMarkers() {
//     for (let i = 0; i < gameboard.length; i++) {
//         if (gameboard[i].taken === false) {
//             gameboard[i].field.innerHTML = gameboard[i].sign
//             gameboard[i].taken = true
//         }
//     }
// }