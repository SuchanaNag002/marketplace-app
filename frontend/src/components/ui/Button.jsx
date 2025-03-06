import { Button as MuiButton } from "@mui/material";

const Button = ({ children, onClick, variant = "contained", color = "primary" }) => {
  return (
    <MuiButton variant={variant} color={color} onClick={onClick} className="px-4 py-2">
      {children}
    </MuiButton>
  );
};

export default Button;