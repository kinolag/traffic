type LegendProps = {
  chartType?: string;
};

export default function Legend({ chartType }: LegendProps) {
  return (
    <div className="pad-5 txt-c txt-14 is-slategrey">
        <h3 className="is-dsg">Chart Legend</h3>
        <p>
          • <strong className="is-dsg">Parameters</strong>: Elements represent
          the <strong>number of vehicles</strong> recorded at
          a traffic point{" "}
          <strong>
            {" "}
            in the selected year and vehicle type
          </strong>
          .
        </p>
        <p>
          • <strong className="is-dsg">Dimensions</strong>: a larger size
          represents a higher value (linear scale).
        </p>
        <p>
          • <strong className="is-dsg">Color scale</strong>: Blue
          - Yellow - Red (lowest to highest value).
        </p>
    </div>
  );
}
