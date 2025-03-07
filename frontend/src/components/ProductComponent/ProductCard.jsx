import React from "react";
import {
  Box,
  Typography,
  Button,
  Card as MuiCard,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductCard = ({ product, onEdit, onDelete, onPlaceOrder, isEditable, isStore }) => {
  // Default image placeholder if product image is not available
  const defaultImage = "https://via.placeholder.com/300x200/333333/FF8C00?text=Product+Image";
  
  // Gradient style for titles
  const gradientStyle = {
    backgroundImage: "linear-gradient(45deg, #CC5500, #FFA333)",
    backgroundClip: "text",
    textFillColor: "transparent",
    color: "transparent",
    fontWeight: "bold",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    MozBackgroundClip: "text",
    MozTextFillColor: "transparent",
  };

  return (
    <MuiCard 
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#2A2A2A",
        borderRadius: "10px",
        overflow: "hidden",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 20px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl || defaultImage}
        alt={product.name}
        sx={{
          objectFit: "cover",
          borderBottom: "2px solid #FF8C00",
        }}
      />
      
      <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 } }}>
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{ 
            ...gradientStyle,
            mb: 1,
            fontSize: { xs: "1rem", sm: "1.25rem" },
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="#CCCCCC"
          sx={{
            mb: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            fontSize: { xs: "0.8rem", sm: "0.875rem" },
            minHeight: { xs: "3.6em", sm: "4.2em" },
          }}
        >
          {product.description}
        </Typography>
        
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Chip 
            label={`${product.quantity || 0} in stock`}
            size="small"
            sx={{ 
              backgroundColor: "#3D3D3D", 
              color: "#DDDDDD",
              fontSize: { xs: "0.7rem", sm: "0.75rem" },
            }}
          />
          <Typography 
            variant="h6" 
            component="span"
            sx={{ 
              color: "#FF8C00", 
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            ${product.price?.toFixed(2) || "0.00"}
          </Typography>
        </Box>
      </CardContent>
      
      <CardActions sx={{ p: { xs: 1, sm: 1.5 }, justifyContent: "space-between" }}>
        {isEditable && (
          <>
            <Button 
              size="small" 
              onClick={() => onEdit(product)}
              startIcon={<EditIcon />}
              sx={{ 
                color: "#FF8C00",
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                "&:hover": { backgroundColor: "rgba(255, 140, 0, 0.1)" },
              }}
            >
              Edit
            </Button>
            <Button 
              size="small" 
              onClick={() => onDelete(product)}
              startIcon={<DeleteIcon />}
              sx={{ 
                color: "#FF5555",
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                "&:hover": { backgroundColor: "rgba(255, 85, 85, 0.1)" },
              }}
            >
              Delete
            </Button>
          </>
        )}
        
        {isStore && (
          <Button 
            size="small" 
            fullWidth
            variant="contained"
            onClick={() => onPlaceOrder(product)}
            startIcon={<ShoppingCartIcon />}
            sx={{ 
              backgroundColor: "#FF8C00",
              "&:hover": { backgroundColor: "#CC5500" },
              fontSize: { xs: "0.7rem", sm: "0.8rem" },
            }}
          >
            Place Order
          </Button>
        )}
      </CardActions>
    </MuiCard>
  );
};

export default ProductCard;