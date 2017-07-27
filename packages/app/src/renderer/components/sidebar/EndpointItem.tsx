import * as React from "react";
import { observer } from "mobx-react";
import { Menu, MenuItem, Sidebar, Icon, Label } from "semantic-ui-react";
import styled from "styled-components";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from "react-sortable-hoc";
(window as any).Perf = require("react-addons-perf");

interface IUrl {
  id: string;
  label: string;
  link?: string;
  method: string;
  active: boolean;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
}

const MethodLabel = styled(Label)`
  background-color: #ff6a4d !important;
`;

const EndpointDragHandle = styled(Icon)`
    cursor: grabbing;
`;

const Url = ({ id, label, link, method, active, onClick, onDelete }: IUrl) => {
  let Reorder = SortableHandle(EndpointDragHandle);

  return (
    <Menu.Item
      as="a"
      name="search"
      onClick={() => {
        (window as any).Perf.start();
        onClick(id);
      }}
      active={active}
    >
      <MethodLabel>
        {method.toUpperCase()}
      </MethodLabel>
      <Icon name="circle thin" />
      <Reorder
        name="resize vertical"
        onClick={() => {
          onDelete(id);
        }}
      />
      {label}
    </Menu.Item>
  );
};

export default Url;
