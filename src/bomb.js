class Bomb extends Actor {
  constructor(_element, _x = 0, _y = 0) {
    super(_element, _x, _y);
    this.element.classList.add("bomb");

    this.fireTileElements = [];
  }

  explode(map) {
    const explosionCoordinates = this.calculateExplosion(map);
    this.triggerExplosion(map, explosionCoordinates);

    return explosionCoordinates;
  }

  calculateExplosion(map) {
    const fireLenght = 3;

    let bombX = this.position.x;
    let bombY = this.position.y;
    let explosionCoordinates = [];

    function expandFire(nextX, nextY) {
      if (!isOutOfBounds(nextX, nextY)) {
        if (map[nextX][nextY].tileType === "wall") {
          return false;
        } else {
          addFireCoordinates(nextX, nextY);
        }
      }
      return true;
    }

    function addFireCoordinates(x, y) {
      explosionCoordinates.push({ x, y });
    }

    // Center
    addFireCoordinates(bombX, bombY);
    // Right
    for (let i = 1; i <= fireLenght; i++) {
      if (!expandFire(bombX + i, bombY)) {
        break;
      }
    }
    // Left
    for (let i = 1; i <= fireLenght; i++) {
      if (!expandFire(bombX - i, bombY)) {
        break;
      }
    }
    // Up
    for (let i = 1; i <= fireLenght; i++) {
      if (!expandFire(bombX, bombY + i)) {
        break;
      }
    }
    // Down
    for (let i = 1; i <= fireLenght; i++) {
      if (!expandFire(bombX, bombY - i)) {
        break;
      }
    }

    return explosionCoordinates;
  }

  triggerExplosion(map, explosionCoordinates) {
    // Explosion timeout
    setTimeout(() => {
      explosionCoordinates.forEach((coord) => {
        this.createFireTile(coord.x, coord.y);
        this.explodeObstacle(map, coord.x, coord.y);
      });
      // Clear explosion timeout
      setTimeout(() => {
        this.withdrawBombFromMap();
        this.clearExplosion();
      }, 1000);
    }, 1000);
  }

  createFireTile(x, y) {
    let parent = document.querySelector("#tile-" + x + "-" + y);
    let fireTile = document.createElement("div");
    fireTile.classList.add("tile-fire");
    fireTile.classList.add(this.id);

    this.fireTileElements.push(fireTile);
    parent.appendChild(fireTile);
  }

  explodeObstacle(map, x, y) {
    map[x][y] = new Tile("path");
  }

  clearExplosion() {
    this.fireTileElements.forEach((element) => {
      element.remove();
    });
  }

  withdrawBombFromMap() {
    this.position.x = -1;
    this.position.y = -1;
    this.updatePositionCSS();
  }
}
