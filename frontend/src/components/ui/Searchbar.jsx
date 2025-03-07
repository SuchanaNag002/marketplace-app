import React from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ value, onChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: { xs: "100%", sm: "auto" },
        maxWidth: { xs: "100%", sm: "300px" },
      }}
    >
      <TextField
        value={value}
        onChange={onChange}
        placeholder="Search products..."
        variant="outlined"
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
            backgroundColor: "#fff",
            boxShadow: "0 0 10px rgba(255, 140, 0, 0.3)", // Orange blurred shadow
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "#FF8C00",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FF8C00",
            },
          },
          "& .MuiInputBase-input": {
            padding: "8px 14px",
            fontSize: { xs: "14px", sm: "16px" },
          },
          width: "100%",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#FF8C00" }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;