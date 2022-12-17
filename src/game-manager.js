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

  mainLoop() {
    const frameRate = 60;
    const frameTime = 1000 / frameRate;

    // Execute gameStep function 60 times a second
    setInterval(this.gameStep, frameTime, this.tilesToUpdate, this.mapManager);
  }

  gameStep(tileUpdateList, mapManager) {
    function updateTiles(tileUpdateList) {
      tileUpdateList.forEach((tile) => {
        mapManager.refreshTileStyle(tile);
      });
    }

    updateTiles(tileUpdateList);
  }
}
