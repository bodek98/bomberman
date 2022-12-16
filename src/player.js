class Player {
  constructor(_playerElement, _x = 0, _y = 0) {
    this.playerElement = _playerElement;
    this.position = { x: _x, y: _y };

    this.updatePosition();
  }

  placeBomb(map) {
    map[this.position.x][this.position.y] = new Tile("bomb");
    // Add bomb handling
    setTimeout(() => {
      explodeBomb(map, this.position.x, this.position.y);
    }, 1000);

    // Return bomb position to MapManager
    return { x: this.position.x, y: this.position.y };
  }

  updatePosition() {
    console.log(this.playerElement);
    console.log(this.position);
    this.playerElement.style.bottom = this.position.x * 100 + "px";
    this.playerElement.style.left = this.position.y * 100 + "px";
  }
}

function isOutOfBounds(x, y, mapSize) {
  const isX = x < 0 || x >= mapSize;
  const isY = y < 0 || y >= mapSize;

  return isX || isY;
}

function explodeBomb(map, x, y) {
  const mapSize = 13;
  console.log("bum");
  const fireLenght = 3;

  function createFireTile(x, y) {
    console.log("kafelek");
    let parent = document.querySelector("#tile-" + x + "-" + y);
    let fireTile = document.createElement("div");
    fireTile.classList.add("tile-fire");
    parent.appendChild(fireTile);
  }

  function expandFire(nextX, nextY) {
    if (!isOutOfBounds(nextX, nextY, mapSize)) {
      if (map[nextX][nextY].tileType === "wall") {
        return false;
      } else {
        createFireTile(nextX, nextY);
      }
    }
    return true;
  }

  // Center
  createFireTile(x, y);
  // Right
  for (let i = 1; i <= fireLenght; i++) {
    if (!expandFire(x + i, y)) {
      break;
    }
  }
  // Left
  for (let i = 1; i <= fireLenght; i++) {
    if (!expandFire(x - i, y)) {
      break;
    }
  }
  // Up
  for (let i = 1; i <= fireLenght; i++) {
    if (!expandFire(x, y + i)) {
      break;
    }
  }
  // Down
  for (let i = 1; i <= fireLenght; i++) {
    if (!expandFire(x, y - i)) {
      break;
    }
  }
}
