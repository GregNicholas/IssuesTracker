import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { IssuesContextProvider } from "./contexts/IssuesContext";
import { AuthProvider } from "./contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./components/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <AuthProvider>
      <IssuesContextProvider>
        <App />
      </IssuesContextProvider>
    </AuthProvider>
  </StrictMode>,
  rootElement
);
