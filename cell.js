function Cell(i, j, w) {

    this.x = i;
    this.y = j;
    this.w = w;
    this.neighborCount = 0;
    this.bee = false;
    this.revealed = false;
    this.marked = false;
    console.log(w);

    let _c = document.createElement('div');
    _c.className = 'cell';
    _c.style.width = this.w + 'px';
    _c.style.height = this.w + 'px';
    _c.style.border = '1px solid #000';
    _c.dataset.x = this.x
    _c.dataset.y = this.y
    this.cell = _c;

}

Cell.prototype.show = function () {
    let parent = document.getElementById('container');
    if (this.bee) {
        this.cell.innerHTML = '●';
    } else {
        this.cell.innerHTML = this.neighborCount > 0 ? this.neighborCount : '';
    }
    parent.append(this.cell);
}
Cell.prototype.clicked = function () {
    if (this.bee) {
        this.cell.classList.add('marked-bomb');
        gameOver();
    } else {
        console.log(this.x, this.y);
        this.cell.classList.add('revealed');
        this.reveal();
    }
}

Cell.prototype.mark = function () {
    if (this.cell.classList.contains('marked')) {
        this.cell.classList.remove('marked');
        this.marked = false;
    } else {
        this.marked = true;
        this.cell.classList.add('marked');
    }
}

Cell.prototype.coutBombs = function () {

    if (this.bee) {
        //Self-beed = -1
        this.neighborCount = -1;
        return;
    }
    let total = 0;
    for (let xoff = -1; xoff <= 1; xoff++) {
        for (var yoff = -1; yoff <= 1; yoff++) {
            let i = this.x + xoff;
            let j = this.y + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows) {
                let neighbor = cells[i][j];
                if (neighbor.bee) {
                    total++;
                }
            }
        }
    }
    this.neighborCount = total;
}

Cell.prototype.reveal = function () {
    this.revealed = true;
    this.cell.classList.add('revealed');
    if (this.neighborCount == 0) {
        // flood fill time
        this.floodFill();
    }
}

Cell.prototype.revealEnd = function () {
    this.revealed = true;
    this.cell.classList.add('revealed');
}

Cell.prototype.floodFill = function () {
    console.log('floodfill');
    for (var xoff = -1; xoff <= 1; xoff++) {
        for (var yoff = -1; yoff <= 1; yoff++) {
            var i = this.x + xoff;
            var j = this.y + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows) {
                var neighbor = cells[i][j];
                if (!neighbor.bee && !neighbor.revealed && !neighbor.marked) {
                    neighbor.reveal();
                }
            }
        }
    }
}


