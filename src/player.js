class Player extends Actor {
  constructor(_element, _x = 0, _y = 0, gameContainer) {
    super(_element, _x, _y);
    this.element.classList.add("player");

    let bombElement = document.createElement("div");
    gameContainer.appendChild(bombElement);
    this.bomb = new Bomb(bombElement, -1, -1);

    this.direction = { x: 0, y: 0 };
    this.traveledDistance = { x: 0, y: 0 };
    this.movementSpeed = 2;
    this.isDestinationReached = true;
  }

  placeBomb(map) {
    // Move bomb to player position
    this.moveBombToPlayer();
    // Bomb explosion
    const explodedTiles = this.bomb.explode(map);
    return explodedTiles;
  }

  moveBombToPlayer() {
    this.bomb.position.x = this.position.x;
    this.bomb.position.y = this.position.y;
    this.bomb.updatePositionCSS();
  }

  step(map) {
    // If full step was achieved

    if (
      Math.abs(this.traveledDistance.x) >= 1 ||
      Math.abs(this.traveledDistance.y) >= 1
    ) {
      this.traveledDistance.x = 0;
      this.traveledDistance.y = 0;
      this.isDestinationReached = true;
    }

    if (this.isDestinationReached) {
      this.setNewDirection(map);
      this.isDestinationReached = false;
      alert("stop");
    }

    let stepX = (this.direction.x / 60) * this.movementSpeed;
    let stepY = (this.direction.y / 60) * this.movementSpeed;
    this.traveledDistance.x += stepX;
    this.traveledDistance.y += stepY;
    this.position.x += stepX;
    this.position.y += stepY;
  }

  setNewDirection(map) {
    let player = this;
    console.log("setting new direction");

    let possibleDirections = [];
    function loadPossibleDirections() {
      const allDirections = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
      ];
      allDirections.forEach((direction) => {
        const nextX = Math.floor(player.position.x + direction.x);
        const nextY = Math.floor(player.position.y + direction.y);
        const isExceeding = nextX > 12 || nextY > 12 || nextX < 0 || nextY < 0;
        if (!isExceeding) {
          if (map[nextX][nextY].tileType === "path") {
            possibleDirections.push(direction);
          }
        }
      });
    }

    loadPossibleDirections();
    let randomDirection =
      possibleDirections[Math.floor(Math.random() * possibleDirections.length)];

    console.log(this.position.x, this.position.y);
    this.direction = randomDirection;
  }
}
