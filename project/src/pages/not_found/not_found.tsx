import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray ">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" data-testid='logo-image'/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main">
        <div className="container" style={{
          width: '100%',
          textAlign: 'center',
          fontSize: '24px',
          lineHeight: '1.167',
          fontWeight: '700',
          fontStyle: 'oblique' }}
        >
          <p>404 Not Found. Go to <Link to="/" style={{textDecoration: 'underline'}}>main page</Link></p>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
