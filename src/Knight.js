var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('./Constants').ItemTypes;
var DragSource = require('react-dnd').DragSource;

var Knight = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  },

  render: function () {
    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move'
      }}>
        <span>♘</span>
      </div>
    );
  }
});

var dragSource = {
  spec: {
    beginDrag: function (props) {
      return {};
    }
  },
  props: function (connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
  }
};

module.exports = DragSource(
  ItemTypes.KNIGHT,
  dragSource.spec,
  dragSource.props
)(Knight);
