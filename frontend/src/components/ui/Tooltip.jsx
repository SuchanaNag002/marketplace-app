import React from "react";
import { Tooltip } from "@mui/material";

const TooltipComponent = ({ title, children, ...props }) => {
  return (
    <Tooltip title={title} {...props}>
      <span>{children}</span>
    </Tooltip>
  );
};

export default TooltipComponent;
