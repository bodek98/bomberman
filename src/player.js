class Player extends Actor {
  constructor(_element, _x = 0, _y = 0, gameContainer) {
    super(_element, _x, _y);

    // HTML construction
    this.element.classList.add("player");
    let bombElement = document.createElement("div");
    gameContainer.appendChild(bombElement);

    this.lastPosition = { x: _x, y: _y };
    this.direction = { x: 0, y: 0 };

    // Determines how many FPS will take to move 1 tile
    this.animationLength = FRAMERATE;
    this.traveledFrames = 0;

    this.bomb = new Bomb(bombElement, -1, -1);
  }

  moveBombToPlayer() {
    this.bomb.position.x = Math.round(this.position.x);
    this.bomb.position.y = Math.round(this.position.y);
    this.bomb.isOnTheMap = true;
    this.bomb.updatePositionCSS();
  }

  placeBomb(map) {
    // Move bomb to player position
    this.moveBombToPlayer();
    // Bomb explosion
    const explodedTiles = this.bomb.explode(map);
    return explodedTiles;
  }

  manageBomb(map) {
    if (this.bomb.isOnTheMap) return [];

    if (Math.random() * 250 < 1) {
      const tilesToExplode = this.placeBomb(map);
      return tilesToExplode;
    }

    return [];
  }

  lerp(progress, base, target) {
    let diff = target - base;
    return base + diff * progress;
  }

  step(map) {
    this.traveledFrames++;
    this.changePosition(map);
  }

  changePosition(map) {
    // Percentage (0.0 -> 1.0) of travel
    let progress = this.traveledFrames / this.animationLength;

    // If step full step was achieved, or no direction is set
    if (progress >= 1 || this.isDirectionNotSet()) {
      this.traveledFrames = 0;
      progress = 0;

      this.lastPosition.x += this.direction.x;
      this.lastPosition.y += this.direction.y;

      this.setNewDirection(map);
    }

    if (!this.direction) {
      this.setNewDirection(map);
    }

    const newX = this.lerp(
      progress,
      this.lastPosition.x,
      this.lastPosition.x + this.direction.x
    );
    const newY = this.lerp(
      progress,
      this.lastPosition.y,
      this.lastPosition.y + this.direction.y
    );

    this.setPosition(newX, newY);
  }

  setNewDirection(map) {
    let possibleDirections = this.getPossibleDirections(map);
    this.removePreviousPositionFromDirections(possibleDirections);

    const randomIndex = Math.floor(Math.random() * possibleDirections.length);
    let randomDirection = possibleDirections[randomIndex];

    this.direction = randomDirection;
  }

  allDirections = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];

  getPossibleDirections(map) {
    let possibleDirections = [];
    possibleDirections = this.getPossibleDirectionsOfTile(map, "path");

    // If there is no clear path to go, choose fire
    if (possibleDirections.length == 0) {
      possibleDirections = this.getPossibleDirectionsOfTile(map, "fire");
    }

    return possibleDirections;
  }

  getPossibleDirectionsOfTile(map, tileType) {
    let player = this;
    let possibleDirections = [];

    const currentX = Math.round(player.position.x);
    const currentY = Math.round(player.position.y);

    this.allDirections.forEach((direction) => {
      const nextX = currentX + direction.x;
      const nextY = currentY + direction.y;
      const isExceeding = isOutOfBounds(nextX, nextY);
      if (!isExceeding) {
        if (map[nextX][nextY].tileType === tileType) {
          possibleDirections.push(direction);
        }
      }
    });

    return possibleDirections;
  }

  isDirectionNotSet() {
    return this.direction == 0 && this.direction == 0;
  }

  removePreviousPositionFromDirections(possibleDirections) {
    if (!this.direction) return;
    // At this point this.direction is still an old, not updated value
    // Invertion of it would look like "step-back"
    // And we want to remove it from possible positions
    const stepBack = { x: this.direction.x * -1, y: this.direction.y * -1 };

    const index = this.indexOfDirection(possibleDirections, stepBack);
    // If index was found, and there are other possible directions than going back
    if (typeof index == "number" && possibleDirections.length > 1) {
      possibleDirections.splice(index, 1);
    }
  }

  indexOfDirection(directions, stepBack) {
    for (let index = 0; index < directions.length; index++) {
      const direction = directions[index];
      if (direction.x == stepBack.x && direction.y == stepBack.y) {
        return index;
      }
    }
  }
}
