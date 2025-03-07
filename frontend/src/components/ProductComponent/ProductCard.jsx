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

const ProductCard = ({
  product,
  onEdit,
  onDelete,
  onPlaceOrder,
  isEditable,
  isStore,
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_DOMAIN;

  const imageSrc = product.imageUrl?.startsWith("/assets")
    ? `${backendUrl}${product.imageUrl}`
    : "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  // Gradient style for the product name
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
        maxHeight: "360px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#2A2A2A",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: "0 0 15px rgba(255, 140, 0, 0.3)",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 0 25px rgba(255, 140, 0, 0.6)",
        },
      }}
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        height="160"
        image={imageSrc}
        alt={product.name}
        sx={{
          objectFit: "cover",
          borderBottom: "2px solid #FF8C00",
          m: 1,
          borderRadius: "8px",
          width: "calc(100% - 16px)",
        }}
      />

      <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 }, pb: 0 }}>
        {/* Product Name */}
        <Typography
          variant="h6"
          component="h2"
          sx={{
            ...gradientStyle,
            mb: 0.5,
            fontSize: { xs: "0.9rem", sm: "1.1rem" },
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            pl: 0.5,
          }}
        >
          {product.name}
        </Typography>

        {/* Product Description */}
        <Typography
          variant="body2"
          color="#CCCCCC"
          sx={{
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            fontSize: { xs: "0.75rem", sm: "0.8rem" },
            minHeight: { xs: "2.4em", sm: "2.6em" },
            pl: 0.5,
          }}
        >
          {product.description}
        </Typography>

        {/* Stock & Price */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pl: 0.5,
            pr: 0.5,
          }}
        >
          <Chip
            label={`${product.quantity || 0} in stock`}
            size="small"
            sx={{
              backgroundColor: "#3D3D3D",
              color: "#DDDDDD",
              fontSize: { xs: "0.65rem", sm: "0.7rem" },
              height: "22px",
            }}
          />
          <Typography
            variant="h6"
            component="span"
            sx={{
              color: "#FF8C00",
              fontWeight: "bold",
              fontSize: { xs: "0.9rem", sm: "1.1rem" },
            }}
          >
            ${product.price?.toFixed(2) || "0.00"}
          </Typography>
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions
        sx={{
          p: { xs: 1, sm: 1.5 },
          justifyContent: "space-between",
        }}
      >
        {isEditable && (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Button
              size="small"
              onClick={() => onEdit(product)}
              startIcon={<EditIcon />}
              sx={{
                color: "#FF8C00",
                fontSize: { xs: "0.65rem", sm: "0.7rem" },
                "&:hover": { backgroundColor: "rgba(255, 140, 0, 0.1)" },
                py: 0.5,
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
                fontSize: { xs: "0.65rem", sm: "0.7rem" },
                "&:hover": { backgroundColor: "rgba(255, 85, 85, 0.1)" },
                py: 0.5,
              }}
            >
              Delete
            </Button>
          </Box>
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
              fontSize: { xs: "0.65rem", sm: "0.75rem" },
              py: 0.5,
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
