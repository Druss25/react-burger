import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { useAppDispatch } from '../../services/store'
import { Location } from 'history'
import { getIngredients } from '../../services/reducers/ingredients/actions'
import Layout from '../Layouts/Layout'
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
  OrderFeedPage,
  OrderFeedId,
} from '../../pages'
import LayoutProfile from '../Layouts/LayoutProfile'
import ProtectedRoute from '../../routes/ProtectedRoute'
import ModalOrderDetailsPage from '../../pages/modalOrderDetails'

const App: React.FC = () => {
  const location = useLocation<{ background?: Location<{} | null | undefined> }>()

  const dispatch = useAppDispatch()
  const background = location.state && location.state.background

  React.useEffect(() => {
    dispatch(getIngredients())
    // eslint-disable-next-line
  }, [])

  return (
    <Layout>
      <Switch location={background || location}>
        <Route exact path="/" children={<HomePage />} />
        <Route path="/login" children={<LoginPage />} />
        <Route path="/register" children={<RegisterPage />} />
        <Route path="/forgot-password" children={<ForgotPasswordPage />} />
        <Route path="/reset-password" children={<ResetPasswordPage />} />
        <ProtectedRoute exact path="/profile">
          <LayoutProfile>
            <ProfilePage />
          </LayoutProfile>
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/orders">
          <LayoutProfile>
            <OrdersHistoryPage />
          </LayoutProfile>
        </ProtectedRoute>
        <Route path="/feed" exact children={<OrderFeedPage />} />
        <Route path="/feed/:id" children={<OrderFeedId />} />
        <Route path="/ingredients/:id" children={<IngredientPage />} />
        <Route path="*" children={<NotFoundPage />} />
      </Switch>
      {background && (
        <Switch>
          <Route path="/ingredients/:id" children={<ModalPage />} />
          <Route path="/feed/:id" children={<ModalOrderDetailsPage />} />
        </Switch>
      )}
    </Layout>
  )
}

export default App
