domReady(mainGame);
function mainGame() {
  const mapSize = 13;
  let game = new Game();
  game.mapManager = new MapManager(mapSize);

  game.mapManager.updateMapScale();
  window.addEventListener("resize", () => {
    game.mapManager.updateMapScale();
  });

  // Temporary explosion setup
  {
    let developer_ghost_player = new Player(
      document.createElement("div"),
      6,
      6,
      game.mapManager.gameContainer
    );
    let explodedTiles = developer_ghost_player.placeBomb(game.mapManager.map);

    // Adding exploded tiles coordinates to list of tiles that will be updated next frame
    game.tilesToUpdate = game.tilesToUpdate.concat(explodedTiles);
  }

  game.generateStandardPlayers();
  game.mainLoop();
}
