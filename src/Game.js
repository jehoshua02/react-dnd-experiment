module.exports.observe = function (receive) {
  setInterval(function () {
    receive([
      Math.floor(Math.random() * 8),
      Math.floor(Math.random() * 8)
    ]);
  }, 500);
};
