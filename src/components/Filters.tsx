import { Dispatch } from "react";
import Selector from "./Selector";
import Slider from "./Slider";
import {
  type AvailableArea,
  type AvailableVehicle,
  type AvailableYear,
  AREAS,
  VEHICLES,
  YEARS,
} from "../assets/data/typesAndConstants";

export const FiltersRow = ({
  selectedArea,
  setSelectedArea,
  selectedVehicle,
  setSelectedVehicle,
}: {
  selectedArea: AvailableArea;
  setSelectedArea: Dispatch<AvailableArea>;
  selectedVehicle: AvailableVehicle;
  setSelectedVehicle: Dispatch<AvailableVehicle>;
}) => (
  <div className="w100pc spacedRow" style={{ marginTop: "12px" }}>
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
);

export const YearSlider = ({
  selectedYear,
  setSelectedYear,
}: {
  selectedYear: AvailableYear;
  setSelectedYear: Dispatch<AvailableYear>;
}) => {
  return (
    <div
      className="w100pc spacedRow"
      style={{
        justifyContent: "center",
        marginBottom: "10px",
      }}
    >
      <div className="txt-14 is-teal" style={{ paddingRight: "10px" }}>
        Select Year
      </div>
      <Slider
        id="year-slider"
        background="#eee"
        colour="teal"
        value={+selectedYear}
        min={+YEARS[0]}
        max={+YEARS[YEARS.length - 1]}
        height={6}
        setYear={setSelectedYear}
      />
      <div className="txt-14 is-teal" style={{ paddingLeft: "15px" }}>
        {selectedYear}
      </div>
    </div>
  );
};
