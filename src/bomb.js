class Bomb extends Actor {
  constructor(_element, _x = 0, _y = 0) {
    super(_element, _x, _y);
    this.element.classList.add("bomb");

    this.fireTileElements = [];
    this.isOnTheMap = false;
  }

  explode(map) {
    const explosionCoordinates = this.calculateExplosion(map);
    this.triggerExplosion(map, explosionCoordinates);

    return explosionCoordinates;
  }

  calculateExplosion(map) {
    const fireLenght = 3;

    let bombX = Math.round(this.position.x);
    let bombY = Math.round(this.position.y);
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
        this.setTileFire(map, coord.x, coord.y);
      });
      // Clear explosion timeout
      setTimeout(() => {
        this.withdrawBombFromMap();
        explosionCoordinates.forEach((coord) => {
          this.setTilePath(map, coord.x, coord.y);
        });
      }, EXPLOSION_DURATION);
    }, EXPLOSION_TIMEOUT);
  }

  setTileFire(map, x, y) {
    map[x][y] = new Tile("fire");
  }

  setTilePath(map, x, y) {
    map[x][y] = new Tile("path");
  }

  withdrawBombFromMap() {
    this.position.x = -1;
    this.position.y = -1;
    this.isOnTheMap = false;
    this.updatePositionCSS();
  }
}
