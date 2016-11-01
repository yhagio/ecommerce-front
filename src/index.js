import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';

import getRoutes from './config/routes';

render(
  getRoutes(browserHistory),
  document.getElementById('root')
);
