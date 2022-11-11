import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import {
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  OrdersHistoryPage,
  NotFoundPage,
  IngredientPage,
  ModalPage,
} from '../../pages'
import Layout from '../Layouts/Layout'
import LayoutProfile from '../Layouts/LayoutProfile'
import { ProtectedRoute, PublicRoute } from '../../routes'

function App() {
  const location = useLocation()
  let background = location.state && location.state.background

  return (
    <Layout>
      <Switch location={background || location}>
        <Route exact path="/" children={<HomePage />} />
        <Route path="/login" children={<LoginPage />} />
        <Route path="/register" children={<RegisterPage />} />
        <Route path="/forgot-password" children={<ForgotPasswordPage />} />
        <PublicRoute path="/reset-password" children={<ResetPasswordPage />} />
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
        <Route path="/ingredients/:id" children={<IngredientPage />} />
        <Route path="*" children={<NotFoundPage />} />
      </Switch>
      {background && <Route path="/ingredients/:id" children={<ModalPage />} />}
    </Layout>
  )
}

export default App
