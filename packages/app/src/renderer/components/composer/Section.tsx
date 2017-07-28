import * as React from "react";
import { Segment, Label, Image, Header } from "semantic-ui-react";
import styled from "styled-components";
import { observer } from "mobx-react";

interface ISectionHeadingProp {
  title: string;
  headerComponents?: any;
  children: any;
}

const Container = styled.div`
  margin-top: 15px;
  margin-bottom: 20px;
`;

const RedLabel = styled(Label)`
    background-color: #8D99AE !important;
    color: white !important;
`;

const Section = ({
  title,
  children,
  headerComponents
}: ISectionHeadingProp) => {
  return (
    <div>
      <Header size="tiny" color="grey">
        {title}
        {"  "}
        {headerComponents}
      </Header>
      <Container>
        {children}
      </Container>
    </div>
  );
};

export default observer(Section);
