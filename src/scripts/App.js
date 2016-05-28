import React, {Component} from 'react';

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

class Alumn extends Component {
  onClick() {
    alert("Yay!");
  }

  render() {
    // TODO: This dummy image url is just to generate dummy images and should
    // use this.props.imageUrl
    let imageUrl = "https://api.adorable.io/avatars/162/" + encodeURIComponent(this.props.name);
    return (
      <div className="alumn"
           style={{backgroundImage: imageUrl}}
           onClick={this.onClick}>
        <h3 className="alumn-name">{this.props.name}</h3>
        <span className="alumn-state alumn-state-{this.state.assignedState}"></span>
      </div>
    );
  }
}

class Group extends Component {
  render() {
    let alumns = this.props.alumns.map(alumn => {
      return (<Alumn key={alumn.name} name={alumn.name} url={alumn.imageUrl} />);
    })
    return (
      <div className="group">
        <h2 className="group-title">{this.id}</h2>
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
      groups: []
    };
  }

  componentDidMount() {
    fetch(this.props.url)
      .then(response => response.json())
      .then(groups => this.setState(groups))
      .catch(err => console.error(err));
  }

  render() {
    let groups = this.state.groups.map(group => {
      return (<Group key={group.id} alumns={group.alumns}></Group>);
    });

    return (
      <div className="group-list">
        {groups}
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
