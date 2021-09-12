import { ErrorBoundary } from "react-error-boundary";
import { GiBrokenPottery } from "react-icons/gi";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Detail from "./pages/Detail";
import Landing from "./pages/Landing";
import Provider from "./store";

function App() {
  const myErrorHandler = (error) => {
    console.log("error propagate", error);
  };
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
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default App;
