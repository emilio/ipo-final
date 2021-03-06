import React, {Component, PropTypes} from 'react';
import Group from './Group';
import GroupManager from './GroupManager';
import 'css/group-list';
import { DragDropContext } from 'react-dnd';
import Html5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import AlumnPreview from './DragLayer';

/**
 * This class represent a list of groups, and has the hability
 * to filter alumns when a query arrives.
 */
class GroupList extends Component {
  constructor() {
    super();
    this.state = {
      groups: [],
      searchQuery: ''
    };
  }

  handleSearch(e) {
    let value = e.target.value;
    if (this.state.searchQuery !== value) {
      this.setState({
        groups: this.state.groups,
        searchQuery: value
      });
    }
  }

  componentDidMount() {
    GroupManager.onChange(groups => {
      this.setState({
        groups: groups,
        searchQuery: this.state.searchQuery
      });
    });
    // TODO: does this.props.url make any sense now
    // GroupManager is a singleton? Probably not but huh...
    GroupManager.init(this.props.url);
  }

  render() {
    let query = this.state.searchQuery;

    if (query) {
      query = query.toLowerCase();
    }

    let averageGroupLength = this.state.groups
                                       .reduce((sum, group) => sum + group.alumns.length, 0) / this.state.groups.length;


    let groups = this.state.groups.map(group => {
      let alumns = group.alumns;
      if (query) {
        alumns = alumns.filter(alumn => {
          return alumn.id.toLowerCase().indexOf(query) !== -1 ||
                 alumn.name.toLowerCase().indexOf(query) !== -1;
        });
      }
      return (
          <Group key={group.id}
                 id={group.id}
                 alumns={alumns}
                 unfilteredAlumns={group.alumns}
                 averageGroupLength={averageGroupLength} />
      );
    });

    return (
      <div className='group-list'>
        <input className='group-list-searcher'
               placeholder='Nombre o DNI'
               type='text'
               onChange={this.handleSearch.bind(this)} aria-label='Búsqueda' />
        <div className='group-list-groups'>
          {groups}
        </div>
        <AlumnPreview />
      </div>
    );
  }
}

GroupList.propTypes = {
  url: PropTypes.string.isRequired
};

let selectedBackend = Html5Backend;
if (window.Modernizr && window.Modernizr.touchevents) {
  selectedBackend = TouchBackend({ enableMouseEvents: true });
}

export default DragDropContext(selectedBackend)(GroupList);
