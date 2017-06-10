const schema = 
`type SpaceShip {
  name: String
  class: String
}

type RootQuery {
  ship(name: String): SpaceShip
}

schema {
  query: RootQuery
}
`;

export default schema;