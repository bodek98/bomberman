domReady(mainGame);
function mainGame() {
  const mapSize = 13;
  let mapManager = new MapManager(mapSize);

  // Temporary explosion setup
  let developer_ghost_player = new Player("ghost");
  developer_ghost_player.position = { x: 6, y: 6 };
  developer_ghost_player.placeBomb(mapManager.map);
}
