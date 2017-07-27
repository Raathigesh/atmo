import * as React from "react";
import {
  Modal,
  Header,
  Button,
  Grid,
  List,
  Divider,
  Input,
  Icon
} from "semantic-ui-react";
import styled from "styled-components";

interface IIntroDialog {
  open: boolean;
  openProject: () => void;
}

const Logo = styled.img`
  height: 40px !important;
  margin-left: 128px !important;
  width: 183px !important;
  margin-bottom: 9px;
`;

export default function IntroDialog({ open, openProject }: IIntroDialog) {
  return (
    <Modal dimmer="blurring" open={open}>
      <Modal.Content image>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <div>
                <Header as="h2" icon>
                  <Logo
                    className="ui mini right spaced image"
                    src={require("../assets/darkLogo.png")}
                  />
                </Header>
                <Input
                  placeholder="Give the project a name"
                  fluid
                  action={{
                    color: "orange",
                    labelPosition: "right",
                    icon: "arrow right",
                    content: "Create"
                  }}
                  defaultValue=""
                />
                <Divider horizontal>Or</Divider>
                <Button basic color="orange" onClick={openProject} fluid>
                  Open a saved project
                </Button>
              </div>
            </Grid.Column>

            <Grid.Column width={8}>
              <Header as="h5" dividing>
                Recent projects
              </Header>
              <List>
                <List.Item>
                  <List.Content floated="right">
                    <Icon link name="close" />
                  </List.Content>
                  <List.Icon name="cube" />
                  <List.Content>
                    <List.Header as="a">Krowlewskie Jadlo</List.Header>
                    <List.Description>
                      An excellent polish restaurant, quick delivery and hearty,
                      filling meals.
                    </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content floated="right">
                    <Icon link name="close" />
                  </List.Content>
                  <List.Icon name="cube" />
                  <List.Content>
                    <List.Header as="a">Xian Famous Foods</List.Header>
                    <List.Description>
                      A taste of Shaanxi's delicious culinary traditions, with
                      delights like spicy cold noodles and lamb burgers.
                    </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content floated="right">
                    <Icon link name="close" />
                  </List.Content>
                  <List.Icon name="cube" />
                  <List.Content>
                    <List.Header as="a">Sapporo Haru</List.Header>
                    <List.Description>
                      Greenpoint's best choice for quick and delicious sushi.
                    </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content floated="right">
                    <Icon link name="close" />
                  </List.Content>
                  <List.Icon name="cube" />
                  <List.Content>
                    <List.Header as="a">Enid's</List.Header>
                    <List.Description>
                      At night a bar, during the day a delicious brunch spot.
                    </List.Description>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  );
}
