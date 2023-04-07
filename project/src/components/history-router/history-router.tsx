import { BrowserHistory } from "history";
import { ReactNode, useLayoutEffect, useState } from "react";
import { Router } from "react-router-dom";

export interface HistoryRouterProps {
  history: BrowserHistory;
  basename?: string;
  children?: ReactNode;
}
function HistoryRouter({history, basename,children}:HistoryRouterProps) : JSX.Element {

  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => {
    history.listen(setState);
  }, [history]);

  return (
    <Router basename={basename}
            location={state.location}
            navigator={history}
            navigationType={state.action}
    >
      {children}
    </Router>
  );
}

export default HistoryRouter;
