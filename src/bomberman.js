class Tile {
  constructor(tileType) {
    this.tileType = tileType;
    // this.isDestructable = tileType.isDestructable;
  }
}

domReady(gameLoop);
function gameLoop() {
  console.log("Start!");

  let map = generateMap(13);
}

function generateMap(tileAmount) {
  // 1 dimention
  let map = new Array(tileAmount);
  // Adding second dimention
  for (let i = 0; i < map.length; i++) {
    map[i] = new Array(tileAmount);
  }

  // Randomize envirnoment
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map.length; y++) {
      if ((x + 1) % 2 === 0 && (y + 1) % 2 === 0) {
        map[x][y] = 9;
      } else {
        map[x][y] = Math.floor(Math.random() * 2);
      }
    }
  }
  //   Wypis
  for (var i = 0; i < 13; i++) {
    for (var j = 0; j < 13; j++) {
      document.write(map[i][j] + " ");
    }
    document.write("<br>");
  }

  return map;
}
