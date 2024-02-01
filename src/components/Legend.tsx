import interpolateRdYlBu from "../assets/images/interpolateRdYlBu.png";

type LegendProps = {
  chartType?: string;
};

export default function Legend({ chartType }: LegendProps) {
  return (
    <div className="pad-5 txt-c txt-14 is-slategrey">
      <h3 className="is-dsg">Chart Legend</h3>
      <p className="line-plus">
        • <strong className="is-dsg">Parameters</strong>: circles represent the{" "}
        <strong>number of vehicles</strong> recorded at a traffic point{" "}
        <strong> in the selected year, per vehicle type</strong>.
      </p>
      <p className="line-plus">
        • <strong className="is-dsg">Dimensions</strong>: a larger size
        represents a higher value (linear scale).
      </p>
      <div
        className="w100pc spacedRow txt-13"
        style={{
          justifyContent: "center",
          marginBottom: "5px",
        }}
      >
        <span style={{ paddingRight: "10px" }}>Lowest</span>
        <span
          style={{
            borderRadius: "50%",
            background: "#252c8d",
            width: "4px",
            height: "4px",
            marginRight: "7px",
          }}
        />
        <span
          style={{
            borderRadius: "50%",
            background: "#950015",
            width: "32px",
            height: "32px",
            marginLeft: "7px"
          }}
        />
        <span style={{ paddingLeft: "10px" }}>Highest</span>
      </div>
      <p>
        • <strong className="is-dsg">Color scale</strong>: Blue - Yellow - Red
      </p>
      <div
        className="w100pc spacedRow txt-13"
        style={{
          justifyContent: "center",
          marginBottom: "5px",
        }}
      >
        <span style={{ paddingRight: "10px" }}>Lowest</span>
        <img
          className="flip-horizontal"
          src={interpolateRdYlBu}
          width="50%"
          height="5px"
          alt="RYB color scale"
        />
        <span style={{ paddingLeft: "10px" }}>Highest</span>
      </div>
    </div>
  );
}
