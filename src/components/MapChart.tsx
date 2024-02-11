import * as d3 from "d3";
import { useState, useEffect, useRef } from "react";
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
  const mapWrapper: React.MutableRefObject<SVGGElement | null> = useRef(null);

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
        {/* rect as a background */}
        <rect
          x={0}
          y={0}
          width={w / 2.4}
          height={w / 4.8}
          fill="white"
          stroke="#ccc"
          strokeWidth={0.5}
          opacity={0.9}
        />
        <circle
          cx={36 - scaleToRadius(+selectedNode[selectedVehicle], [2, 16])}
          cy={39}
          r={scaleToRadius(+selectedNode[selectedVehicle], [2, 16])}
          style={{
            fill: scaleValueToColor(+selectedNode[selectedVehicle]),
            fillOpacity: 0.85,
            stroke: "#bbb",
            strokeWidth: ".5px",
          }}
        />
        <text className="txt-overlay" fill="teal" x={40} y={35}>
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
      <text className="txt-overlay" fill="teal" x={40} y={35}>
        <tspan>Zoom and pan on the map</tspan>
        <tspan x={40} dy="1.5em">
          or mouse over a map point for details
        </tspan>
      </text>
    );
  };

  const handleZoom = (e: d3.D3ZoomEvent<SVGElement, unknown>) => {
    d3.select(mapWrapper.current as SVGGElement).attr(
      "transform",
      e.transform as any
    );
  };

  const zoomBehavior: d3.ZoomBehavior<Element, unknown> = d3
    .zoom()
    /* limit extent of scale and pan */
    .scaleExtent([1, 2.5])
    .translateExtent([
      [0, 0],
      [w, h],
    ])
    .on("zoom", handleZoom);

  useEffect(() => {
    const zoomInit = () => {
      if (mapWrapper.current)
        d3.select<Element, unknown>(mapWrapper.current).call(zoomBehavior);
    };
    zoomInit();
  }, [w, h, zoomBehavior]);

  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="border-c radius-8"
        style={{ width: "100%" }}
        viewBox={`0 0 ${w} ${h}`}
      >
        <g ref={mapWrapper}>
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
        </g>
        <InfoOverlay />
      </svg>
      <Legend chartType="Map" />
    </div>
  );
}
