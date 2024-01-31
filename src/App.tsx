import "./App.css";
import Header from "./components/Header";
import MapChart from "./components/MapChart";
import Legend from "./components/Legend";
import Footer from "./components/Footer";

/** handling production and development:
 * place data in /public folder
 * set PUBLIC_URL in build script
 * */

import { useState, ReactElement } from "react";

function App() {
  const [error, setError] = useState<string | null>();
  const ErrorBoundary = ({ children }: { children: ReactElement }) => {
    if (error) {
      return <p className="txt-c is-orangered line-plus">{error}</p>;
    }
    return children;
  };

  return (
    <div
      className="centeredColumn w90pc"
      style={{ maxWidth: "960px", margin: "auto" }}
    >
      <Header />
      <ErrorBoundary>
        <main className="w100pc">
          <MapChart setError={setError} />
          <Legend />
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default App;
