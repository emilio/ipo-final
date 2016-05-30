import React from 'react';
import {render} from 'react-dom';
import App from 'js/App';
import 'css/base';

// Accessibility
// import a11y from 'react-a11y';
// a11y(React,  { throw: true });

render(
  <App />,
  document.getElementById('root')
);
