import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';
import LoginPage from '../../pages/login/login';
import MainPage from '../../pages/main/main';
import NotFoundPage from '../../pages/not_found/not_found';
import PropertyPage from '../../pages/property/property';
import { Reviews } from '../../types/review';
import LoadingScreen from '../loading-screen/loading-screen';

type AppProps = {
  reviews: Reviews[];
}
function App({ reviews}: AppProps): JSX.Element {

  const isDataLoading = useAppSelector((state) => state.isDataLoading);

  if(isDataLoading) {
    return <LoadingScreen/>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/offer/:id" element={<PropertyPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
