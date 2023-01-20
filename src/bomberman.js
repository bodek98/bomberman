domReady(mainGame);
function mainGame() {
  let game = new Game();
  game.mapManager = new MapManager();

  game.mapManager.updateMapScale();
  window.addEventListener("resize", () => {
    game.mapManager.updateMapScale();
  });

  // Temporary explosion setup
  {
    let developer_ghost_player = new Player(
      document.createElement("div"),
      12,
      0,
      game.mapManager.gameContainer
    );
    let explodedTiles = developer_ghost_player.placeBomb(game.mapManager.map);

    // Adding exploded tiles coordinates to list of tiles that will be updated next frame
    game.tilesToUpdate = game.tilesToUpdate.concat(explodedTiles);
  }

  game.generateStandardPlayers();

  // Start the game by requesting first frame
  // Every frame calls next one to be generated
  window.requestAnimationFrame(() => game.mainLoopStep());
}
