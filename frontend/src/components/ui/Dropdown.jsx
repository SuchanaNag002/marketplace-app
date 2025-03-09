import { FormControl, MenuItem, Select } from "@mui/material";

const Dropdown = ({ label, name, value, onChange, options }) => {
  const gradientStyle = {
    backgroundImage: "linear-gradient(45deg, #CC5500, #FFA333)",
    backgroundClip: "text",
    textFillColor: "transparent",
    color: "transparent",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    MozBackgroundClip: "text",
    MozTextFillColor: "transparent",
  };

  return (
    <div>
      <label
        style={{
          fontSize: "0.9rem",
          color: "white",
          display: "block",
          marginBottom: "0.3rem",
          fontWeight: 500,
        }}
      >
        {label}
      </label>
      <FormControl fullWidth variant="outlined">
        <Select
          name={name}
          value={value}
          onChange={onChange}
          sx={{
            height: "2.7rem",
            borderRadius: "8px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ccc",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#888",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
              boxShadow: "0 0 0 2px #6b7280",
            },
            "&.Mui-focused": {
              outline: "none",
            },
            "& .MuiSelect-select": {
              ...gradientStyle,
            },
          }}
        >
          {options.map((option) => (
            <MenuItem 
              key={option.value} 
              value={option.value}
              sx={{
                ...gradientStyle,
                '&.Mui-selected': {
                  ...gradientStyle,
                  backgroundColor: 'rgba(255, 140, 0, 0.1)',
                },
                '&:hover': {
                  ...gradientStyle,
                  backgroundColor: 'rgba(255, 140, 0, 0.1)',
                },
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;