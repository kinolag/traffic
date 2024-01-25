import "./App.css";
import Header from "./components/Header";
import MapChart from "./components/MapChart";

/** handling production and development:
 * place data in /public folder
 * set PUBLIC_URL in build script
 * (or enable PUBLIC_URL in .env only at build)
 * */

// export type Areas = Array<AvailableArea>;

// const AREAS: Areas = [
//   { value: "greenwich", label: "Greenwich" },
//   { value: "lewisham", label: "Lewisham" },
//   { value: "southwark", label: "Southwark" },
//   { value: "towerHamlets", label: "Tower Hamlets" },
// ];

function App() {
  console.log("App render");
  return (
    <div className="centeredColumn">
      <Header/>
      <main>
        {/* <MapChart area="gb" /> */}
        <MapChart area="towerHamlets" />
        <MapChart area="southwark" />
        <MapChart area="lewisham" />
        <MapChart area="greenwich" />
      </main>
    </div>
  );
}

export default App;
