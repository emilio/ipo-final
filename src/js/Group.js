import React, {Component} from 'react';
import Alumn from './Alumn';
import 'css/group';

/**
 * This represents a group with their its alumns.
 *
 * It has some alumns, potentially filtered, and just takes
 * care of storing them and rendering them appropiately.
 */
export default class Group extends Component {
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

    return (
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

