import React, { useState } from "react";
import { IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TooltipComponent from "./Tooltip";

const Counter = ({ initial = 0, min = 0, max, onChange, disabled = false }) => {
  const [value, setValue] = useState(initial);

  const handleIncrease = () => {
    if (value < max) {
      const newValue = value + 1;
      setValue(newValue);
      if (onChange) onChange(newValue);
    }
  };

  const handleDecrease = () => {
    if (value > min) {
      const newValue = value - 1;
      setValue(newValue);
      if (onChange) onChange(newValue);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <TooltipComponent title={value === min ? "Cannot decrease further" : ""}>
        <span>
          <IconButton
            onClick={handleDecrease}
            disabled={value === min || disabled}
            size="small"
            sx={{ color: "#FF8C00" }}
          >
            <RemoveIcon />
          </IconButton>
        </span>
      </TooltipComponent>
      <Box
        sx={{
          mx: 1,
          fontSize: { xs: "1rem", sm: "1.2rem" },
          color: "#FF8C00",
        }}
      >
        {value}
      </Box>
      <TooltipComponent title={value === max ? "Maximum reached" : ""}>
        <span>
          <IconButton
            onClick={handleIncrease}
            disabled={value === max || disabled}
            size="small"
            sx={{ color: "#FF8C00" }}
          >
            <AddIcon />
          </IconButton>
        </span>
      </TooltipComponent>
    </Box>
  );
};

export default Counter;
