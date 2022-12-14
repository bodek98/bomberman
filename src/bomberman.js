const mapSize = 13;
let gameContainer;
let redCurrentX = 0;
let redCurrentY = 0;
let greenCurrentX = 12;
let greenCurrentY = 12;

const playerTypes = new Map([
  ["red", { style: "red" }],
  ["green", { style: "green" }],
  ["ghost", { style: "ghost" }],
]);

class Player {
  constructor(playerType) {
    this.playerType = playerType;

    // Load properties from playerType
    let properties = playerTypes.get(playerType);
    this.style = properties.style;
    this.position = { x: 0.0, y: 0.0 };
  }

  placeBomb(map) {
    map[this.position.x][this.position.y] = new Tile("bomb");
    // Add bomb handling
    // explodeBomb(this.position.x, this.position.y);
  }
}

domReady(mainGame);
function mainGame() {
  gameContainer = document.getElementById("game-container");

  let mapManager = new MapManager(mapSize);
  generatePlayer(mapManager.map);

  // Temporary explosion setup
  let developer_ghost_player = new Player("ghost");
  developer_ghost_player.position = { x: 6, y: 6 };
  developer_ghost_player.placeBomb(mapManager.map);

  displayMap(mapManager.map);
}

// Player section

function generatePlayer(map) {
  map[redCurrentX][redCurrentY] = new Player("red");
  map[greenCurrentX][greenCurrentY] = new Player("green");
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
  for (let y = mapSize - 1; y >= 0; y--) {
    let row = document.createElement("tr");

    for (let x = 0; x < mapSize; x++) {
      const tile = map[x][y];
      let cell = document.createElement("td");
      cell.classList.add("tile");
      cell.classList.add("tile-" + x + "-" + y);
      cell.classList.add("tile-" + tile.style);

      // Player generating
      cell.classList.add("player-" + tile.style);

      row.appendChild(cell);
      gameTable.appendChild(row);
    }
  }

  gameContainer.appendChild(gameTable);
}
