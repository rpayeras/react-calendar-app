import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter } from './routers/AppRouter';
import { BrowserRouter } from "react-router-dom";

import './styles.css'
import './modal.css'

ReactDOM.render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>,
  document.getElementById('root')
);