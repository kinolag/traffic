import * as d3 from "d3";
import { useState } from "react";
import Legend from "./Legend";
import {
  type AvailableArea,
  type AvailableVehicle,
  VEHICLES,
  TOPO_MAP_DATA,
} from "../assets/data/typesAndConstants";
import { type GeoJsonMapData } from "./DataWrapper";

type MapChartProps = {
  w?: number;
  h?: number;
  geoMapData: GeoJsonMapData;
  dataByYear: d3.DSVRowString<string>[];
  selectedArea: AvailableArea;
  selectedVehicle: AvailableVehicle;
};

export default function MapChart({
  w = 600,
  h = 600,
  geoMapData,
  dataByYear,
  selectedArea,
  selectedVehicle,
}: MapChartProps) {
  const [selectedNode, setSelectedNode] =
    useState<d3.DSVRowString<string> | null>(null);

  const selectedNodeLabel = VEHICLES.find(
    (v) => v.value === selectedVehicle
  )?.label;

  const projection: d3.GeoProjection = d3
    .geoMercator()
    .center(TOPO_MAP_DATA[selectedArea].center)
    .translate([w / 2, h / 2])
    .scale(TOPO_MAP_DATA[selectedArea].scale);

  // any added here as cannot fix d3/ts error
  const geoGenerator: any = d3.geoPath().projection(projection);

  const generatedPath: string = geoGenerator(geoMapData);

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
      <g>
        <circle
          cx={36 - scaleToRadius(+selectedNode[selectedVehicle], [2, 16])}
          cy={44}
          r={scaleToRadius(+selectedNode[selectedVehicle], [2, 16])}
          style={{
            fill: scaleValueToColor(+selectedNode[selectedVehicle]),
            fillOpacity: 1,
            stroke: "#bbb",
            strokeWidth: ".5px",
          }}
        />
        <text className="txt-overlay" fill="teal" x={40} y={40}>
          <tspan>Traffic Point ID: {selectedNode.Count_point_id}</tspan>
          <tspan x={40} dy="1.5em">
            Latitude: {(+selectedNode.Latitude).toFixed(2)}, Longitude:{" "}
            {(+selectedNode.Longitude).toFixed(2)}
          </tspan>
          <tspan x={40} dy="1.5em">
            Road name: {selectedNode.Road_name}
          </tspan>
          <tspan x={40} dy="1.5em">
            Direction of travel: {selectedNode.direction_of_travel}
          </tspan>
          <tspan x={40} dy="1.5em">
            {selectedNodeLabel}:{" "}
            <tspan fontWeight="bold">{selectedNode[selectedVehicle]}</tspan>
          </tspan>
        </text>
      </g>
    ) : (
      <text className="txt-overlay" fill="teal" x={30} y={40}>
        Mouse over a map point for details
      </text>
    );
  };

  return (
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
                  r={scaleToRadius(+dataByYear[i][selectedVehicle], [2, 16])}
                  style={{
                    fill: scaleValueToColor(+dataByYear[i][selectedVehicle]),
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
                      {selectedNode.direction_of_travel} | {selectedNodeLabel}:{" "}
                      {selectedNode[selectedVehicle]}
                    </title>
                  )}
                </circle>
              )
          )}
          <InfoOverlay />
        </g>
      </svg>
      <Legend chartType="Map" />
    </div>
  );
}
