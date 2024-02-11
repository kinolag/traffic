import * as d3 from "d3";
import { Dispatch } from "react";
import {
  type AvailableVehicle,
  VEHICLES,
  GREENS,
} from "../assets/data/typesAndConstants";
import { view } from "../utils/utils";

const Y_MARGIN = 10;

const BAR_HEIGHT = view.sm ? 36 : 26;
const X_OFFSET = 4;
const Y_OFFSET = view.sm ? 46 : 34;

type StackedBarChartProps = {
  w?: number;
  h?: number;
  xMargin?: number;
  dataByYear: d3.DSVRowString<string>[];
  selectedVehicle: AvailableVehicle;
  setSelectedVehicle: Dispatch<AvailableVehicle>;
  expandBar: boolean;
  setExpandBar: Dispatch<boolean>;
};

export default function StackedBarChart({
  w = 600,
  h = 150,
  xMargin = 0,
  dataByYear, // could pass totals array in as data prop instead
  selectedVehicle,
  setSelectedVehicle,
  expandBar,
  setExpandBar,
}: StackedBarChartProps) {
  type Totals = Array<{
    label: string;
    value: AvailableVehicle;
    total: number;
    color: string;
  }>;
  /* remove AllMotorVehicles via slice */
  const totalsByVehicle: Totals = VEHICLES.slice(0, VEHICLES.length - 1)
    .map((v, i) => {
      return {
        label: v.label,
        value: v.value,
        total: d3.sum(dataByYear ?? [], (d) => +d[v.value]),
        color: GREENS[i], // color will stay after sorting
      };
    })
    /* ascending sort helps with info display under the bar */
    .sort((a, b) => a.total - b.total);

  const totalSum = d3.sum(totalsByVehicle, (d) => d.total);

  const availableWidth = w - xMargin * 2;

  const barWidths: number[] =
    /* find fraction */
    /* fraction : width = total : totalSum */
    totalsByVehicle
      .map((t) => t.total)
      .map((t) => (availableWidth * t) / totalSum);

  /* find percent */
  /* value : width = pc : 100 */
  const percent = (value: number) =>
    ((value * 100) / availableWidth).toFixed(2);

  const widthOfPreceding = (i: number): number => d3.sum(barWidths.slice(0, i));

  return (
    <div
      className="w100pc relative centeredColumn border-c radius-8"
      style={{ marginTop: Y_MARGIN, marginBottom: Y_MARGIN }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="radius-4"
        style={{ width: `calc(100% - ${xMargin * 2}px)` }}
        viewBox={`0 0 ${availableWidth} ${expandBar ? h : BAR_HEIGHT}`}
      >
        <g>
          {barWidths?.map((v, i) => (
            <g key={i}>
              <rect
                className="point"
                onClick={() => setExpandBar(!expandBar)}
                width={Math.ceil(v)}
                height={BAR_HEIGHT}
                /* sum of all previous */
                x={widthOfPreceding(i)}
                fill={totalsByVehicle[i].color}
              >
                <title>
                  {totalsByVehicle[i].label} ({totalsByVehicle[i].total} |{" "}
                  {percent(v)}%)
                </title>
              </rect>
              {expandBar && (
                <g>
                  <text
                    style={{
                      fontWeight:
                        totalsByVehicle[i].value === selectedVehicle
                          ? "bold"
                          : "normal",
                    }}
                    className="point txt-overlay"
                    x={0}
                    y={0}
                    transform={`translate(${
                      widthOfPreceding(i) + barWidths[i] / 2 - X_OFFSET
                    }, ${Y_OFFSET}) rotate(36)`}
                    fill={totalsByVehicle[i].color}
                    onClick={() => setSelectedVehicle(totalsByVehicle[i].value)}
                  >
                    {totalsByVehicle[i].label}: {percent(v)}%
                  </text>
                </g>
              )}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
