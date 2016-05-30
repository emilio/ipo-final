import React, {Component, PropTypes} from 'react';
import GroupManager from './GroupManager';
import 'css/alumn';
import { DragSource } from 'react-dnd';

const AVATAR_WIDTH_PX = 125;

/**
 * This is the small icon at the right that shows the alumn state.
 *
 * Read below for more info.
 */
class AlumnState extends Component {
  render() {
    let assignedState = 'unknown';

    if (this.props.wanted)
      assignedState = this.props.wanted === this.props.current ? 'assigned' :
                                                                 'unassigned';

    return (
      <span data-wanted={this.props.wanted}
            className={'alumn-state alumn-state--' + assignedState}>
        {this.props.wanted}
      </span>
    );
  }
}

AlumnState.propTypes = {
  wanted: PropTypes.any,
  current: PropTypes.any.isRequired
}

/**
 * The state of the alumn is dead simple.
 *
 * He can be in the group he/she wants, or not, and we might or might not know
 * about what group he/she wants.
 *
 * Thus, we have three possible states:
 *
 *   * He's in the group he wants and we know about it.
 *   * He's not in the group he wants and we know about it.
 *   * We don't know in which group he prefers to be.
 *
 * We obtain the group from the parent, and the wantedGroup from the data, so
 * it's trivial to determine the state.
 */
class Alumn extends Component {
  render() {
    // TODO: This dummy image url is just to generate dummy images and should
    // use this.props.imageUrl
    let imageUrl = 'https://api.adorable.io/avatars/' + AVATAR_WIDTH_PX + '/' + encodeURIComponent(this.props.name);

    const { name,
            id,
            connectDragSource,
            connectDragPreview,
            isDragging,
            groupId,
            wantedGroupId } = this.props;

    let extraClassName = isDragging ? 'alumn--dragging' : '';
    return connectDragPreview(connectDragSource(
      <div className={'alumn ' + extraClassName}>
        <img src={imageUrl} alt={'Avatar de ' + name} className='alumn-avatar' />
        <h3 className='alumn-name'>{name}</h3>
        <span className='alumn-id'>{id}</span>
        <AlumnState wanted={wantedGroupId} current={groupId} />
      </div>
    ));
  }
}

Alumn.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  groupId: PropTypes.any.isRequired,
  wantedGroupId: PropTypes.any,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
}

/**
 * Drag and Drop interaction
 */
const alumnSource = {
  beginDrag(props) {
    return props;
  },

  endDrag(props, monitor) {
    if (!monitor.didDrop())
      return;

    let result = monitor.getDropResult();
    if (result && result.movedTo)
      GroupManager.moveAlumn(props, result.movedTo);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

export default DragSource('ALUMN', alumnSource, collect)(Alumn);
