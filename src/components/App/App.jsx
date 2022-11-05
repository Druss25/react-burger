import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ForgotPasswordPage, HomePage, LoginPage, ProfilePage, RegisterPage, ResetPasswordPage } from "../../pages";
import OrdersHistoryPage from '../../pages/order-history';
import Layout from "../Layouts/Layout";
import LayoutProfile from '../Layouts/LayoutProfile';

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
          <Route exact strict path='/profile' >
            <LayoutProfile>
              <ProfilePage />
            </LayoutProfile>
          </Route>
          <Route exact strict path='/profile/orders' >
            <LayoutProfile>
              <OrdersHistoryPage />
            </LayoutProfile>
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
