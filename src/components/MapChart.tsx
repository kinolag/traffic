import * as d3 from "d3";
import { useState, useEffect, useCallback, Dispatch } from "react";
import Loader from "./Loader";
import { FiltersRow, YearSlider } from "./Filters";
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

type MapChartProps = {
  w?: number;
  h?: number;
  setError: Dispatch<string>;
};

type GeoJsonMapData =
  | FeatureCollection<Geometry, GeoJsonProperties>
  | Feature<Geometry, GeoJsonProperties>
  | undefined;

export default function MapChart({
  w = 650,
  h = 650,
  setError,
}: MapChartProps) {
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
  const [selectedNode, setSelectedNode] =
    useState<d3.DSVRowString<string> | null>(null);

  const selectedNodeLabel = VEHICLES.find(
    (v) => v.value === selectedVehicle
  )?.label;

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

  const projection: d3.GeoProjection = d3
    .geoMercator()
    .center(TOPO_MAP_DATA[selectedArea].center)
    .translate([w / 2, h / 2])
    .scale(TOPO_MAP_DATA[selectedArea].scale);

  // any added here as cannot fix d3/ts error
  const geoGenerator: any = d3.geoPath().projection(projection);

  const generatedPath: string = geoGenerator(geoMapData);

  const dataByYear = data
    ?.filter((d) => d.Year === selectedYear)
    /* sort by descending value/size to reduce occlusion */
    .sort((a, b) => +b[selectedVehicle] - +a[selectedVehicle]);

  /* scale data coordinates to projection */
  const projectedCoordinates = dataByYear?.map((d) =>
    projection([+d.Longitude, +d.Latitude])
  );

  /* check for possible undefined */
  const extent = d3.extent(dataByYear ?? [], (d) => +d[selectedVehicle]);

  /* scale to color, use d3.interpolateRdYlBu() or interpolateSpectral() */
  const scaleValueToColor = (amount: number): string => {
    const scaled = d3.scaleLinear(
      extent.map((v) => (v ? +v : 0)),
      [1, 0] // get blue for lowest, red for highest
    );
    return d3.interpolateRdYlBu(scaled(amount));
  };

  const scaleToRadius = (amount: number, range: [number, number]): number => {
    const scaled = d3.scaleLinear(
      extent.map((v) => (v ? v : 0)),
      range // may vary e.g. [0, 1] [2, 14] [2, 16]
    );
    return scaled(amount);
  };

  function selectPoint(d: d3.DSVRowString<string>): void {
    setSelectedNode(d);
  }

  function deselectPoint(): void {
    setSelectedNode(null);
  }

  const InfoOverlay = () => {
    return selectedNode ? (
      <text className="txt-overlay" fill="teal" x={30} y={40}>
        <tspan>Traffic Point ID: {selectedNode.Count_point_id}</tspan>
        <tspan x={30} dy="1.5em">
          Latitude: {(+selectedNode.Latitude).toFixed(2)}, Longitude:{" "}
          {(+selectedNode.Longitude).toFixed(2)}
        </tspan>
        <tspan x={30} dy="1.5em">
          Road name: {selectedNode.Road_name}
        </tspan>
        <tspan x={30} dy="1.5em">
          Direction of travel: {selectedNode.direction_of_travel}
        </tspan>
        <tspan
          x={30}
          dy="1.5em"
          fill={scaleValueToColor(+selectedNode[selectedVehicle])}
          fontWeight="bold"
        >
          {selectedNodeLabel}: {selectedNode[selectedVehicle]}
        </tspan>
      </text>
    ) : (
      <text className="txt-overlay" fill="teal" x={30} y={40}>
        Mouse over a map point for details
      </text>
    );
  };

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
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              className="border-c radius-8"
              style={{ width: "100%" }}
              viewBox={`0 0 ${w} ${h}`}
            >
              <g>
                {generatedPath && (
                  <path
                    style={{ opacity: 0.3 }}
                    d={generatedPath}
                    fill="#ccc"
                    stroke="black"
                    strokeWidth={1}
                  />
                )}
                {projectedCoordinates?.map(
                  (coord, i) =>
                    !!coord && (
                      <circle
                        key={i}
                        cx={coord[0]}
                        cy={coord[1]}
                        r={scaleToRadius(
                          +dataByYear[i][selectedVehicle],
                          [2, 16]
                        )}
                        style={{
                          fill: scaleValueToColor(
                            +dataByYear[i][selectedVehicle]
                          ),
                          fillOpacity: 0.85,
                          stroke: "#bbb",
                          strokeWidth: ".5px",
                        }}
                        /* for devices with a mouse */
                        onMouseOver={() => {
                          selectPoint(dataByYear[i]);
                        }}
                        onMouseOut={() => {
                          deselectPoint();
                        }}
                        /* for touch screen devices */
                        onPointerDown={() => {
                          selectPoint(dataByYear[i]);
                        }}
                        onPointerUp={() => {
                          deselectPoint();
                        }}
                      >
                        {selectedNode && (
                          <title>
                            Point ID: {selectedNode.Count_point_id} | Direction:{" "}
                            {selectedNode.direction_of_travel} |{" "}
                            {selectedNodeLabel}: {selectedNode[selectedVehicle]}
                          </title>
                        )}
                      </circle>
                    )
                )}
                <InfoOverlay />
              </g>
            </svg>
          </div>
        </>
      )}
    </div>
  );
}
