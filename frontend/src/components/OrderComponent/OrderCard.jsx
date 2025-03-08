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

const OrderCard = ({ order, products }) => {
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
  const imageSrc = order.imageUrl?.startsWith("/assets")
    ? `${backendUrl}${order.imageUrl}`
    : "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3";
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteOrder(order.id);
      const product = products.find((p) => p.id === order.productId);
      if (product) {
        const updatedQuantity = (product.quantity || 0) + order.quantity;
        await updateProduct(order.productId, { quantity: updatedQuantity });
      }
    } catch (error) {
      console.error("Error deleting order:", error);
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
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={imageSrc}
        alt="Product"
        sx={{
          objectFit: "cover",
          borderBottom: "2px solid #FF8C00",
          m: 1,
          borderRadius: "8px",
          width: "calc(100% - 16px)",
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 }, pb: 0 }}>
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
          {order.productName || "Unknown Product"}
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
            fontSize: { xs: "0.75rem", sm: "0.8rem" },
            minHeight: { xs: "2.4em", sm: "2.6em" },
            pl: 0.5,
          }}
        >
          {order.productDescription || "No description available"}
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
              fontSize: { xs: "0.65rem", sm: "0.7rem" },
              height: "22px",
            }}
          />
          <Typography
            variant="body2"
            color="#FF8C00"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem" } }}
          >
            Order Date: {new Date(order.orderDate).toLocaleDateString()}
          </Typography>
          <Typography
            variant="body2"
            color="#FF8C00"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem" } }}
          >
            Delivery Date:{" "}
            {order.arrivalDate
              ? new Date(order.arrivalDate).toLocaleDateString()
              : "Pending"}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ p: { xs: 1, sm: 1.5 }, justifyContent: "center" }}>
        <Button
          size="small"
          onClick={handleDelete}
          disabled={isDeleting}
          startIcon={<DeleteIcon />}
          sx={{
            color: "#FF5555",
            "&:hover": { backgroundColor: "rgba(255, 85, 85, 0.1)" },
          }}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </CardActions>
    </MuiCard>
  );
};

export default OrderCard;
