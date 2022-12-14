const tileTypes = new Map([
  ["path", { style: "path", isDestructable: false, collision: false }],
  ["obstacle", { style: "obstacle", isDestructable: true, collision: true }],
  ["wall", { style: "wall", isDestructable: false, collision: true }],
  ["bomb", { style: "bomb", isDestructable: false, collision: true }],
  ["fire", { style: "fire", isDestructable: false, collision: false }],
]);

class Tile {
  constructor(_tileType) {
    this.tileType = _tileType;

    // Load properties from tileType
    let properties = tileTypes.get(this.tileType);
    this.style = properties.style;
    this.isDestructable = properties.isDestructable;
    this.collision = properties.collision;
  }
}

class MapManager {
  constructor(_mapSize = 13) {
    this.map = {};
    this.mapSize = _mapSize;
    this.gameContainer = document.getElementById("game-container");
    this.generateMap(this.mapSize);
    this.displayMap();
  }

  generateMap() {
    // Creating 2 dimentional array
    this.map = new Array(this.mapSize);
    for (let i = 0; i < this.mapSize; i++) {
      this.map[i] = new Array(this.mapSize);
    }

    this.generateTiles();
    this.clearSpawn();
    this.generatePlayers();
  }

  generateTiles() {
    for (let x = 0; x < this.mapSize; x++) {
      for (let y = 0; y < this.mapSize; y++) {
        if ((x + 1) % 2 === 0 && (y + 1) % 2 === 0) {
          this.map[x][y] = new Tile("wall");
        } else {
          this.map[x][y] = this.randomTile();
        }
      }
    }
  }

  randomTile() {
    const zero_or_one = Math.floor(Math.random() * 4);
    return zero_or_one > 0 ? new Tile("obstacle") : new Tile("path");
  }

  updateMapScale() {}

  clearSpawn() {
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
      this.map[element.x][element.y] = new Tile("path");
    });
  }

  generatePlayers() {
    // this.map[0][0] = new Player("red");
    // this.map[12][12] = new Player("green");
  }

  displayMap() {
    let gameTable = document.createElement("table");
    gameTable.id = "game-table";

    for (let y = this.mapSize - 1; y >= 0; y--) {
      let row = document.createElement("tr");

      for (let x = 0; x < this.mapSize; x++) {
        const tile = this.map[x][y];
        let cell = document.createElement("td");
        cell.classList.add("tile");
        cell.id = "tile-" + x + "-" + y;
        cell.classList.add("tile-style-" + tile.style);

        row.appendChild(cell);
        gameTable.appendChild(row);
      }
    }

    this.gameContainer.appendChild(gameTable);
  }

  refreshTileStyle({ x, y }) {
    let tile = document.querySelector("#tile-" + x + "-" + y);
    const tileInfo = this.map[x][y];

    // Remove every "tile-style-*" class
    const tileClassesRegex = new RegExp(/(\btile-style.*)/, "g");
    tile.className = tile.className.replace(tileClassesRegex, "");
    tile.classList.add("tile-style-" + tileInfo.style);
  }
}
