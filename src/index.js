var React = require('react');
var Board = require('./Board');

React.render(
  <Board knightPosition={[0, 0]} />,
  document.getElementById('root')
);
