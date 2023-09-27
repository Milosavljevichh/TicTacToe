
const marker_field = document.querySelectorAll(".marker-field");

const gameboard = [];

//player constructor
function Player(sign) {
    this.sign = sign;
}

//field constructor
function gameboard_field(field) {
    this.field = field;
    this.taken = false;
    let self = this
    this.field.onclick = function() {
        if (self.taken === false) {
            self.field.innerHTML = t;
            self.taken = true;
        }
        if (t === player1.sign) {
            t = player2.sign
        } else if (t === player2.sign) {
            t = player1.sign
        }
    };
};

const player1 = new Player('X');
const player2 = new Player('O');

let t = player1.sign


//push a gameboard field into the gameboard array
for (let i = 0; i < marker_field.length; i++) {
    let newField = new gameboard_field(marker_field[i]);
    gameboard.push(newField);
    
};
