//NPM Imports
import React from 'react';
import { render } from "react-dom";
import { Router, Route, hashHistory } from 'react-router'


//styles
import '../styles/app.scss';

//Local File Imports
import App from './components/App.jsx';


render(
  <App />,
  document.getElementById('app')
);
