var React = require('react');
var PropTypes = React.PropTypes;
var Square = require('./Square');
var canMoveKnight = require('./Game').canMoveKnight;
var moveKnight = require('./Game').moveKnight;
var ItemTypes = require('./Constants').ItemTypes;
var DropTarget = require('react-dnd').DropTarget;

var BoardSquare = React.createClass({
  propTypes: {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired
  },

  render: function () {
    var {x, y} = this.props;
    var connectDropTarget = this.props.connectDropTarget;
    var isOver = this.props.isOver;
    var canDrop = this.props.canDrop;
    var black = (x + y) % 2 === 1;

    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Square black={black}>
          {this.props.children}
        </Square>

        {isOver && !canDrop && this.renderOverlay('red')}
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')}
      </div>
    );
  },

  renderOverlay: function (color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color
      }} />
    );
  }
});

var dropTarget = {
  spec: {
    canDrop: function (props) {
      return canMoveKnight(props.x, props.y);
    },
    drop: function (props, monitor) {
      moveKnight(props.x, props.y);
    }
  },

  props: function (connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    };
  }
};

module.exports = DropTarget(
  ItemTypes.KNIGHT,
  dropTarget.spec,
  dropTarget.props
)(BoardSquare);
