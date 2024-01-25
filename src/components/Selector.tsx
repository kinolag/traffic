import {
  type SelectorOptionValue,
} from "../assets/data/typesAndConstants";

type SelectorOptions = Array<{ value: SelectorOptionValue; label: string }>;

type SelectorProps = {
  className?: string;
  style?: React.CSSProperties;
  optionName: string;
  options: SelectorOptions;
  value: SelectorOptionValue;
  setValue: (arg0: SelectorOptionValue) => void;
};

export default function Selector({
  className,
  style,
  optionName,
  options,
  value,
  setValue,
}: SelectorProps) {
  return (
    <div className={className} style={style}>
      <label htmlFor="options" className="pad-5 txt-14 is-teal ">
        {optionName}
      </label>
      <select
        className="mar-5 is-slategrey radius-4 space-04 shadow-ccc"
        name="options"
        id="options"
        onChange={(e) => setValue(e.target.value as SelectorOptionValue)}
        /* link value to state */
        value={value}
      >
        {options &&
          options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
      </select>
    </div>
  );
}