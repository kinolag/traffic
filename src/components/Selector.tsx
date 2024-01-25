import {
  type AvailableArea,
  type AvailableYear,
  type SelectorOptionValue,
} from "../assets/data/typesAndConstants";

type SelectorOptions = Array<{ value: SelectorOptionValue; label: string }>;

type SelectorProps = {
  className?: string;
  style?: React.CSSProperties;
  labelText: string;
  options: SelectorOptions;
  value: SelectorOptionValue;
  setArea?: React.Dispatch<AvailableArea>;
  setYear?: React.Dispatch<AvailableYear>;
};

export default function Selector({
  className,
  style,
  labelText,
  options,
  value,
  setArea,
  setYear,
}: SelectorProps) {
  return (
    <div className={className} style={style}>
      <label htmlFor="options" className="pad-5 txt-14 is-teal">
        {labelText}
      </label>
      <select
        className="mar-3 pad-3 is-slategrey radius-4"
        name="options"
        id="options"
        value={value}
        onChange={(e) => {
          if (setArea) setArea(e.target.value as AvailableArea);
          if (setYear) setYear(e.target.value as AvailableYear);
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
