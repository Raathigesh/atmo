import * as React from "react";
import { Header } from "semantic-ui-react";
const { default: ReactSimpleRange } = require("react-simple-range");
import Section from "../section";
const Delay = () => {
  return (
    <ReactSimpleRange
      label
      min={0}
      max={60}
      sliderColor="#EF233C"
      thumbColor="#2B2D42"
      trackColor="#D90429"
      thumbSize={20}
      sliderSize={7}
    />
  );
};

export default Delay;
