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
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
}

const Url = ({ id, label, link, method, active, onClick, onDelete }: IUrl) => {
  let Reorder = SortableHandle(styled(Icon)`
    cursor: grabbing;
  `);

  return (
    <Menu.Item
      as="a"
      name="search"
      onClick={() => {
        onClick(id);
      }}
      active={active}
    >
      <Label color="teal">
        {method.toUpperCase()}
      </Label>
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
