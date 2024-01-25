import * as d3 from "d3";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import {
  Feature,
  // Point,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
} from "geojson";
import * as topojson from "topojson-client";
import { Topology } from "topojson-specification";
// import types available from "topojson" types;

export type AvailableArea =
  | "gb"
  | "greenwich"
  | "lewisham"
  | "southwark"
  | "towerHamlets";

type MapDataFileType = "geoJson" | "topoJson";

type MapData = {
  [k in AvailableArea]: {
    label: string;
    mapDataFile: string;
    mapDataFileType: MapDataFileType;
    objectName: string;
    center: [number, number];
    scale: number;
  };
};

type TrafficData = {
  [k in AvailableArea]: {
    trafficDataFile: string;
  };
};

const TOPO_MAP_DATA: MapData = {
  gb: {
    label: "GB",
    mapDataFile: "./data/geoJson/gb/lad.json",
    mapDataFileType: "geoJson",
    objectName: "", // only for topoJson
    center: [-2.244644, 55.7], // Manchester longitude
    scale: 1700,
  },
  greenwich: {
    label: "Greenwich",
    mapDataFile: "./data/topoJson/london/greenwich/topo_E09000011.json",
    mapDataFileType: "topoJson",
    objectName: "E09000011",
    center: [0.08, 51.478],
    scale: 170000,
  },
  lewisham: {
    label: "Lewisham",
    mapDataFile: "./data/topoJson/london/lewisham/topo_E09000023.json",
    mapDataFileType: "topoJson",
    objectName: "E09000023",
    center: [-0.021, 51.445],
    scale: 170000,
  },
  southwark: {
    label: "Southwark",
    mapDataFile: "./data/topoJson/london/southwark/topo_E09000028.json",
    mapDataFileType: "topoJson",
    objectName: "E09000028",
    center: [-0.08, 51.465],
    scale: 170000,
  },
  towerHamlets: {
    label: "Tower Hamlets",
    mapDataFile: "./data/topoJson/london/tower_hamlets/topo_E09000030.json",
    mapDataFileType: "topoJson",
    objectName: "E09000030",
    center: [-0.03, 51.515],
    scale: 170000,
  },
};

const TRAFFIC_DATA: TrafficData = {
  gb: {
    trafficDataFile: "./data/csv/dft_traffic_counts_aadf_by_direction.csv",
  },
  greenwich: {
    trafficDataFile: "./data/csv/greenwich.csv",
  },
  lewisham: {
    trafficDataFile: "./data/csv/lewisham.csv",
  },
  southwark: {
    trafficDataFile: "./data/csv/southwark.csv",
  },
  towerHamlets: {
    trafficDataFile: "./data/csv/tower_hamlets.csv",
  },
};

type MapChartProps = {
  area: AvailableArea;
  w?: number;
  h?: number;
};

export default function MapChart({ area, w = 650, h = 650 }: MapChartProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<d3.DSVRowArray<string>>();
  // Feature<Point, GeoJsonProperties> | undefined
  const [geoMapData, setGeoMapData] = useState<
    | FeatureCollection<Geometry, GeoJsonProperties>
    | Feature<Geometry, GeoJsonProperties>
    | undefined
  >();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        /* d3.csv uses d3.fetch which returns a promise */
        const trafficData: d3.DSVRowArray<string> | undefined = await d3.csv(
          TRAFFIC_DATA[area].trafficDataFile
        );
        // setData(trafficData);

        // Topology<Objects<GeoJsonProperties>>
        let topoData: Topology | undefined;
        let geoData:
          | FeatureCollection<Geometry, GeoJsonProperties>
          | Feature<Geometry, GeoJsonProperties>
          | undefined;

        if (TOPO_MAP_DATA[area].mapDataFileType === "geoJson") {
          // console.log("GEO case");
          geoData = await d3.json(TOPO_MAP_DATA[area].mapDataFile);
        } else {
          topoData = await d3.json(TOPO_MAP_DATA[area].mapDataFile);
          // console.log(topoData);
          if (!!topoData) {
            // console.log("TOPO case");
            geoData = topojson.feature(
              topoData,
              topoData.objects[TOPO_MAP_DATA[area].objectName]
            );
          }
        }

        // setGeoMapData(geoData);
        // console.log(geoData);

        Promise.all([trafficData, geoData]).then((values) => {
          setData(values[0]);
          setGeoMapData(values[1]);
        });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [area]);

  const projection: d3.GeoProjection = d3
    .geoMercator()
    // .geoEquirectangular()
    .center(TOPO_MAP_DATA[area].center)
    .translate([w / 2, h / 2])
    .scale(TOPO_MAP_DATA[area].scale);

  // any added here as cannot fix d3/ts error
  const geoGenerator: any = d3.geoPath().projection(projection);

  // fit path to SVG size
  //   const identity = d3.geoIdentity();
  //   const path = d3.geoPath(identity);
  //   identity.fitSize([w, h], geoMapData).reflectY(true);

  const generatedPath: string = geoGenerator(geoMapData);
  // console.log(generatedPath);

  /* scale data coordinates to projection */
  const projectedCoordinates = data?.map((d) =>
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
    // return d3.interpolateRdYlBu(scaled(amount));
    return d3.interpolateSpectral(scaled(amount));
  };

  const scaleToRadius = (amount: number): number => {
    const scaled = d3.scaleLinear(
      extent.map((v) => (v ? +v : 0)),
      [1, 14] // may vary: [0, 1] [1, 14]
    );
    return scaled(amount);
  };

  return (
    <div>
      {loading && <Loader specifier={` for ${TOPO_MAP_DATA[area].label}`} />}
      {!loading && geoMapData && data && (
        <>
          <p className="txt-c pad-5 radius-8 bg-fc0 is-dsb">{`Displaying ${data.length} traffic points in ${TOPO_MAP_DATA[area].label}`}</p>
          <svg
            className="radius-8"
            style={{ border: "1px solid #ccc", width: w, height: h }}
            /* removing width and height from here, moving to style */
            viewBox={`0 0 ${w} ${h}`}
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <g>
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
                        // stroke: "black",
                        opacity: 0.8,
                      }}
                    />
                  )
              )}
              {generatedPath && (
                <path
                  style={{ opacity: 0.3 }}
                  d={generatedPath}
                  fill="#ccc"
                  stroke="black"
                  strokeWidth={1}
                />
              )}
            </g>
          </svg>
        </>
      )}
    </div>
  );
}
