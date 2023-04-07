export enum APIRoute {
  Offers = '/hotels',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum AppRoute {
  Login = '/login',
  Main = '/',
  Room = '/offer/:id',
  NotFound = '*',
}
