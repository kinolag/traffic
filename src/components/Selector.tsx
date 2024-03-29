import {
  type AvailableArea,
  type AvailableVehicle,
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
  setVehicle?: React.Dispatch<AvailableVehicle>;
  setYear?: React.Dispatch<AvailableYear>;
};

export default function Selector({
  className,
  style,
  labelText,
  options,
  value,
  setArea,
  setVehicle,
  setYear,
}: SelectorProps) {
  const trimLabel = (str: string) =>
    str.length > 19 ? str.slice(0, 19) + "." : str;
  return (
    <div className={`row-col ${className}`} style={style}>
      <label htmlFor="options" className="pad-5 txt-14 is-teal">
        {labelText}
      </label>
      <select
        className="mar-3 pad-3 is-slategrey radius-4"
        name="options"
        id="options"
        value={value}
        onChange={({ target: { value } }) => {
          if (setArea) setArea(value as AvailableArea);
          if (setVehicle) setVehicle(value as AvailableVehicle);
          if (setYear) setYear(value as AvailableYear);
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {trimLabel(o.label)}
          </option>
        ))}
      </select>
    </div>
  );
}
