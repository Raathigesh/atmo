import * as React from "react";
import { Segment, Label, Image, Header } from "semantic-ui-react";
import styled from "styled-components";

interface ISectionHeadingProp {
  title: string;
  children: any;
}

const Section = ({ title, children }: ISectionHeadingProp) => {
  const Container = styled.div`
    margin-top: 15px;
    margin-bottom: 20px;
  `;

  const RedLabel = styled(Label)`
    background-color: #8D99AE !important;
    color: white !important;
  `;

  return (
    <div>
      {/*<RedLabel as="a" ribbon>
        {title}
      </RedLabel>*/}
      <Header size="tiny" color="grey">
        {title}
      </Header>
      <Container>
        {children}
      </Container>
    </div>
  );
};

export default Section;
