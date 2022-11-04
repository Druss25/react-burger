import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ForgotPasswordPage, HomePage, LoginPage, RegisterPage, ResetPasswordPage } from "../../pages";
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
          <Route path='/register' >
            <RegisterPage />
          </Route>
          <Route path='/forgot-password' >
            <ForgotPasswordPage />
          </Route>
          <Route path='/reset-password' >
            <ResetPasswordPage />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
