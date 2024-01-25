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
    <div className="centeredColumn">
      <Header />
      <main className="centeredColumn">
        <Selector
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
