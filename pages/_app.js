import "../styles/globals.css";

// Redux
import { Provider } from "react-redux";
import store from "../store/index";
import MarketContextProvider from "../context/MarketContext";
//

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MarketContextProvider>
        <Component {...pageProps} />
      </MarketContextProvider>
    </Provider>
  );
}

export default MyApp;
