import * as d3 from "d3";
import { useState, useEffect, useCallback, Dispatch } from "react";
import Loader from "./Loader";
import { FiltersRow, YearSlider } from "./Filters";
import MapChart from "./MapChart";
import {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
} from "geojson";
import * as topojson from "topojson-client";
import { Topology } from "topojson-specification";
import {
  type AvailableArea,
  type AvailableVehicle,
  type AvailableYear,
  VEHICLES,
  YEARS,
  TOPO_MAP_DATA,
  TRAFFIC_DATA,
} from "../assets/data/typesAndConstants";

const WIDTH = 650;

type DataWrapperProps = {
  setError: Dispatch<string>;
};

export type GeoJsonMapData =
  | FeatureCollection<Geometry, GeoJsonProperties>
  | Feature<Geometry, GeoJsonProperties>
  | undefined;

export default function DataWrapper({ setError }: DataWrapperProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<d3.DSVRowArray<string>>();
  const [geoMapData, setGeoMapData] = useState<GeoJsonMapData>();

  const [selectedArea, setSelectedArea] = useState<AvailableArea>("camden");
  const [selectedVehicle, setSelectedVehicle] = useState<AvailableVehicle>(
    VEHICLES[0].value
  );
  const [selectedYear, setSelectedYear] = useState<AvailableYear>(
    YEARS[YEARS.length - 1]
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      /* d3.csv uses d3.fetch which returns a promise */
      const trafficData: d3.DSVRowArray<string> | undefined = await d3.csv(
        TRAFFIC_DATA[selectedArea].trafficDataFile
      );

      let topoData: Topology | undefined;
      let geoData: GeoJsonMapData;

      if (TOPO_MAP_DATA[selectedArea].mapDataFileType === "geoJson") {
        geoData = await d3.json(TOPO_MAP_DATA[selectedArea].mapDataFile);
      } else {
        topoData = await d3.json(TOPO_MAP_DATA[selectedArea].mapDataFile);
        if (!!topoData) {
          geoData = topojson.feature(
            topoData,
            topoData.objects[TOPO_MAP_DATA[selectedArea].objectName]
          );
        }
      }

      Promise.all([trafficData, geoData]).then((values) => {
        setData(values[0]);
        setGeoMapData(values[1]);
      });
    } catch (e) {
      console.log(e);
      setError("An error occurred while loading data.");
    } finally {
      setLoading(false);
    }
  }, [selectedArea, setError]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const dataByYear = data
    ?.filter((d) => d.Year === selectedYear)
    /* sort by descending value/size to reduce occlusion */
    .sort((a, b) => +b[selectedVehicle] - +a[selectedVehicle]);

  return (
    <div className="w100pc">
      {loading && (
        <Loader specifier={` for ${TOPO_MAP_DATA[selectedArea].label}`} />
      )}
      {!loading && geoMapData && dataByYear && (
        <>
          <FiltersRow
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
            selectedVehicle={selectedVehicle}
            setSelectedVehicle={setSelectedVehicle}
          />
          <p className="txt-c pad-5 radius-8 bg-fc0 is-dsg border-1">{`Displaying ${dataByYear.length} traffic points in ${TOPO_MAP_DATA[selectedArea].label}`}</p>
          <YearSlider
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
          <MapChart
            w={WIDTH}
            h={WIDTH}
            geoMapData={geoMapData}
            dataByYear={dataByYear}
            selectedArea={selectedArea}
            selectedVehicle={selectedVehicle}
          />
        </>
      )}
    </div>
  );
}
