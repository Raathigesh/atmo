import * as React from "react";
import styled from "styled-components";

const Menu = () => {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
  `;
  return (
    <Container>
      <a className="pt-button pt-icon-trash pt-minimal" role="button" />
      <a className="pt-button pt-icon-move pt-minimal" role="button" />
    </Container>
  );
};

export default Menu;
