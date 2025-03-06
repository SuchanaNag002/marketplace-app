import { TextField } from "@mui/material";

const Input = ({ label, type = "text", value, onChange }) => {
  return (
    <TextField label={label} type={type} value={value} onChange={onChange} fullWidth className="mb-4" />
  );
};

export default Input;