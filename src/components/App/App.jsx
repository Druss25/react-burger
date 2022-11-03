import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { HomePage, LoginPage } from "../../pages";
import Layout from "../Layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' >
            <HomePage />
          </Route>
          <Route path='/login' >
            <LoginPage />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
