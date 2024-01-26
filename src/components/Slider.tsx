import { useState, Dispatch, PointerEvent } from "react";
import { AvailableYear } from "../assets/data/typesAndConstants";

/* element UI */
const DEFAULT_COLOUR = "rgba(255,0,0,1)";
const DEFAULT_BG = "rgba(255,0,0,0.33)";
const DEFAULT_WIDTH = 180;
const MIN_HEIGHT = 6;
/* range */
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
/* value */
const DEFAULT_VALUE = 0;

type SliderProps = {
  id?: string;
  background?: string;
  colour?: string;
  value?: number;
  min?: number;
  max?: number;
  width?: number;
  height?: number;
  setYear?: Dispatch<AvailableYear>;
};

export default function Slider({
  id,
  background = DEFAULT_BG,
  colour = DEFAULT_COLOUR,
  value = DEFAULT_VALUE,
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
  width = DEFAULT_WIDTH,
  height = MIN_HEIGHT,
  setYear,
}: SliderProps) {
  const range = max - min;

  /* handle out of range values */
  const initialValue = value > max ? max : value < min ? min : value;

  const valueToPercent = (value: number) => ((value - min) / range) * 100;
  const percentToValue = (percent: number) => (percent * range) / 100 + min;

  const [inputting, setInputting] = useState(false);
  const [sliderValue, setSliderValue] = useState(valueToPercent(initialValue));

  const onInput = (e: PointerEvent<HTMLElement>): void => {
    /** horizontal coordinate within the application's viewport */
    const xCoord = e.clientX;

    const elementRectangle = e.currentTarget.getBoundingClientRect();
    const { left, width } = elementRectangle;

    const fractionOfWidth = (xCoord - left) / width;
    const newValue = Math.round(min + fractionOfWidth * range);

    /* fix "too fast movement" issue */
    if (fractionOfWidth > 1.0) {
      setSliderValue(100);
    }
    if (fractionOfWidth < 0.0) {
      setSliderValue(0);
    }
    /* update state conditionally */
    if (fractionOfWidth >= 0.0 && fractionOfWidth <= 1.0) {
      const newPercent = valueToPercent(newValue);
      setSliderValue(newPercent);
      if (setYear)
        setYear(percentToValue(sliderValue).toString() as AvailableYear);
    }
  };
  const startInput = (e: PointerEvent<HTMLElement>): void => {
    const target = e.target as Element;
    target.setPointerCapture(e.pointerId);
    setInputting(true);
    /* update sliderValue on first touch */
    onInput(e);
  };
  const stopInput = (e: PointerEvent<HTMLDivElement>): void => {
    const target = e.target as Element;
    target.releasePointerCapture(e.pointerId);
    setInputting(false);
  };

  return (
    <>
      <div
      id={id}
        className="sliderWrapper relative"
        style={{
          background,
          height,
          width,
          minHeight: `${MIN_HEIGHT}px`,
          borderRadius: `${height * 0.5}px`,
          /* fix pointerMove issue on touch screen devices */
          touchAction: "none",
        }}
        onPointerDown={(e) => startInput(e)}
        onPointerUp={(e) => stopInput(e)}
        onPointerMove={(e) => {
          if (inputting) onInput(e);
        }}
      >
        <div
          className="sliderTrack"
          style={{
            width: `${sliderValue}%`,
            background: colour,
            borderRadius: `${height * 0.5}px`,
          }}
        />
        <div
          className="sliderDot absolute"
          style={{
            background: colour,
            width: height * 2,
            height: height * 2,
            top: -`${height * 0.5}`,
            left: `calc(${sliderValue}% - ${height * 0.5}px)`,
          }}
        />
      </div>
    </>
  );
}
