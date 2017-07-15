import * as React from "react";
import styled from "styled-components";

interface IHeader {
  className?: string;
}

const Header = ({ className }: IHeader) => {
  return (
    <nav className={`pt-navbar ${className}`}>
      <div className="pt-navbar-group pt-align-left">
        <div className="pt-navbar-heading">Atmo</div>
      </div>
      <div className="pt-navbar-group pt-align-right">
        <button className="pt-button pt-minimal pt-icon-cog" />
      </div>
    </nav>
  );
};

export default styled(Header)`
  margin-bottom: 10px;
`;
