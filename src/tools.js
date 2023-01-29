const FRAMERATE = 60;
const FRAMETIME_MS = 1000 / 60;
const MAP_SIZE = 13;
const EXPLOSION_TIMEOUT = 2500;
const EXPLOSION_DURATION = 1000;

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

function isOutOfBounds(x, y) {
  const isX = x < 0 || x >= MAP_SIZE;
  const isY = y < 0 || y >= MAP_SIZE;

  return isX || isY;
}
