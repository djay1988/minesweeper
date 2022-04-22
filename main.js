var cols = 16;
var rows = 16;
var canvesSize = 600;
var totalBees = 40;
var gameover = false;
var cells = [];


function init() {

    console.log(cols, rows);
    console.log(cells);
    let parent = document.getElementById('container');
    parent.style.gridTemplateColumns = 'repeat(' + cols + ' , 1fr)';
    parent.style.display = 'grid';
    parent.style.alignContent = 'center';

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            cells[i][j] = new Cell(i, j, (canvesSize / cols));
        }
    }

    let options = [];
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            options.push([i, j]);
        }
    }

    for (var n = 0; n < totalBees; n++) {
        var index = Math.floor(Math.random() * (options.length + 1));

        var choice = options[index];
        if (choice) {
            var i = choice[0];
            var j = choice[1];
            // Deletes that spot so it's no longer an option
            options.splice(index, 1);
            cells[i][j].bee = true;
        }
    }


    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            cells[i][j].coutBombs(cells, cols, rows);
            cells[i][j].show();
        }
    }

}



function generate() {
    document.getElementById('container').innerHTML = '';
    let _cols = document.getElementById('rows');
    let _rows = document.getElementById('cols');

    cols = Number(_cols.value);
    rows = Number(_rows.value);


    cells = new Array(cols);
    for (let i = 0; i < cells.length; i++) {
        cells[i] = new Array(rows);
    }

    totalBees = Math.floor(rows * cols * 16 / 100);
    document.getElementById('bombs-count').innerHTML = totalBees;
    init();

    let _cells = document.querySelectorAll('.cell');
    for (let _i = 0; _i < _cells.length; _i++) {
        _cells[_i].addEventListener('mousedown', function (e) {

            console.log(e.button);
            if (e.button == 2) {
                cells[this.dataset.x][this.dataset.y].mark();
                return false;
            }

            cells[this.dataset.x][this.dataset.y].clicked();
            let totalRevealed = countRevealed();
            if (totalRevealed + totalBees >= cols * rows && !gameover) {
                win();
            }
        });
    }
}

window.addEventListener("contextmenu", e => e.preventDefault());



function countRevealed() {
    let totalRevealed = 0;
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if (cells[i][j].revealed && !cells[i][j].bee) totalRevealed++;
        }
    }
    return totalRevealed;
}



function gameOver() {
    //Badass-Game over sound
    gameover = true;
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            cells[i][j].revealEnd();
        }
    }

    //Game Over text
    console.log("Game Over! (Sorry...)");
    alert("Game Over! (Sorry...)")
}

function win() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            cells[i][j].revealEnd();
        }
    }
    alert("YOU WIN!!! (Nice)");
}