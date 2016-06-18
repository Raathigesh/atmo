import React, {Component} from 'react';

class Generator extends Component {
  constructor() {
    super();
    this.state = {
      textValue: ''
    };
  }

  componentDidMount = () => {
    $(this.refs.generateProject).dropdown();
  }

  onGeneratorEnter = (e) => {
    if (e.key === 'Enter') {
      this.props.installGenerator(this.state.textValue);
    }
  }

  textChange = () => {
    this.setState({
      textValue: this.refs.genaratorName.value
    })
  }

  render() {
    let items = (
      <div className="item">
        It's empty in here
      </div>
    );

    items = this.props.generators.map((generator) => {
      return (
        <div className="item" onClick={() => { this.props.onGenerate(generator) } }>
          <div className="ui red empty circular label"></div>
          {generator}
        </div>
      );
    });

    return (
      <div ref="generateProject" className="ui left pointing dropdown icon button inverted blue exportProjectButton">
        <i className="military icon"></i> Generate Project
        <div className="menu">
          <div className="ui left search icon input">
            <i className="download icon"></i>
            <input ref="genaratorName" placeholder="Hit enter to install" onKeyUp={this.onGeneratorEnter} value={this.state.textValue} onChange={this.textChange}/>
          </div>
          <div className="header">
            <i className="tags icon"></i>
            Available generators
          </div>
          {items}
        </div>
      </div>
    );
  }
}

Generator.defaultProps = {
  generators: []
}

export default Generator;