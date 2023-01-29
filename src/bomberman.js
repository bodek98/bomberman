domReady(mainGame);
function mainGame() {
  let game = new Game();
  game.mapManager = new MapManager();

  game.mapManager.updateMapScale();
  window.addEventListener("resize", () => {
    game.mapManager.updateMapScale();
  });

  game.generateStandardPlayers();

  // Start the game by requesting first frame
  // Every frame calls next one to be generated
  window.requestAnimationFrame(() => game.mainLoopStep());
}
