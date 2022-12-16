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
    let ghostElement = document.createElement("div");
    let developer_ghost_player = new Player(ghostElement, 6, 6);
    bomb_position = developer_ghost_player.placeBomb(game.mapManager.map);
    game.mapManager.refreshTileStyle(bomb_position);
  }

  game.generateStandardPlayers();
  game.mainLoop();
}
