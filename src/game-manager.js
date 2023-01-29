class Game {
  constructor() {
    this.mapManager;
    this.players = new Map();
    this.tilesToUpdate = [];
    this.lastTime = 0;
    this.timeDelta = 0;
    this.frameDelay = 0;
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
    let scoreElement = document.getElementById(playerType + "-player-score");

    // Logic
    this.players.set(
      playerType,
      new Player(
        scoreElement,
        playerElement,
        x,
        y,
        this.mapManager.gameContainer
      )
    );
  }

  mainLoopStep() {
    this.gameStep();

    // Locks the game at max. 60 FPS
    this.calcualteFrameDelay();

    window.requestAnimationFrame(() => this.mainLoopStep());
  }

  calcualteFrameDelay() {
    const date = new Date();
    // timeDelta is time it took to render last frame [in ms]
    this.timeDelta = date.getTime() - this.lastTime;
    this.lastTime = date.getTime();

    // FRAMETIME_MS = 16.(6)ms and it's perfect delay between frames to get 60 fps
    // Keeping in mind that some of the time was spent on rendering the previous frame,
    // we have to subtract rendering time (timeDelta) from frametime to get the perfect delay for 60fps
    this.frameDelay = FRAMETIME_MS - this.timeDelta;
    if (this.frameDelay < 0) {
      this.frameDelay = 0;
    }
  }

  gameStep() {
    // Reference because "this." is not working inside lambdas
    let r = this;

    let freshlyUpdatedTiles = [];
    // Update players
    this.players.forEach((player) => {
      player.step(r.mapManager.map);
      player.updatePositionCSS();

      freshlyUpdatedTiles = freshlyUpdatedTiles.concat(
        player.manageBomb(r.mapManager.map)
      );
    });

    this.tilesToUpdate = this.tilesToUpdate.concat(freshlyUpdatedTiles);

    // Update tiles
    if (this.tilesToUpdate.length == 0) return;

    this.tilesToUpdate.forEach((tile) => {
      // Set timeout of map update, to match map changes with bomb animations
      setTimeout(() => {
        r.mapManager.refreshTileStyle(tile);
        setTimeout(() => {
          r.mapManager.refreshTileStyle(tile);
        }, EXPLOSION_DURATION);
      }, EXPLOSION_TIMEOUT);
    });

    this.tilesToUpdate = [];
  }
}
