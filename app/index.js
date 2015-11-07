import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './Root';
import './styles/app.scss';
import 'leaflet/dist/leaflet.css';
import 'react-select/dist/react-select.min.css';

const mount = document.querySelector('[data-mount]');

render(<Root />, mount);
