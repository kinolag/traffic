import "./App.css";
import { useState } from "react";
import { type AvailableArea, AREAS } from "./assets/data/typesAndConstants";
import Header from "./components/Header";
import Selector from "./components/Selector";
import MapChart from "./components/MapChart";

/** handling production and development:
 * place data in /public folder
 * set PUBLIC_URL in build script
 * (or enable PUBLIC_URL in .env only at build)
 * */

function App() {
  const [selectedArea, setSelectedArea] = useState<AvailableArea>("lewisham");
  return (
    <div
      className="w100pc centeredColumn"
      style={{ maxWidth: "960px", margin: "auto" }}
    >
      <Header />
      <main className="w100pc centeredColumn">
        <Selector
          className="txt-12"
          style={{ marginTop: "12px" }}
          labelText="Select Area"
          options={AREAS}
          value={selectedArea}
          setArea={setSelectedArea}
        />
        <MapChart area={selectedArea} />
      </main>
    </div>
  );
}

export default App;
