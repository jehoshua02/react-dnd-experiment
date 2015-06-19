var React = require('react');
var PropTypes = React.PropTypes;
var Knight = require('./Knight');
var Square = require('./Square');

var Board = React.createClass({
  propTypes: {
    knightPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  },

  render: function () {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {this.renderSquares()}
      </div>
    );
  },

  renderSquares: function () {
    var squares = [];

    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return squares;
  },

  renderSquare: function (i) {
    var x = i % 8;
    var y = Math.floor(i / 8);
    var black = (x + y) % 2 === 1;

    var knightX = this.props.knightPosition[0];
    var knightY = this.props.knightPosition[1];
    var piece = (x === knightX && y === knightY) ?
      <Knight /> :
      null;

    return (
      <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
        <Square black={black}>
          {piece}
        </Square>
      </div>
    );
  }
});

module.exports = Board;
