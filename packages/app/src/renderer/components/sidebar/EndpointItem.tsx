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

interface IUrl {
  id: string;
  label: string;
  link?: string;
  method: string;
  active: boolean;
  isEnabled: boolean;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
}

const MethodLabel = styled(Label)`
  background-color: #ff6a4d !important;
  font-size: 10px !important;
`;

const EndpointDragHandle = styled(Icon)`
    cursor: grabbing;
`;

const Url = ({
  id,
  label,
  link,
  method,
  active,
  isEnabled,
  onClick,
  onDelete
}: IUrl) => {
  let Reorder = SortableHandle(EndpointDragHandle);
  return (
    <Menu.Item
      key={id}
      as="a"
      name="search"
      onClick={() => {
        onClick(id);
      }}
      active={active}
    >
      <Reorder name="resize vertical" />
      {label}
      <Icon
        name="trash outline"
        disabled={!isEnabled}
        onClick={event => {
          event.stopPropagation();
          if (isEnabled) {
            onDelete(id);
          }
        }}
      />
      <MethodLabel>
        {method.toUpperCase()}
      </MethodLabel>
    </Menu.Item>
  );
};

export default Url;
