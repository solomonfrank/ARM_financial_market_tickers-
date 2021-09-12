import React from "react";
import { GiBrokenPottery } from "react-icons/gi";
import "./index.scss";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div role="alert" style={{}}>
        <GiBrokenPottery
          color="red"
          size={100}
          style={{ alignSelf: "center" }}
        />
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button className="try_again_btn" onClick={resetErrorBoundary}>
          Try again
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
