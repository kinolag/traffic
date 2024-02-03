import "./App.css";
import Header from "./components/Header";
import DataWrapper from "./components/DataWrapper";
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
      return <p className="txt-c is-orangered line-1-5">{error}</p>;
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
          <DataWrapper setError={setError} />
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default App;
