import "./App.css";
import Header from "./components/Header";
import MapChart from "./components/MapChart";

/** handling production and development:
 * place data in /public folder
 * set PUBLIC_URL in build script
 * (or enable PUBLIC_URL in .env only at build)
 * */

function App() {
  console.log("App render");
  return (
    <div className="centeredColumn">
      <Header />
      <main>
        {/* <MapChart area="gb" /> */}
        {/* <MapChart area="towerHamlets" /> */}
        <MapChart area="southwark" />
        <MapChart area="lewisham" />
        <MapChart area="greenwich" />
      </main>
    </div>
  );
}

export default App;
