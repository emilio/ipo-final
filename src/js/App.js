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

// Maybe disable scroll.
//
// This is enabled when we're dragging an alumn,
// to prevent janky behaviour on mobile browsers.
//
// See beginDrag() and endDrag() in Alumn.js
//
// This is a hack that should be done by the back-end
// but anyway...
if (window.Modernizr && window.Modernizr.touchevents) {
  let preventDefaultIfDisabled = function(e) {
    if (window.SCROLLING_DISABLED)
      e.preventDefault();
  };

  let events = ["touchstart", "touchend", "touchmove", "mousemove"];
  events.forEach(name => {
    window.addEventListener(name, preventDefaultIfDisabled, false);
    document.body.addEventListener(name, preventDefaultIfDisabled, false);
  })
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
