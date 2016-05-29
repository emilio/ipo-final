import React, {Component, PropTypes} from 'react';
import GroupManager from './GroupManager';
import Alumn from './Alumn';
import 'css/group';
import { DropTarget } from 'react-dnd';

/**
 * This represents a group with their its alumns.
 *
 * It has some alumns, potentially filtered, and just takes
 * care of storing them and rendering them appropiately.
 */
class Group extends Component {
  constructor() {
    super();
  }

  render() {
    let alumns = this.props.alumns.map(alumn => {
      return <Alumn key={alumn.id} id={alumn.id}
                    name={alumn.name} url={alumn.imageUrl}
                    wantedGroupId={alumn.wantedGroupId}
                    groupId={this.props.id} />;
    })

    let filtered = false;
    let filteredCount = alumns.length;
    let totalCount = filteredCount;

    if (this.props.unfilteredAlumns) {
      totalCount = this.props.unfilteredAlumns.length;
      filtered = filteredCount != totalCount;
    }

    console.log("canDrop: " + this.props.canDrop + ", isOver: " + this.props.isOver);

    return this.props.connectDropTarget(
      <div className="group">
        <header className="group-header">
          <span className="group-alumn-count"
                data-filtered={filtered}
                data-total-count={totalCount}
                data-filtered-count={filteredCount}>
            <span className="group-alumn-count-filtered">{filteredCount}</span>
            <span className="group-alumn-count-separator"></span>
            <span className="group-alumn-count-total">{totalCount}</span>
          </span>
          <h2 className="group-title">{this.props.id}</h2>
        </header>
        <div className="group-alumns">
          {alumns}
        </div>
      </div>
    );
  }
}

Group.propTypes = {
  id: PropTypes.any.isRequired,
  alumns: PropTypes.array.isRequired,
  unfilteredAlumns: PropTypes.array,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
};

const groupTarget = {
  canDrop(props, monitor) {
    // TODO: validate something like max group size?
    return props.id != monitor.getItem().groupId;
  },

  drop(props, monitor) {
    return { movedTo: props.id }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

/** TODO: don't hardcode here! */
export default DropTarget("ALUMN", groupTarget, collect)(Group);
