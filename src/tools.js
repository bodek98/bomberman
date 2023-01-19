const FRAMERATE = 60;

// Ensuring that JS is being run only after DOM is loaded
function domReady(fn) {
  // If we're early to the party
  document.addEventListener("DOMContentLoaded", fn);
  // If late; I mean on time.
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    fn();
  }
}

function isOutOfBounds(x, y, mapSize) {
  const isX = x < 0 || x >= mapSize;
  const isY = y < 0 || y >= mapSize;

  return isX || isY;
}
