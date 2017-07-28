import * as React from "react";
import styled from "styled-components";
import { Header, Label, Icon } from "semantic-ui-react";
const { default: ReactSimpleRange } = require("react-simple-range");
import { observer } from "mobx-react";
import Section from "./Section";

interface IDelay {
  value: number;
  onChange: (value: number) => void;
}

const AddHeader = styled.a`
  font-size: 12px;
  cursor: pointer;
  color: grey;
`;

const Delay = ({ value, onChange }: IDelay) => {
  const headerComponents = (
    <Header as="h5" floated="right">
      <Icon.Group>
        <Icon name="hourglass end" color="grey" />
      </Icon.Group>
      <AddHeader>{`${value} sec`}</AddHeader>
    </Header>
  );

  return (
    <Section title="Simulate Delay" headerComponents={headerComponents}>
      <ReactSimpleRange
        value={value}
        onChange={data => onChange(data.value)}
        label
        min={0}
        max={60}
        sliderColor="#2d2d2d"
        thumbColor="#ff6a4d"
        trackColor="#ff6a4d"
        thumbSize={15}
        sliderSize={1}
      />
    </Section>
  );
};

export default observer(Delay);
