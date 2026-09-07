//line 31
const colors = {
    orange:"#ff9000",
    blue:"#7d83ff",
    green:"#2e933c",
    purple:"#883677",
    red:"#c33c54",
};

const names = ["No panel", "Sliders 1", "Sliders 2", "Sliders 3", "Sliders 4", "Sliders 5", "Sliders 6", "Grid 1", "Grid 2", "Circle 1", "Circle 2", "Circle 3", "Circle 4", "Tic-Tac-Toe 1", "Tic-Tac-Toe 2", "Tic-Tac-Toe 3", "Tic-Tac-Toe 4", "Tic-Tac-Toe 5", "Tic-Tac-Toe 6", "Tic-Tac-Toe 7", "Tic-Tac-Toe 8", "Tic-Tac-Toe 9"];

function start() {
    document.getElementById("splash").style.display = "none";
    document.getElementById("game").style.display = "block";
}

let ctx = [];
let lastActive = 1;
let sliders = new Array(12).fill(0);
let modes = new Array(9).fill(0);
let mouseDown = false;
let stage = 0;
let max = 4;
let circles = [
    [3, 4, 3, 2],
    [1, 2, 4, 3],
    [4, 1, 1, 4],
    [1, 2, 3, 2]
];
let gameOver = false;
const tttOrder = [8, 2, 5, 0, 1, 3, 6, 4, 7];
const tttPriority = [4, 0, 8, 2, 6, 1, 3, 5, 7];
let ticTacToe = /*new Array(9).fill(0)*/[0, 0, -1, 0, 1, 0, 0, 0, 0];
function tttPick() {
    for(var i of tttPriority) {
        if(ticTacToe[tttOrder[i]] == 0) return i;
    }
}
const slice = Math.PI / 2;
window.addEventListener("mouseup", () => {mouseDown = false;});

function unlock(n) {
    document.getElementById("side").innerHTML += `<button onclick="panel(${n})">${names[n]}</button>`;
}

function circle(n, x, y, r) {
    ctx[n].beginPath();
    ctx[n].arc(x, y, r, 0, Math.PI * 2);
    ctx[n].fill();
}
function line(n, x1, y1, x2, y2) {
    ctx[n].beginPath();
    ctx[n].moveTo(x1, y1);
    ctx[n].lineTo(x2, y2);
    ctx[n].stroke();
}

function win() {
    alert("Yay! You win.\n(Something exciting will happen later)");
}

function handleWin(index, n) {
    let item = ticTacToe[tttOrder[index]];
    if((index % 3 == 0 && item != 0 && item == ticTacToe[tttOrder[index + 1]] && item == ticTacToe[tttOrder[index + 2]]) || (index % 3 == 1 && item != 0 && item == ticTacToe[tttOrder[index + 1]] && item == ticTacToe[tttOrder[index - 1]]) || (index % 3 == 2 && item != 0 && item == ticTacToe[tttOrder[index - 1]] && item == ticTacToe[tttOrder[index - 2]])) {
        line(n, 0, 200, 400, 200);
        if(item == 1) return (gameOver = true);
        win();
    }
    if((index < 3 && item != 0 && item == ticTacToe[tttOrder[index + 3]] && item == ticTacToe[tttOrder[index + 6]]) || (index >= 3 && item != 0 && index < 6 && item == ticTacToe[tttOrder[index + 3]] && item == ticTacToe[tttOrder[index - 3]]) || (index >= 6 && item != 0 && item == ticTacToe[tttOrder[index - 3]] && item == ticTacToe[tttOrder[index - 6]])) {
        line(n, 200, 0, 200, 400);
        if(item == 1) return (gameOver = true);
        win();
    }
    if(index % 4 == 0 && item != 0 && ticTacToe[tttOrder[0]] == ticTacToe[tttOrder[4]] && ticTacToe[tttOrder[0]] == ticTacToe[tttOrder[8]]) {
        line(n, 0, 0, 400, 400);
        if(item == 1) return (gameOver = true);
        win();
    }
    if([2, 4, 6].includes(index) && item != 0 && ticTacToe[tttOrder[2]] == ticTacToe[tttOrder[4]] && ticTacToe[tttOrder[2]] == ticTacToe[tttOrder[6]]) {
        line(n, 0, 400, 400, 0);
        if(item == 1) return (gameOver = true);
        win();
    }
}

function pos(n, e) {
    let rect = document.getElementById("c" + n).getBoundingClientRect();
    return [(e.clientX - rect.left) * (400 / rect.width), (e.clientY - rect.top) * (400 / rect.height)];
}
for(var i = 1; i < 10; i++) {
    ctx.push(document.getElementById("c" + i).getContext("2d"));
    ctx[i - 1].textAlign = "center";
    ctx[i - 1].font = "30px monospace";
    ctx[i - 1].strokeStyle = colors.orange;
    ctx[i - 1].lineWidth = 10;
    dispCanvas(i - 1);
    document.querySelector(`.panel:nth-child(${i})`).addEventListener("mousedown", eval(`() => active(${i})`));
    document.getElementById("c" + i).addEventListener("mousedown", eval(`((e) => {trigger(${i - 1}, ...pos(${i}, e));mouseDown = true;})`));
    document.getElementById("c" + i).addEventListener("mousemove", eval(`((e) => {if(mouseDown) trigger(${i - 1}, ...pos(${i}, e));})`))
}

function grid(col, row) {
    document.getElementById("main").style.gridTemplateColumns = (new Array(col)).fill("auto").join(" ");
    document.getElementById("main").style.gridAutoRows = 100 / row + "vh";
    for(var i = 1; i < 10; i++) {
        document.querySelector(`.panel:nth-child(${i})`).style.display = (i <= col * row ? "block" : "none");
    }
    max = col * row;
    active(1);
}

function active(n) {
    document.querySelector(`.panel:nth-child(${lastActive})`).style.outline = "none";
    lastActive = n;
    document.querySelector(`.panel:nth-child(${lastActive})`).style.outline = "8px solid var(--blue)";
}

const swap = (x, y, pred) => pred ? [y, x] : [x, y];

function dispCanvas(n) {
    switch(modes[n]) {
        case 0: {
            ctx[n].fillStyle = colors.blue;
            ctx[n].fillRect(0, 0, 400, 400);
            ctx[n].fillStyle = colors.purple;
            ctx[n].fillText("No panel selected...", 200, 200);
            break;
        }
        case 1:
        case 2:
        case 3:
        case 4: 
        case 5:
        case 6: {
            ctx[n].fillStyle = colors.blue;
            ctx[n].fillRect(0, 0, 400, 400);
            ctx[n].fillStyle = colors.purple;
            ctx[n].fillRect(...swap(50, 100, modes[n] % 2), ...swap(300, 20, modes[n] % 2));
            ctx[n].fillRect(...swap(50, 280, modes[n] % 2), ...swap(300, 20, modes[n] % 2));
            ctx[n].fillStyle = [colors.orange, colors.green][modes[n] % 2];
            circle(n, ...swap(sliders[2 * modes[n] - 2] + 50, 110, modes[n] % 2), 30);
            circle(n, ...swap(sliders[2 * modes[n] - 1] + 50, 290, modes[n] % 2), 30);
            break;
        }
        case 7: {
            ctx[n].fillStyle = colors.blue;
            ctx[n].fillRect(0, 0, 400, 400);
            ctx[n].fillStyle = colors.red;
            ctx[n].fillRect(50, 150, 50, 50);
            ctx[n].fillRect(100, 50, 50, 50);
            ctx[n].fillRect(150, 250, 50, 50);
            ctx[n].fillRect(200, 200, 50, 50);
            ctx[n].fillRect(250, 300, 50, 50);
            ctx[n].fillRect(300, 100, 50, 50);
            ctx[n].fillStyle = colors.green;
            circle(n, 75, sliders[0] + 50, 10);
            circle(n, 125, sliders[1] + 50, 10);
            circle(n, 175, sliders[4] + 50, 10);
            circle(n, 225, sliders[5] + 50, 10);
            circle(n, 275, sliders[8] + 50, 10);
            circle(n, 325, sliders[9] + 50, 10);
            ctx[n].fillStyle = colors.orange;
            circle(n, sliders[2] + 50, 75, 10);
            circle(n, sliders[3] + 50, 125, 10);
            circle(n, sliders[6] + 50, 175, 10);
            circle(n, sliders[7] + 50, 225, 10);
            circle(n, sliders[10] + 50, 275, 10);
            circle(n, sliders[11] + 50, 325, 10);
            break;
        }
        case 8: {
            ctx[n].fillStyle = colors.blue;
            ctx[n].fillRect(0, 0, 400, 400);
            ctx[n].fillStyle = colors.red;
            ctx[n].fillRect(50, 50, 50, 50);
            ctx[n].fillRect(150, 100, 50, 50);
            ctx[n].fillRect(200, 200, 50, 50);
            ctx[n].fillRect(100, 250, 50, 50);
            ctx[n].fillRect(300, 150, 50, 50);
            ctx[n].fillRect(250, 300, 50, 50);
            ctx[n].fillStyle = colors.purple;
            circle(n, sliders[3] + 50, sliders[9] + 50, 10);
            circle(n, sliders[11] + 50, sliders[1] + 50, 10);
            circle(n, sliders[10] + 50, sliders[4] + 50, 10);
            circle(n, sliders[2] + 50, sliders[0] + 50, 10);
            circle(n, sliders[7] + 50, sliders[5] + 50, 10);
            circle(n, sliders[6] + 50, sliders[8] + 50, 10);
            break;
        }
        case 9:
        case 10:
        case 11:
        case 12: {
            ctx[n].fillStyle = colors.blue;
            ctx[n].fillRect(0, 0, 400, 400);
            ctx[n].beginPath();
            ctx[n].moveTo(200, 200);
            ctx[n].fillStyle = [colors.green, colors.orange, colors.purple, colors.red][circles[modes[n] - 9][0] - 1];
            ctx[n].arc(200, 200, 100, 0, slice);
            ctx[n].closePath();
            ctx[n].fill();
            ctx[n].beginPath();
            ctx[n].moveTo(200, 200);
            ctx[n].fillStyle = [colors.green, colors.orange, colors.purple, colors.red][circles[modes[n] - 9][1] - 1];
            ctx[n].arc(200, 200, 100, slice, 2 * slice);
            ctx[n].closePath();
            ctx[n].fill();
            ctx[n].beginPath();
            ctx[n].moveTo(200, 200);
            ctx[n].fillStyle = [colors.green, colors.orange, colors.purple, colors.red][circles[modes[n] - 9][2] - 1];
            ctx[n].arc(200, 200, 100, 2 * slice, 3 * slice);
            ctx[n].closePath();
            ctx[n].fill();
            ctx[n].beginPath();
            ctx[n].moveTo(200, 200);
            ctx[n].fillStyle = [colors.green, colors.orange, colors.purple, colors.red][circles[modes[n] - 9][3] - 1];
            ctx[n].arc(200, 200, 100, 3 * slice, 4 * slice);
            ctx[n].closePath();
            ctx[n].fill();
            ctx[n].fillStyle = [colors.green, colors.orange, colors.purple, colors.red][modes[n] - 9];
            circle(n, 200, 200, 50);
            break;
        }
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21: {
            ctx[n].fillStyle = colors.blue;
            ctx[n].fillRect(0, 0, 400, 400);
            let tile = ticTacToe[tttOrder[modes[n] - 13]];
            if(tile == -1) {
                ctx[n].fillStyle = colors.green;
                circle(n, 200, 200, 100);
            } else if(tile == 1) {
                ctx[n].fillStyle = colors.red;
                circle(n, 200, 200, 100)
            }
            handleWin(modes[n] - 13, n);
            break;
        }
    }
}

function trigger(n, x, y) {
    switch(modes[n]) {
        case 1:
        case 3:
        case 5: {
            if(y > 50 && y < 350 && x > 90 && x < 310) {
                if(x < 130) sliders[2 * modes[n] - 2] = y - 50;
                if(x > 270) sliders[2 * modes[n] - 1] = y - 50;
            }
            break;
        }
        case 2:
        case 4:
        case 6: {
            if(x > 50 && x < 350 && y > 90 && y < 310) {
                if(y < 130) sliders[2 * modes[n] - 2] = x - 50;
                if(y > 270) sliders[2 * modes[n] - 1] = x - 50;
            }
            break;
        }
        case 9:
        case 10:
        case 11:
        case 12: {
            if((x - 200) ** 2 + (y - 200) ** 2 <= 2500) {
                circles[modes[n] - 9] = [
                    circles[modes[n] - 9][3],
                    circles[modes[n] - 9][0],
                    circles[modes[n] - 9][1],
                    circles[modes[n] - 9][2]
                ]
                break;
            }
            if(x > 200) {
                if(y > 200) {
                    let tmp = circles[((modes[n] - 9) + 1) % 4][0];
                    circles[((modes[n] - 9) + 1) % 4][0] = circles[modes[n] - 9][0];
                    circles[modes[n] - 9][0] = tmp;
                    break;
                }
                let tmp = circles[((modes[n] - 9) + 1) % 4][3];
                circles[((modes[n] - 9) + 1) % 4][3] = circles[modes[n] - 9][3];
                circles[modes[n] - 9][3] = tmp;
                break;
            }
            if(y > 200) {
                let tmp = circles[((modes[n] - 9) + 1) % 4][1];
                circles[((modes[n] - 9) + 1) % 4][1] = circles[modes[n] - 9][1];
                circles[modes[n] - 9][1] = tmp;
                break;
            }
            let tmp = circles[((modes[n] - 9) + 1) % 4][2];
            circles[((modes[n] - 9) + 1) % 4][2] = circles[modes[n] - 9][2];
            circles[modes[n] - 9][2] = tmp;
            break;
        }
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21: {
            if(gameOver || !ticTacToe.includes(0)) {
                ticTacToe = new Array(9).fill(0);
                gameOver = false;
                break;
            }
            if(ticTacToe[tttOrder[modes[n] - 13]] == 0) {
                ticTacToe[tttOrder[modes[n] - 13]] = -1;
                if(ticTacToe.includes(0)) ticTacToe[tttPick()] = 1;
            }
            break;
        }
    }
    if(stage == 0 && JSON.stringify(sliders.map(a => Math.floor(a/50) * 50)) == "[100,0,50,250,200,150,0,150,250,50,100,200]") {
        stage++;
        unlock(8);
    }
    if(stage == 1 && [[3,9],[11,1],[10,4],[2,0],[7,5],[6,8]].map(a => `${50*Math.floor(sliders[a[0]]/50)}_${50*Math.floor(sliders[a[1]]/50)}`).sort().join(",") == "0_0,100_50,150_150,200_250,250_100,50_200") {
        stage++;
        unlock(9);
        unlock(10);
        unlock(11);
        unlock(12);
    }
    if(stage == 2 && JSON.stringify(circles) == "[[1,1,1,1],[2,2,2,2],[3,3,3,3],[4,4,4,4]]") {
        stage++;
        for(var i = 13; i <= 21; i++) {
            unlock(i);
        }
    }
    for(var i = 0; i < 10; i++) {
        dispCanvas(i);
    }
}

function panel(n) {
    if(modes.includes(n)) {
        let idx = modes.indexOf(n);
        modes[idx] = 0;
        dispCanvas(idx);
    }
    modes[lastActive - 1] = n;
    dispCanvas(lastActive - 1);
    active(Math.min(lastActive + 1, max));
}

grid(2, 2);

console.log("%cPlease don't cheat :(", "font-size:30px;font-weight:bold;")
active(1);