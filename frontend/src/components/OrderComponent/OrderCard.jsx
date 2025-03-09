import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Card as MuiCard,
  CardMedia,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteOrder, updateOrder } from "../../api/OrdersApi";
import { updateProduct } from "../../api/ProductsApi";
import LoadingState from "../ui/LoadingState";
import Dropdown from "../ui/Dropdown";
import { ProductContext } from "../../context/ProductContext";

const OrderCard = ({ order, onDeleteOrder, setAlert, isRequested }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [status, setStatus] = useState(order.status || "Pending");
  const { products, fetchProducts, loading } = useContext(ProductContext);

  // Fetch products if not already loaded
  useEffect(() => {
    if (!products.length && !loading) {
      fetchProducts().catch((error) =>
        console.error("Failed to fetch products:", error)
      );
    }
  }, [products, loading, fetchProducts]);

  // Handle order.productId being an array
  const productId = Array.isArray(order.productId) ? order.productId[0] : order.productId;
  const product = products.find((p) => p.id === productId);
  console.log("Order productId (raw):", order.productId);
  console.log("Extracted productId:", productId);
  console.log("Products array:", products);
  console.log("Found product:", product);
  const productName = product ? product.name : "Unknown Product";

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

  const imageSrc = isRequested
    ? order.url
    : product?.image?.[0]?.thumbnails?.large?.url ||
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3";

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteOrder(order.id);
      if (product?.id) {
        const updatedQuantity = (product.quantity || 0) + order.quantity;
        await updateProduct(product.id, { quantity: updatedQuantity });
      }
      onDeleteOrder(order.id);
      setAlert({ severity: "success", message: "Order cancelled successfully" });
    } catch {
      setAlert({ severity: "error", message: "Failed to cancel order" });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await updateOrder(order.id, { status: newStatus });
      setStatus(newStatus);
      setAlert({ severity: "success", message: "Order status updated successfully" });
    } catch {
      setAlert({ severity: "error", message: "Failed to update status" });
    }
  };

  const handleImageLoad = () => setImageLoaded(true);

  return (
    <MuiCard
      sx={{
        maxHeight: { xs: "50rem", sm: "50rem" },
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
        width: { xs: "100%", sm: "auto" },
        maxWidth: { xs: "100%", sm: "300px" },
      }}
    >
      {!imageLoaded && (
        <Box
          sx={{
            height: { xs: "120px", sm: "160px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2A2A2A",
            overflow: "hidden",
          }}
        >
          <Box sx={{ transform: "scale(0.5)", transformOrigin: "center" }}>
            <LoadingState />
          </Box>
        </Box>
      )}
      <CardMedia
        component="img"
        height={{ xs: "120", sm: "160" }}
        image={imageSrc}
        alt={productName}
        onLoad={handleImageLoad}
        sx={{
          objectFit: "cover",
          borderBottom: "2px solid #FF8C00",
          m: 1,
          borderRadius: "8px",
          width: "calc(100% - 16px)",
          display: imageLoaded ? "block" : "none",
          height: { xs: "120px", sm: "160px" },
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
          {loading ? "Loading..." : productName}
        </Typography>
        {isRequested ? (
          <Box sx={{ mt: 1, px: 0.5 }}>
            <Dropdown
              label="Status"
              name="status"
              value={status}
              onChange={handleStatusChange}
              options={[
                { value: "Pending", label: "Pending" },
                { value: "Delivered", label: "Delivered" },
              ]}
            />
            <Typography
              variant="body2"
              color="white"
              sx={{
                mt: 1,
                fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.9rem" },
              }}
            >
              Order Date: {new Date(order.orderDate).toLocaleDateString()}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, pl: 0.5, pr: 0.5 }}>
            <Typography variant="body2" color="#FF8C00">
              Quantity Ordered: {order.quantity}
            </Typography>
            <Typography variant="body2" color="#FF8C00">
              Order Date: {new Date(order.orderDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="white">
              Delivery Status: {order.status}
            </Typography>
          </Box>
        )}
      </CardContent>
      {!isRequested && (
        <CardActions sx={{ p: { xs: 1, sm: 1.5, md: 2 }, justifyContent: "center" }}>
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
            {isDeleting ? "Cancelling..." : "Cancel"}
          </Button>
        </CardActions>
      )}
    </MuiCard>
  );
};

export default OrderCard;