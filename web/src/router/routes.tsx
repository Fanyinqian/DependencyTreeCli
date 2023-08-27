import React from 'react';
import { Route, Switch } from 'react-router-dom';
import G6demo from '../G6demo';
import G6demo2 from '../G6demo2';

const routes = (
  <Switch>
    <Route path="/" exact component={G6demo} />
    <Route path="/dev" component={G6demo2} />
  </Switch> 
);

export default routes;