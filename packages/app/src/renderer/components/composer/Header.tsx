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
import Section from "./Section";
import Stores from "../../store";
import { observer } from "mobx-react";

interface IHeaderRow {
  header: Stores.Header;
  onKeyChange: (value: string) => void;
  onValueChange: (value: string) => void;
  onRemove: (id: string) => void;
}

const SlimInput = styled(Input)`
    height: 23px;
    width: 100%;
`;

const HeaderRow = observer(
  ({ header, onRemove, onKeyChange, onValueChange }: IHeaderRow) => {
    return (
      <Table.Row>
        {/* <Table.Cell collapsing>
          <Checkbox
            slider
            checked={header.active}
            onChange={() => {
              header.toggleActive();
            }}
          />
        </Table.Cell> */}
        <Table.Cell>
          <SlimInput
            value={header.key}
            onChange={(event, data) => onKeyChange(data.value)}
          />
        </Table.Cell>
        <Table.Cell>
          <SlimInput
            value={header.value}
            onChange={(event, data) => onValueChange(data.value)}
          />
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Icon link name="close" onClick={() => onRemove(header.id)} />
        </Table.Cell>
      </Table.Row>
    );
  }
);

interface IHeader {
  headers: Stores.Header[];
  currentEndpoint: Stores.Endpoint;
}

const AddHeader = styled.a`
  font-size: 12px;
  cursor: pointer;
  color: grey;
`;

const Headers = ({ headers, currentEndpoint }: IHeader) => {
  const headerItems = headers.map((header, index) =>
    <HeaderRow
      key={index}
      header={header}
      onRemove={currentEndpoint.headers.removeHeader}
      onKeyChange={header.setKey}
      onValueChange={header.setValue}
    />
  );

  const headerComponents = (
    <Header
      as="h5"
      floated="right"
      onClick={() => currentEndpoint.headers.addHeader()}
    >
      <Icon.Group>
        <Icon name="add circle" color="grey" />
      </Icon.Group>
      <AddHeader>Add new header</AddHeader>
    </Header>
  );

  return (
    <Section title="Headers" headerComponents={headerComponents}>
      <Table compact celled definition>
        <Table.Body>
          {headerItems}
        </Table.Body>
      </Table>
    </Section>
  );
};

export default observer(Headers);
