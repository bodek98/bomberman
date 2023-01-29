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
  constructor(_mapSize = MAP_SIZE) {
    this.map = {};
    this.mapSize = _mapSize;
    this.mapDimentionLength = this.mapSize * 100;
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

  // Scalling is needed so we can use PX as a stable, never changing game dimention unit
  // Game will always be 1000 x 1000 [px] internally, regardless it's final size in the viewport
  updateMapScale() {
    const smaller_dimention = Math.min(window.innerWidth, window.innerHeight);
    const normalized_size =
      smaller_dimention > this.mapDimentionLength
        ? 1
        : smaller_dimention / this.mapDimentionLength;

    const ratio = 0.8;
    const final_scale = normalized_size * ratio;
    const final_size = final_scale * 1000;

    const final_size_half = final_size / 2;
    const scale_margin = (this.mapDimentionLength - final_size) / 2;
    const margin = -(final_size_half + scale_margin);

    this.gameContainer.style.top = window.innerHeight / 2 + margin + "px";
    this.gameContainer.style.left = window.innerWidth / 2 + margin + "px";

    this.gameContainer.style.transform = "scale(" + final_scale + ")";
  }

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

    this.gameContainer.style.width = this.mapDimentionLength + "px";
    this.gameContainer.style.height = this.mapDimentionLength + "px";
    this.gameContainer.appendChild(gameTable);
  }

  refreshTileStyle({ x, y }) {
    let tile = document.querySelector("#tile-" + x + "-" + y);
    const tileInfo = this.map[x][y];

    if (tileInfo.style == "fire") {
      console.log("fire");
    }
    // Remove every "tile-style-*" class
    const tileClassesRegex = new RegExp(/(\btile-style.*)/, "g");
    tile.className = tile.className.replace(tileClassesRegex, "");
    tile.classList.add("tile-style-" + tileInfo.style);
  }
}
