import React, {Component} from 'react';

const AVATAR_WIDTH_PX = 125;

class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>Selección de grupos</h1>
      </header>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <p>&copy; 2016 Emilio Cobos</p>
        <p>License: GPLv3</p>
      </footer>
    );
  }
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
  constructor() {
    super();
  }

  render() {
    // TODO: This dummy image url is just to generate dummy images and should
    // use this.props.imageUrl
    let imageUrl = "https://api.adorable.io/avatars/" + AVATAR_WIDTH_PX + "/" + encodeURIComponent(this.props.name);

    let assignedState = "unknown";

    if (this.props.wantedGroupId)
      assignedState = this.props.wantedGroup == this.props.groupId ? "assigned" :
                                                                     "unassigned";

    return (
      <div className="alumn">
        <img src={imageUrl} className="alumn-avatar" />
        <h3 className="alumn-name">{this.props.name}</h3>
        <span className="alumn-id">{this.props.id}</span>
        <span data-wanted={this.props.wantedGroupId}
              className={"alumn-state alumn-state--" + assignedState}>
        </span>
      </div>
    );
  }
}

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

class GroupList extends Component {
  constructor() {
    super()
    this.state = {
      groups: [],
      searchQuery: "",
    };
  }

  handleSearch(e) {
    let value = e.target.value;
    if (this.state.searchQuery !== value) {
      this.setState({
        groups: this.state.groups,
        searchQuery: value,
      })
    }
  }

  componentDidMount() {
    fetch(this.props.url)
      .then(response => response.json())
      .then(groups => this.setState(groups))
      .catch(err => console.error(err));
  }

  render() {
    let query = this.state.searchQuery;

    if (query)
      query = query.toLowerCase();

    let groups = this.state.groups.map(group => {
      let alumns = group.alumns;
      if (query) {
        alumns = alumns.filter(alumn => {
          return alumn.id.toLowerCase().indexOf(query) !== -1 ||
                 alumn.name.toLowerCase().indexOf(query) !== -1;
        });
      }
      return <Group key={group.id} id={group.id} alumns={alumns} unfilteredAlumns={group.alumns}></Group>;
    });

    return (
      <div className="group-list">
        <input className="group-list-searcher" type="text" onChange={this.handleSearch.bind(this)} />
        <div className="group-list-groups">
          {groups}
        </div>
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <main>
        <Header />
        <GroupList url="/static/groups.json"/>
        <Footer />
      </main>
    );
  }
}
