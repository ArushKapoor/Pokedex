import Layout from "../components/layout/Layout";
import "../styles/index.css";
import "../styles/globals.css";
import { StateProvider } from "../components/react-context-api/StateProvider";
import reducer, { initialState } from "../components/react-context-api/reducer";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateProvider>
  );
}

export default MyApp;
