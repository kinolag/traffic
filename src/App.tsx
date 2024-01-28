import "./App.css";
import Header from "./components/Header";
import MapChart from "./components/MapChart";
import Legend from "./components/Legend";
import Footer from "./components/Footer";

/** handling production and development:
 * place data in /public folder
 * set PUBLIC_URL in build script
 * */

function App() {
  return (
    <div
      className="centeredColumn w90pc"
      style={{ maxWidth: "960px", margin: "auto" }}
    >
      <Header />
      <main className="w100pc">
        <MapChart />
        <Legend />
      </main>
      <Footer />
    </div>
  );
}

export default App;
