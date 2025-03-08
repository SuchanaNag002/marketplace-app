import React, { useState } from "react";
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
import Counter from "../ui/Counter";
import TooltipComponent from "../ui/Tooltip";
import { createOrder } from "../../api/OrdersApi"; 
import { updateProduct } from "../../api/ProductsApi";

const ProductCard = ({
  product,
  onEdit,
  onDelete,
  onPlaceOrder,
  isEditable,
  isStore,
  user,
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_DOMAIN;

  const imageSrc = product.imageUrl?.startsWith("/assets")
    ? `${backendUrl}${product.imageUrl}`
    : "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const [quantityToOrder, setQuantityToOrder] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);

  const handleQuantityChange = (quantity) => {
    setQuantityToOrder(quantity);
  };

  const handlePlaceOrder = async () => {
    if (quantityToOrder > 0 && user) {
      setIsOrdering(true);
      const orderDate = new Date();
      const arrivalDate = new Date(orderDate);
      arrivalDate.setDate(orderDate.getDate() + 3);

      const orderData = {
        userId: user.id,
        productId: product.id,
        quantity: quantityToOrder,
        orderDate: orderDate.toISOString().split("T")[0],
        arrivalDate: arrivalDate.toISOString().split("T")[0],
      };

      try {
        await createOrder(orderData);
        const updatedQuantity = product.quantity - quantityToOrder;
        const updatedProduct = { ...product, quantity: updatedQuantity };
        await updateProduct(product.id, { quantity: updatedQuantity });
        onPlaceOrder(updatedProduct);
        setQuantityToOrder(1);
      } catch (error) {
        console.error("Failed to place order or update product:", error);
      } finally {
        setIsOrdering(false);
      }
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
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: "#FF8C00", mb: 0.5 }}
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="#CCCCCC" sx={{ mb: 1 }}>
          {product.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Chip
            label={`${product.quantity || 0} in stock`}
            size="small"
            sx={{ backgroundColor: "#3D3D3D", color: "#DDDDDD" }}
          />
          <Typography
            variant="h6"
            component="span"
            sx={{ color: "#FF8C00", fontWeight: "bold" }}
          >
            ${product.price?.toFixed(2) || "0.00"}
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        sx={{ p: { xs: 1, sm: 1.5 }, justifyContent: "space-between" }}
      >
        {isStore && (
          <>
            <Counter
              max={product.quantity}
              onChange={handleQuantityChange}
              disabled={product.quantity === 0}
            />
            <TooltipComponent
              title={product.quantity === 0 ? "Out of stock" : ""}
            >
              <span>
                <Button
                  size="small"
                  fullWidth
                  variant="contained"
                  onClick={handlePlaceOrder}
                  startIcon={<ShoppingCartIcon />}
                  sx={{
                    backgroundColor: isOrdering ? "#FFB266" : "#FF8C00",
                    "&:hover": { backgroundColor: isOrdering ? "#FFB266" : "#CC5500" },
                    borderRadius: "20px",
                  }}
                  disabled={product.quantity === 0 || isOrdering || !user}
                >
                  {isOrdering ? "Placing Order..." : "Place Order"}
                </Button>
              </span>
            </TooltipComponent>
          </>
        )}
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
                "&:hover": { backgroundColor: "rgba(255, 140, 0, 0.1)" },
              }}
            >
              Edit
            </Button>
            <Button
              size="small"
              onClick={async () => {
                setIsDeleting(true);
                await onDelete(product);
                setIsDeleting(false);
              }}
              disabled={isDeleting}
              startIcon={<DeleteIcon />}
              sx={{
                color: "#FF5555",
                "&:hover": { backgroundColor: "rgba(255, 85, 85, 0.1)" },
              }}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </Box>
        )}
      </CardActions>
    </MuiCard>
  );
};

export default ProductCard;