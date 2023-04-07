import { Route, Routes } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AuthStatus } from '../../const/auth-status';
import { AppRoute } from '../../const/routes';
import { useAppSelector } from '../../hooks/use-app-selector';
import LoginPage from '../../pages/login/login';
import MainPage from '../../pages/main/main';
import NotFoundPage from '../../pages/not_found/not_found';
import PropertyPage from '../../pages/property/property';
import HistoryRouter from '../history-router/history-router';
import LoadingScreen from '../loading-screen/loading-screen';

function App(): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isDataLoading = useAppSelector((state) => state.isDataLoading);

  if(authorizationStatus === AuthStatus.Unknown || isDataLoading) {
    return <LoadingScreen/>;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage/>}/>
        <Route path={AppRoute.Login} element={<LoginPage/>}/>
        <Route path={AppRoute.Room} element={<PropertyPage/>}/>
        <Route path={AppRoute.NotFound} element={<NotFoundPage/>}/>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
