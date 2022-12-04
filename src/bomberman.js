const mapSize = 13;
let gameContainer;

class Tile {
  constructor(tileType) {
    this.tileType = tileType;
    // this.isDestructable = tileType.isDestructable;
  }
}
let mapWhiteList = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 12, y: 12 },
  { x: 12, y: 11 },
  { x: 12, y: 10 },
  { x: 11, y: 12 },
  { x: 10, y: 12 },
];

domReady(gameLoop);
function gameLoop() {
  console.log("Start!");
  gameContainer = document.getElementById("game-container");

  let map = generateMap(mapSize);
  displayMap(map);
}

function clearSpawn(map) {
  mapWhiteList.forEach((element) => {
    map[element.x][element.y] = 0;
  });
}

function generateMap() {
  // 1 dimention
  let map = new Array(mapSize);
  // Adding second dimention
  for (let i = 0; i < mapSize; i++) {
    map[i] = new Array(mapSize);
  }

  // Randomize envirnoment
  for (let x = 0; x < mapSize; x++) {
    for (let y = 0; y < mapSize; y++) {
      if ((x + 1) % 2 === 0 && (y + 1) % 2 === 0) {
        map[x][y] = 9;
      } else {
        map[x][y] = Math.floor(Math.random() * 2);
      }
    }
  }

  clearSpawn(map);

  return map;
}

function displayMap(map) {
    let gameTable = document.createElement("table");
    for (let x = 0; x < mapSize; x++) {
        let row = document.createElement("tr");

        for (let y = 0; y < mapSize; y++) {
            let cell = document.createElement("td");
            cell.classList.add("tile-" + x + "-" + y);
            cell.innerHTML = map[x][y];

            row.appendChild(cell);
            gameTable.appendChild(row);
        }
    }

    gameContainer.appendChild(gameTable);
}
