type LegendProps = {
  chartType?: string;
};

export default function Legend({ chartType }: LegendProps) {
  return (
    <div className="is-slategrey mar-10" style={{ marginTop: "0px" }}>
      <div className="txt-c txt-14">
        <h3>Chart Legend:</h3>
        <p>
          • Elements represent the{" "}
          <strong className="is-dsb">number of total motor vehicles</strong>{" "}
          recorded at a traffic point.
        </p>
        <p>
          • Color scale: (Lowest value) blue - green - yellow - orange - red
          (Highest value).
        </p>
        <p>
          • Dimensions: a larger size represents a higher value (linear scale).
        </p>
      </div>
    </div>
  );
}
