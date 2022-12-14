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

class MapManager {
  constructor(mapSize = 13) {
    this.map = this.generateMap(mapSize);
  }

  generateMap(mapSize) {
    // Creating 2 dimentional array
    let map = new Array(mapSize);
    for (let i = 0; i < mapSize; i++) {
      map[i] = new Array(mapSize);
    }

    this.generateTiles(map);
    this.clearSpawn(map);

    return map;
  }

  generateTiles(map) {
    for (let x = 0; x < mapSize; x++) {
      for (let y = 0; y < mapSize; y++) {
        if ((x + 1) % 2 === 0 && (y + 1) % 2 === 0) {
          map[x][y] = new Tile("wall");
        } else {
          map[x][y] = this.randomTile();
        }
      }
    }
  }

  randomTile() {
    const zero_or_one = Math.floor(Math.random() * 4);
    return zero_or_one > 0 ? new Tile("obstacle") : new Tile("path");
  }

  updateMapScale(map) {}

  clearSpawn(map) {
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
}
