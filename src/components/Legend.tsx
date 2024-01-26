type LegendProps = {
  chartType?: string;
};

export default function Legend({ chartType }: LegendProps) {
  return (
    <div className="is-slategrey mar-10" style={{ marginTop: "0px" }}>
      <div className="txt-c txt-14">
        <h3 className="is-dsg">Chart Legend:</h3>
        <p>
          • Elements represent the{" "}
          <strong className="is-dsb">number of vehicles (of selected type)</strong>{" "}
          recorded at a traffic point.
        </p>
        <p>
          • <strong className="is-dsb">Color scale</strong>: (Lowest value) blue
          - green - yellow - orange - red (Highest value).
        </p>
        <p>
          • <strong className="is-dsb">Dimensions</strong>: a larger size
          represents a higher value (linear scale).
        </p>
      </div>
    </div>
  );
}
