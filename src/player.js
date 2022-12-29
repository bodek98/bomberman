class Player extends Actor {
  constructor(_element, _x = 0, _y = 0, gameContainer) {
    super(_element, _x, _y);
    this.element.classList.add("player");

    let bombElement = document.createElement("div");
    gameContainer.appendChild(bombElement);
    this.bomb = new Bomb(bombElement, -1, -1);

    this.direction = { x: 1, y: 0 };
    this.traveledDistance = { x: 0, y: 0 };
    this.movementSpeed = 2;
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
      this.setNewDirection(map);
    }

    let stepX = (this.direction.x / 60) * this.movementSpeed;
    let stepY = (this.direction.y / 60) * this.movementSpeed;
    this.traveledDistance.x += stepX;
    this.traveledDistance.y += stepY;
    this.position.x += stepX;
    this.position.y += stepY;
  }

  setNewDirection(map) {
    console.log("new Tile");
  }
}
