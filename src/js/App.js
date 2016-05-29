import React, {Component} from 'react';
import GroupList from './GroupList'

class Header extends Component {
  render() {
    return (
      <header className="site-header">
        <h1>Selección de grupos</h1>
      </header>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <footer className="site-footer">
        <p>&copy; 2016 Emilio Cobos</p>
        <p>License: GPLv3</p>
      </footer>
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
