import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { GiBrokenPottery } from "react-icons/gi";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Provider from "./store";

const Landing = React.lazy(() => import("./pages/Landing"));
const Detail = React.lazy(() => import("./pages/Detail"));

function App() {
  const myErrorHandler = (error) => {
    console.log("error propagate", error);
  };

  useEffect(() => {
    const el = document.querySelector(".loader-spin");

    if (el) {
      el.remove();
    }
  }, []);
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
      onError={myErrorHandler}
    >
      <Provider>
        <div className="App">
          <Router>
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/news/:id" exact component={Detail} />
            </Switch>
          </Router>
        </div>
      </Provider>
    </ErrorBoundary>
  );
}
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <GiBrokenPottery size={100} style={{ alignSelf: "center" }} />
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

export default App;
