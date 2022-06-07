
import React from 'react';
const StatItem = (props) => {
  return (
    <div style={{ backgroundColor: "#fff", borderLeft: "solid 6px " + props.primaryBg, float: "left", width: "100%", minWidth: "300px" }}>
      <div style={{ backgroundColor: "#FAFAFA", padding: "10px", marginRight: "20px" }}>
        <h4 style={{ textAlign: "left", fontSize: "14px", color: "#616161" }}>{props.label}</h4>
        <h1 style={{ marginTop: "20px", color: props.primaryBg }}>{props.mainData}</h1>
      </div>
    </div>
  )
};

export default StatItem;