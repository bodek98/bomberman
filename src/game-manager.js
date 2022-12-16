class Game {
  constructor() {
    this.mapManager;
    this.players = new Map();
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
    playerElement.classList.add("player");
    this.mapManager.gameContainer.appendChild(playerElement);

    // Logic
    this.players.set(playerType, new Player(playerElement, x, y));
  }

  mainLoop() {
    const frameRate = 60;
    const frameTime = 1000 / frameRate;

    setInterval(function () {
      console.log("frame");
      // Logic
    }, frameTime);
  }
}
