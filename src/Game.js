var knightPosition = [1, 7];
var observer = null;

function emitChange() {
  observer(knightPosition);
}

exports.observe = function (o) {
  if (observer) {
    throw new Error('Multiple observers not implemented');
  }

  observer = o;
  emitChange();
};


exports.moveKnight = function (x, y) {
  knightPosition = [x, y];
  emitChange();
};

exports.canMoveKnight = function (x, y) {
  const dx = Math.abs(x - knightPosition[0]);
  const dy = Math.abs(y - knightPosition[1]);

  return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
};
