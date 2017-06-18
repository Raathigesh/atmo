import * as React from "react";

const Select = ({ css }: { css?: any }) => {
  return (
    <div className="pt-select pt-inline" {...css}>
      <select>
        <option selected>GET</option>
        <option value="1">GET</option>
        <option value="2">POST</option>
        <option value="3">PUT</option>
        <option value="4">OPTIONS</option>
      </select>
    </div>
  );
};

export default Select;
