import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../../pages/login/login';
import MainPage from '../../pages/main/main';
import NotFoundPage from '../../pages/not_found/not_found';
import PropertyPage from '../../pages/property/property';
import { Offer } from '../../types/offer';
import { Reviews } from '../../types/review';

type AppProps = {
  cardsCount: number;
  offers: Offer[];
  reviews: Reviews[];
}
function App({cardsCount, offers, reviews}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage offers={offers} cardsCount={cardsCount}/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/offer/:id" element={<PropertyPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
