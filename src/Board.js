var React = require('react');
var PropTypes = React.PropTypes;
var Knight = require('./Knight');
var BoardSquare = require('./BoardSquare');
var {moveKnight, canMoveKnight} = require('./Game');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd/modules/backends/HTML5');

var Board = React.createClass({
  propTypes: {
    knightPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  },

  render: function () {
    return (
      <div style={{
        position: 'relative',
        height: 0,
        width: '100%',
        paddingTop: '100%'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          position: 'absolute',
          top: 0,
          left: 0
        }}>
          {this.renderSquares()}
        </div>
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

    return (
      <div key={i}
        style={{ width: '12.5%', height: '12.5%' }}
        onClick={this.handleSquareClick.bind(this, x, y)}>
        <BoardSquare x={x} y={y}>
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    );
  },

  renderPiece: function (x, y) {
    var knightX = this.props.knightPosition[0];
    var knightY = this.props.knightPosition[1];
    return (x === knightX && y === knightY) ? <Knight /> : null;
  },

  handleSquareClick: function (x, y) {
    if (canMoveKnight(x, y)) {
      moveKnight(x, y);
    }
  }
});

module.exports = DragDropContext(HTML5Backend)(Board);
