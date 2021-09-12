import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { GiBrokenPottery } from "react-icons/gi";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Spinner from "./assets/imgs/Loader.gif";
import Provider from "./store";

const Landing = React.lazy(() => import("./pages/Landing"));
const Detail = React.lazy(() => import("./pages/Detail"));

const Loader = () => {
  return (
    <div>
      <img src={Spinner} alt="fetch loader" />
    </div>
  );
};

function App() {
  const myErrorHandler = (error) => {
    console.log("error propagate", error);
  };
  return (
    <Suspense fallback={<Loader />}>
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
    </Suspense>
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
