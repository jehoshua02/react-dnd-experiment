var React = require('react');
var Board = require('./Board');
var observe = require('./Game').observe;

var rootEl = document.getElementById('root');

observe(function (knightPosition) {
  React.render(
    <Board knightPosition={knightPosition} />,
    rootEl
  );
});
