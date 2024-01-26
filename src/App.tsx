import "./App.css";
import { useState } from "react";
import {
  type AvailableArea,
  AREAS,
  type AvailableVehicle,
  VEHICLES,
} from "./assets/data/typesAndConstants";
import Header from "./components/Header";
import Selector from "./components/Selector";
import MapChart from "./components/MapChart";
import Legend from "./components/Legend";
import Footer from "./components/Footer";

/** handling production and development:
 * place data in /public folder
 * set PUBLIC_URL in build script
 * */

function App() {
  const [selectedArea, setSelectedArea] = useState<AvailableArea>("lewisham");
  const [selectedVehicle, setSelectedVehicle] =
    useState<AvailableVehicle>("All_motor_vehicles");
  return (
    <div
      className="w100pc centeredColumn"
      style={{ maxWidth: "960px", margin: "auto" }}
    >
      <Header />
      <main className="w100pc centeredColumn">
        <div className="w90pc spacedRow" style={{ marginTop: "12px" }}>
          <Selector
            className="txt-12"
            labelText="Select Area"
            options={AREAS}
            value={selectedArea}
            setArea={setSelectedArea}
          />
          <Selector
            className="txt-12"
            labelText="Select Vehicle Type"
            options={VEHICLES}
            value={selectedVehicle}
            setVehicle={setSelectedVehicle}
          />
        </div>
        <MapChart area={selectedArea} vehicle={selectedVehicle} />
        <Legend />
        <Footer />
      </main>
    </div>
  );
}

export default App;
