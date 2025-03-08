import React, { useState } from "react";
import {
  Box,
  Typography,
  Card as MuiCard,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteOrder } from "../../api/OrdersApi";
import { updateProduct } from "../../api/ProductsApi";

const OrderCard = ({ order, onDeleteOrder, setAlert }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_DOMAIN;
  const [isDeleting, setIsDeleting] = useState(false);
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

  const product = order.product || {};
  const imageSrc = product.imageUrl?.startsWith("/assets")
    ? `${backendUrl}${product.imageUrl}`
    : "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3";

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteOrder(order.id);
      if (product.id) {
        const updatedQuantity = (product.quantity || 0) + order.quantity;
        await updateProduct(product.id, { quantity: updatedQuantity });
      }
      onDeleteOrder(order.id);
      setAlert({ severity: "success", message: "Order deleted successfully" });
    } catch (error) {
      setAlert({ severity: "error", message: "Failed to delete order" });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <MuiCard
      sx={{
        maxHeight: "28rem",
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
        [":-webkit-box"]:{
          width: "100%"
        }
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={imageSrc}
        alt={product.name || "Product"}
        sx={{
          objectFit: "cover",
          borderBottom: "2px solid #FF8C00",
          m: 1,
          borderRadius: "8px",
          width: "calc(100% - 16px)",
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: { xs: 1, sm: 2 }, pb: 0 }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            ...gradientStyle,
            mb: 0.5,
            fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.25rem" },
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            pl: 0.5,
          }}
        >
          {product.name || "Unknown Product"}
        </Typography>
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
            fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.9rem" },
            minHeight: { xs: "2.4em", sm: "2.6em", md: "2.8em" },
            pl: 0.5,
          }}
        >
          {product.description || "No description available"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            pl: 0.5,
            pr: 0.5,
          }}
        >
          <Chip
            label={`Quantity Ordered: ${order.quantity}`}
            size="small"
            sx={{
              backgroundColor: "#3D3D3D",
              color: "#DDDDDD",
              fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
              height: { xs: "20px", sm: "22px", md: "24px" },
            }}
          />
          <Typography
            variant="body2"
            color="#FF8C00"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.9rem" } }}
          >
            Order Date: {new Date(order.orderDate).toLocaleDateString()}
          </Typography>
          <Typography
            variant="body2"
            color="#FF8C00"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.9rem" } }}
          >
            Delivery Date:{" "}
            {order.arrivalDate
              ? new Date(order.arrivalDate).toLocaleDateString()
              : "Pending"}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ p: { xs: 1, sm: 1.5, md: 2 }, justifyContent: "center" }}>
        <Button
          size="small"
          onClick={handleDelete}
          disabled={isDeleting}
          startIcon={<DeleteIcon />}
          sx={{
            color: "#FF5555",
            "&:hover": { backgroundColor: "rgba(255, 85, 85, 0.1)" },
            fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.9rem" },
          }}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </CardActions>
    </MuiCard>
  );
};

export default OrderCard;