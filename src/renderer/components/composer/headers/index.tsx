import * as React from "react";
import {
  Button,
  Checkbox,
  Icon,
  Table,
  Input,
  Header
} from "semantic-ui-react";
import styled from "styled-components";
import Section from "../section";

const HeaderRow = () => {
  const SlimInput = styled(Input)`
      height: 23px;
  `;

  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox slider />
      </Table.Cell>
      <Table.Cell>
        <SlimInput />
      </Table.Cell>
      <Table.Cell>
        <SlimInput />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Icon link name="close" />
      </Table.Cell>
    </Table.Row>
  );
};

const Headers = () => {
  return (
    <Table compact celled definition>
      <Table.Body>
        <HeaderRow />
        <HeaderRow />
        <HeaderRow />
        <HeaderRow />
      </Table.Body>
    </Table>
  );
};

export default Headers;
