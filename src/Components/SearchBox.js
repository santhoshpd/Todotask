import React from "react";

export default ({ onChange }) => (
  <div className="search-box">
    <input type="text" placeholder="Search.." name="search" onChange={(e) => onChange(e)}/>
  </div>
);
