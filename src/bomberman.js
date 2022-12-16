domReady(mainGame);
function mainGame() {
  const mapSize = 13;
  let mapManager = new MapManager(mapSize);

  mapManager.updateMapScale();
  window.addEventListener("resize", () => {
    mapManager.updateMapScale();
  });

  // Temporary explosion setup
  let developer_ghost_player = new Player("ghost");
  developer_ghost_player.position = { x: 6, y: 6 };
  bomb_position = developer_ghost_player.placeBomb(mapManager.map);
  mapManager.refreshTileStyle(bomb_position);
}
