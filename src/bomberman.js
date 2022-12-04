class Tile {
    constructor(tileType) {
      this.tileType = tileType;
      // this.isDestructable = tileType.isDestructable;
    }
}

domReady(gameLoop);
function gameLoop(){
    console.log("Start!");
    
    let map = generateMap(13);
}

function generateMap(tileAmount){
    // 1 dimention
    var x = new Array(tileAmount);
    // Adding second dimention
    for (var i = 0; i < x.length; i++) {
        x[i] = new Array(tileAmount);
    }

    // Randomize envirnoment
    // <tutaj losowanie>
    // w pętli:
    //      map[x][y] = Tile(<losowy typ>)

    return x;
}