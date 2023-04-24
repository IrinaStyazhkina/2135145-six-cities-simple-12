import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/routes';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';

function LoginPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const [authData, setAuthData] = useState<AuthData>({
    email: '',
    password: '',
  });

  const handleChangeInputValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setAuthData({...authData, [evt.target.name]: evt.target.value});
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginAction(authData));
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  data-testid="email__input"
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={authData.email}
                  required
                  onChange={handleChangeInputValue}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  data-testid="password__input"
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={authData.password}
                  required
                  onChange={handleChangeInputValue}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
