const mapSize = 13;
let gameContainer;
// let isBombPlaced = false;
// let currentX = 5;
// let currentY = 5;

const tileTypes = new Map([
  ["path", { style: "path", isDestructable: false, collision: false }],
  ["obstacle", { style: "obstacle", isDestructable: true, collision: true }],
  ["wall", { style: "wall", isDestructable: false, collision: true }],
  ["bomb", { style: "bomb", isDestructable: false, collision: true }],
  ["fire", { style: "fire", isDestructable: false, collision: false }],
]);

class Tile {
  constructor(tileType) {
    this.tileType = tileType;

    // Load properties from tileType
    let properties = tileTypes.get(tileType);
    this.style = properties.style;
    this.isDestructable = properties.isDestructable;
    this.collision = properties.collision;
  }
}

domReady(gameLoop);
function gameLoop() {
  console.log("Start!");
  gameContainer = document.getElementById("game-container");

  let map = generateMap(mapSize);
  displayMap(map);
}

function generateMap() {
  // Creating 2 dimentional array
  let map = new Array(mapSize);
  for (let i = 0; i < mapSize; i++) {
    map[i] = new Array(mapSize);
  }

  generateTiles(map);
  clearSpawn(map);

  return map;
}

function generateTiles(map) {
  for (let x = 0; x < mapSize; x++) {
    for (let y = 0; y < mapSize; y++) {
      if ((x + 1) % 2 === 0 && (y + 1) % 2 === 0) {
        map[x][y] = new Tile("wall");
      } else {
        map[x][y] = randomTile();
      }
    }
  }
}

function clearSpawn(map) {
  const mapWhiteList = [
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

  mapWhiteList.forEach((element) => {
    map[element.x][element.y] = new Tile("path");
  });
}

function randomTile() {
  const zero_or_one = Math.floor(Math.random() * 4);
  return zero_or_one > 0 ? new Tile("obstacle") : new Tile("path");
}

function placeBomb(map) {
  if (isBombPlaced === false) {
    map[currentX][currentY] = new Tile("bomb");
    setTimeout(() => {
      explodeBomb();
    }, 1000);
  }
}

function explodeBomb(map) {
  let mapFireList = [
    { x: currentX, y: currentY },
    { x: currentX + 1, y: currentY },
    { x: currentX + 2, y: currentY },
    { x: currentX + 3, y: currentY },
    { x: currentX, y: currentY - 1 },
    { x: currentX, y: currentY - 2 },
    { x: currentX, y: currentY - 3 },
  ];
  mapFireList.forEach((element) => {
    map[element.x][element.y] = new Tile("fire");
  });
  // dodać kolizje
  isBombPlaced = false;
  setTimeout(() => {
    expireFire();
  }, 1500);

  function expireFire() {
    mapFireList.forEach((element) => {
      map[element.x][element.y] = new Tile("path");
    });
    // po dodaniu kolizji będzie OK
  }
}

function displayMap(map) {
  let gameTable = document.createElement("table");
  gameTable.id = "game-table";
  for (let x = 0; x < mapSize; x++) {
    let row = document.createElement("tr");

    for (let y = 0; y < mapSize; y++) {
      const tile = map[x][y];
      let cell = document.createElement("td");
      cell.classList.add("tile");
      cell.classList.add("tile-" + x + "-" + y);
      cell.classList.add("tile-" + tile.style);

      row.appendChild(cell);
      gameTable.appendChild(row);
    }
  }

  gameContainer.appendChild(gameTable);
}
