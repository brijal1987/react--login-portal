import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './helpers';
import { App } from './App';
import { BrowserRouter, withRouter } from "react-router-dom";

import { configureFakeAPI } from './helpers';

configureFakeAPI();

const AppContainer = withRouter(props => <App {...props} />);
render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>,
    document.getElementById('app')
);
/*
render(
        <App />,
    document.getElementById('app')
);*/
