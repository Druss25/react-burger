import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  OrdersHistoryPage,
  NotFoundPage,
  IngredientsPage,
} from "../../pages";
import Layout from "../Layouts/Layout";
import LayoutProfile from "../Layouts/LayoutProfile";
import { ProtectedRoute, PublicRoute } from "../../routes";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PublicRoute path="/register">
            <RegisterPage />
          </PublicRoute>
          <PublicRoute path="/forgot-password">
            <ForgotPasswordPage />
          </PublicRoute>
          <PublicRoute path="/reset-password">
            <ResetPasswordPage />
          </PublicRoute>
          <ProtectedRoute exact path="/profile">
            <LayoutProfile>
              <ProfilePage />
            </LayoutProfile>
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders">
            <LayoutProfile>
              <OrdersHistoryPage />
            </LayoutProfile>
          </ProtectedRoute>
          <Route path="/ingredients/:id">
            <IngredientsPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
