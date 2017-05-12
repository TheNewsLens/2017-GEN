import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('app')
  )
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./components/App", () => {
    render(App)
  });
}