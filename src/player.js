const playerTypes = new Map([
  ["red", { style: "red" }],
  ["green", { style: "green" }],
  ["ghost", { style: "ghost" }],
]);

class Player {
  constructor(_playerType) {
    this.playerType = _playerType;

    // Load properties from playerType
    let properties = playerTypes.get(this.playerType);
    this.style = properties.style;
    this.position = { x: 0.0, y: 0.0 };
  }

  placeBomb(map) {
    map[this.position.x][this.position.y] = new Tile("bomb");
    // Add bomb handling
    // explodeBomb(this.position.x, this.position.y);
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
