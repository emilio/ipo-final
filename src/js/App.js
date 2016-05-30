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

// Enhancement, use the ESC key to cancel searches.
//
// Only doable via window.dispatchEvent, so we won't do anything if that API is
// not available, instead of breaking.
if (window.dispatchEvent) {
  document.addEventListener("keypress", function(e) {
    if (e.keyCode === 27) { // ESC
      let event = new Event("input", { bubbles: true });
      [].slice.call(document.getElementsByTagName('input')).forEach(elem => {
        if (elem.type === "text" && "oninput" in elem) {
          elem.value = "";
          elem.dispatchEvent(event);
        }
      })
    }
  })
}

export default class App extends Component {
  render() {
    return (
      <main>
        <Header />
        <GroupList url="static/groups.json"/>
        <Footer />
      </main>
    );
  }
}
