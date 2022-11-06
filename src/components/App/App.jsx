import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ForgotPasswordPage, HomePage, LoginPage, ProfilePage, RegisterPage, ResetPasswordPage, OrdersHistoryPage } from "../../pages";
import Layout from "../Layouts/Layout";
import LayoutProfile from '../Layouts/LayoutProfile';
import { ProtectedRoute } from '../ProtectedRoute';

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
          <ProtectedRoute exact strict path='/profile' >
            <LayoutProfile>
              <ProfilePage />
            </LayoutProfile>
          </ProtectedRoute>
          <ProtectedRoute exact path='/profile/orders' >
            <LayoutProfile>
              <OrdersHistoryPage />
            </LayoutProfile>
          </ProtectedRoute>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
