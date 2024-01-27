type LegendProps = {
  chartType?: string;
};

export default function Legend({ chartType }: LegendProps) {
  return (
    <div className="w90pc is-slategrey mar-10" style={{ marginTop: "0px" }}>
      <div className="txt-c txt-14">
        <h3 className="is-dsg">Chart Legend</h3>
        <p>
          • Elements represent the{" "}
          <strong className="is-dsb">
            number of vehicles (per selected type)
          </strong>{" "}
          recorded at a traffic point{" "}
          <strong className="is-dsb">in the selected year</strong>.
        </p>
        <p>
          • <strong className="is-dsb">Dimensions</strong>: a larger size
          represents a higher value (linear scale).
        </p>
        <p>
          • <strong className="is-dsb">Color scale</strong>: (lowest value) blue
          - yellow - red (highest value).
        </p>
      </div>
    </div>
  );
}
