class Player extends Actor {
  constructor(_element, _x = 0, _y = 0, gameContainer) {
    super(_element, _x, _y);
    this.element.classList.add("player");

    let bombElement = document.createElement("div");
    gameContainer.appendChild(bombElement);
    this.bomb = new Bomb(bombElement, -1, -1);
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
    this.bomb.updatePosition();
  }
}
