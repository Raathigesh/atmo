import React, { Component, PropTypes } from 'react';
import AddEndpoint from './AddEndpoint';
import Generator from './Generator';

class Header extends Component {
  onDownload = () => {
    this.refs.export.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.props.state.getPayload()));
  }

  componentDidMount() {
    this.refs.importInput.addEventListener('change', (event) => {
      var input = event.target;

      var reader = new FileReader();
      reader.onload = () => {
        var dataString = reader.result;
        var spec = JSON.parse(dataString);
        this.props.state.loadSpec(spec);
        this.refs.importInput.value = null;
      };
      reader.readAsText(input.files[0]);
    }, false);
  }

  openAtmoUrl = () => {
    window.open('https://github.com/Raathigesh/Atmo', '_blank');
  }

  render() {
    return (
      <div className="ui fluid small menu hermesHeader">
        <div className="ui container"  style={{ width: '90% !important' }}>
          {<div className="item">
            <img src={require("../asset/Logo.png") } style={{ width: '135px', height: '45px' }}/>
          </div>}
          <div className="item">
            <AddEndpoint
              onClick={this.props.createEndPoint}
              onCreateSocketEndpoint={this.props.createSocketEndpoint}
              createGraphqlEndpoint={this.props.createGraphqlEndpoint}
              createJsonServerEndpoint={this.props.createJsonServerEndpoint}
              createProxyEndpoint={this.props.createProxyEndpoint}
              />
          </div>
          <div className="item">
            <div className="ui small icon" >
              <a className="ui upload blue inverted icon button" onClick={this.props.save}>
                <i className="icon save"></i> Save
              </a>
            </div>
            <div className="ui small icon" >
              <a className="ui upload blue inverted icon button" onClick={this.props.initialize}>
                <i className="icon erase"></i> Reset
              </a>
            </div>
          </div>
          <div className="item">
            <div>
              <label htmlFor="file" className="ui icon blue inverted button"  >
                <i className="file icon"></i> Import
              </label>
              <input ref="importInput" id="file" type='file' accept='json/*' style={{ display: 'none' }}/>
            </div>
            <div className="ui small icon" >
              <a className="ui upload blue inverted icon button" ref="export" href="" onClick={this.onDownload} download="spec.json">
                <i className="icon upload"></i> Export
              </a>
            </div>
            <Generator generators={this.props.generators} onGenerate={this.props.generateProject} installGenerator={this.props.installGenerator}/>
          </div>
          <div className="item">
          <div className="ui small icon" >
            <a className="ui icon blue inverted button" onClick={this.openAtmoUrl}>
              <i className="github icon"></i> Github
            </a>
          </div>  
          </div>
          <a href="#" className="right item deployButton" onClick={this.props.onDeploy} >
            <i className="icon send outline"></i>
            Deploy
          </a>
          <div className="item">
          </div>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  spec: PropTypes.obj,
  generators: PropTypes.obj,
  generateProject: PropTypes.func
}

export default Header;
