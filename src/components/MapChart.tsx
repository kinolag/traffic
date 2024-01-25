import * as d3 from "d3";
import { useState, useEffect, useCallback } from "react";
import Loader from "./Loader";
import Slider from "./Slider";
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
  type AvailableYear,
  YEARS,
  TOPO_MAP_DATA,
  TRAFFIC_DATA,
} from "../assets/data/typesAndConstants";

type MapChartProps = {
  area: AvailableArea;
  year?: AvailableYear;
  w?: number;
  h?: number;
};

export default function MapChart({
  area,
  year = YEARS[YEARS.length - 1],
  w = 650,
  h = 650,
}: MapChartProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<d3.DSVRowArray<string>>();
  const [geoMapData, setGeoMapData] = useState<
    | FeatureCollection<Geometry, GeoJsonProperties>
    | Feature<Geometry, GeoJsonProperties>
    | undefined
  >();

  const [selectedYear, setSelectedYear] = useState<AvailableYear>(year);
  const [selectedNode, setSelectedNode] =
    useState<d3.DSVRowString<string> | null>(null);

  const AdditionalInfo = () => {
    return selectedNode ? (
      <text className="txt-13" fill="teal" x={30} y={40}>
        <tspan>Traffic Point ID: {selectedNode.Count_point_id}</tspan>
        <tspan x={30} dy="1.5em">
          Latitude: {(+selectedNode.Latitude).toFixed(2)}, Longitude:{" "}
          {(+selectedNode.Longitude).toFixed(2)}
        </tspan>
        <tspan x={30} dy="1.5em">
          Direction of travel: {selectedNode.direction_of_travel}
        </tspan>
        <tspan x={30} dy="1.5em" fill="darkslateblue">
          All motor vehicles: {selectedNode.All_motor_vehicles}
        </tspan>
        <tspan x={30} dy="1.5em" fill="darkslateblue">
          Two wheeled motor vehicles: {selectedNode.Two_wheeled_motor_vehicles}
        </tspan>
        <tspan x={30} dy="1.5em" fill="darkslateblue">
          Pedal cycles: {selectedNode.Pedal_cycles}
        </tspan>
      </text>
    ) : (
      <text className="txt-14" fill="teal" x={30} y={40}>
        Mouse over a point for details
      </text>
    );
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      /* d3.csv uses d3.fetch which returns a promise */
      const trafficData: d3.DSVRowArray<string> | undefined = await d3.csv(
        TRAFFIC_DATA[area].trafficDataFile
      );

      let topoData: Topology | undefined;
      let geoData:
        | FeatureCollection<Geometry, GeoJsonProperties>
        | Feature<Geometry, GeoJsonProperties>
        | undefined;

      if (TOPO_MAP_DATA[area].mapDataFileType === "geoJson") {
        geoData = await d3.json(TOPO_MAP_DATA[area].mapDataFile);
      } else {
        topoData = await d3.json(TOPO_MAP_DATA[area].mapDataFile);
        if (!!topoData) {
          geoData = topojson.feature(
            topoData,
            topoData.objects[TOPO_MAP_DATA[area].objectName]
          );
        }
      }

      Promise.all([trafficData, geoData]).then((values) => {
        setData(values[0]);
        setGeoMapData(values[1]);
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [area]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const projection: d3.GeoProjection = d3
    .geoMercator()
    .center(TOPO_MAP_DATA[area].center)
    .translate([w / 2, h / 2])
    .scale(TOPO_MAP_DATA[area].scale);

  // any added here as cannot fix d3/ts error
  const geoGenerator: any = d3.geoPath().projection(projection);

  const generatedPath: string = geoGenerator(geoMapData);

  const dataByYear = data?.filter((d) => d.Year === selectedYear);

  /* scale data coordinates to projection */
  const projectedCoordinates = dataByYear?.map((d) =>
    projection([+d.Longitude, +d.Latitude])
  );

  /* check for possible undefined */
  const extent = d3.extent(data ?? [], (d) => +d.All_motor_vehicles);

  /* process colors, use d3.interpolateRdYlBu() or other method */
  const scaleValueToColor = (amount: number): string => {
    const scaled = d3.scaleLinear(
      extent.map((v) => (v ? +v : 0)),
      [1, 0] // get blue for lowest, red for highest
    );
    return d3.interpolateSpectral(scaled(amount));
  };

  const scaleToRadius = (amount: number): number => {
    const scaled = d3.scaleLinear(
      extent.map((v) => (v ? +v : 0)),
      [2, 14] // may vary: [0, 1] [1, 14] [2, 16]
    );
    return scaled(amount);
  };

  function selectPoint(d: d3.DSVRowString<string>): void {
    setSelectedNode(d);
  }

  function deselectPoint(): void {
    setSelectedNode(null);
  }

  return (
    <div>
      {loading && <Loader specifier={` for ${TOPO_MAP_DATA[area].label}`} />}
      {!loading && geoMapData && data && (
        <>
          <p className="txt-c pad-5 radius-8 bg-fc0 is-dsg">{`Displaying ${dataByYear?.length} traffic points in ${TOPO_MAP_DATA[area].label}`}</p>
          {/* for Selector positioning */}
          <div className="relative">
            <svg
              className="radius-8"
              style={{ border: "1px solid #ccc", width: w, height: h }}
              viewBox={`0 0 ${w} ${h}`}
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
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
                        r={scaleToRadius(+data[i].All_motor_vehicles)}
                        style={{
                          fill: scaleValueToColor(+data[i].All_motor_vehicles),
                          opacity: 0.85,
                        }}
                        /* for devices with a mouse */
                        onMouseOver={() => {
                          if (dataByYear) {
                            selectPoint(dataByYear[i]);
                          }
                        }}
                        onMouseOut={() => {
                          deselectPoint();
                        }}
                        /* for touch screen devices */
                        onPointerDown={() => {
                          if (dataByYear) {
                            selectPoint(dataByYear[i]);
                          }
                        }}
                        onPointerUp={() => {
                          deselectPoint();
                        }}
                      />
                    )
                )}
                <AdditionalInfo />
                <text className="absolute txt-14" fill="teal" x={295} y={40}>
                  Year {selectedYear}
                </text>
              </g>
            </svg>
            <div className="absolute" style={{ top: 32, right: 50 }}>
              <Slider
                background="#eee"
                colour="teal"
                value={+selectedYear}
                min={+YEARS[0]}
                max={+YEARS[YEARS.length - 1]}
                width={220}
                height={6}
                setYear={setSelectedYear}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
