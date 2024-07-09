let boxes = document.querySelectorAll(".Box");
let backBtn = document.querySelector("#back-btn");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Player O
let movesO = [];
let movesX = [];

const winPatterns = [
    // Horizontal win patterns
    [0, 1, 2, 3], [1, 2, 3, 4],
    [5, 6, 7, 8], [6, 7, 8, 9],
    [10, 11, 12, 13], [11, 12, 13, 14],
    [15, 16, 17, 18], [16, 17, 18, 19],
    [20, 21, 22, 23], [21, 22, 23, 24],
    // Vertical win patterns
    [0, 5, 10, 15], [5, 10, 15, 20],
    [1, 6, 11, 16], [6, 11, 16, 21],
    [2, 7, 12, 17], [7, 12, 17, 22],
    [3, 8, 13, 18], [8, 13, 18, 23],
    [4, 9, 14, 19], [9, 14, 19, 24],
    // Diagonal win patterns
    [0, 6, 12, 18], [1, 7, 13, 19], [5, 11, 17, 23], [6, 12, 18, 24],
    [3, 7, 11, 15], [4, 8, 12, 16], [8, 12, 16, 20], [9, 13, 17, 21]
];

const resetGame = () => {
    turnO = true;
    movesO = [];
    movesX = [];
    enableBoxes();
    msgContainer.classList.add('hide');
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
            movesO.push(index);
        } else {
            box.innerText = "X";
            turnO = true;
            movesX.push(index);
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// const showWinner = (winner) => {
//     msg.innerText = `Congratulations, Winner is ${winner}`;
//     msgContainer.classList.remove("hide");
//     disableBoxes();
// };

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c, d] = pattern;
        if (boxes[a].innerText !== "" &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText &&
            boxes[a].innerText === boxes[d].innerText) {
            // showWinner(boxes[a].innerText);
            msg.innerText = `Congratulations, Winner is ${boxes[a].innerText}`;
            msgContainer.classList.remove("hide");
            disableBoxes();
            return;
        }
    }
    let tie = Array.from(boxes).every(box=>box.innerText !=="")
            if (tie){
                msg.innerText=`It's a Tie`;
                msgContainer.classList.remove("hide");
                disableBoxes();
    
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
backBtn.addEventListener("click", () => {
    window.location.href = '../index.html';
});
