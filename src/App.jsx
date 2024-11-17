import { Provider } from "react-redux";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./Routes";
import { Toaster } from "react-hot-toast";
import { toastDuration } from "./utilities/consts";

function App({ store }) {
  return (
    <Provider store={store}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: toastDuration,
        }}
      />
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;
