class Game {
  constructor() {
    this.mapManager;
    this.players = new Map();
    this.tilesToUpdate = [];
  }

  generateStandardPlayers() {
    const maxTileID = this.mapManager.mapSize - 1;

    this.initializePlayer("green", 0, 0);
    this.initializePlayer("red", maxTileID, maxTileID);
  }

  initializePlayer(playerType, x, y) {
    // Player HTML front-end code
    let playerElement = document.createElement("div");
    playerElement.id = "player-" + playerType;
    this.mapManager.gameContainer.appendChild(playerElement);

    // Logic
    this.players.set(
      playerType,
      new Player(playerElement, x, y, this.mapManager.gameContainer)
    );
  }

  mainLoopStep() {
    this.gameStep();
    window.requestAnimationFrame(() => this.mainLoopStep());
  }

  gameStep() {
    // Reference because "this." is not working inside lambdas
    let r_mapManager = this.mapManager;

    // Update players
    this.players.forEach((player) => {
      player.step(r_mapManager.map);
      player.updatePositionCSS();
    });

    // Update tiles
    if (!this.tileUpdateList) return;

    this.tileUpdateList.forEach((tile) => {
      r_mapManager.refreshTileStyle(tile);
    });
  }
}
