import React, { useState, useEffect } from "react";
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
import LoadingState from "../ui/LoadingState";

const ProductCard = ({
  product,
  onEdit,
  onDelete,
  onPlaceOrder,
  isEditable,
  isStore,
  user,
  setAlert,
}) => {
  const [quantityToOrder, setQuantityToOrder] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [counterKey, setCounterKey] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isOwnProduct =
    user && product.sellerId && product.sellerId.includes(user.id);

  // Improved image source extraction with fallbacks
  const getImageSrc = () => {
    // Check for multiple possible image URL structures
    if (product.image && product.image.length > 0) {
      // Direct URL (for Cloudinary images)
      if (product.image[0].url) {
        return product.image[0].url;
      }
      // Airtable thumbnail structure
      if (product.image[0].thumbnails) {
        return product.image[0].thumbnails.large?.url || 
               product.image[0].thumbnails.full?.url || 
               product.image[0].thumbnails.small?.url;
      }
    }
    // Return a placeholder if no valid image found
    return "https://via.placeholder.com/300x160?text=No+Image";
  };

  const imageSrc = getImageSrc();

  const handleQuantityChange = (quantity) => {
    setQuantityToOrder(quantity);
  };

  const handlePlaceOrder = async () => {
    if (quantityToOrder > 0 && user) {
      setIsOrdering(true);
      const orderDate = new Date();
      const orderData = {
        productId: product.id,
        quantity: quantityToOrder,
        orderDate: orderDate.toISOString().split("T")[0],
      };
      try {
        await createOrder(orderData);
        const updatedQuantity = product.quantity - quantityToOrder;
        const updatedProduct = { ...product, quantity: updatedQuantity };
        await updateProduct(product.id, { quantity: updatedQuantity });
        onPlaceOrder(updatedProduct);
        setQuantityToOrder(1);
        setCounterKey((prev) => prev + 1);
        setAlert({ severity: "success", message: "Order placed successfully" });
      } catch (error) {
        setAlert({ severity: "error", message: "Failed to place order" });
      } finally {
        setIsOrdering(false);
      }
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true); // Mark as loaded to remove spinner
  };

  // Reset loading state if product changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [product.id]);

  return (
    <MuiCard
      sx={{
        maxHeight: { xs: "32rem", sm: "36rem" },
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
      <Box
        sx={{
          height: "160px",
          position: "relative",
          m: 1,
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "#222222", // Darker background for image container
        }}
      >
        {!imageLoaded && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <Box 
              sx={{ 
                transform: { xs: "scale(0.4)", sm: "scale(0.5)" }, 
                transformOrigin: "center",
                opacity: 0.8
              }}
            >
              <LoadingState />
            </Box>
          </Box>
        )}
        <CardMedia
          component="img"
          height="160"
          image={imageSrc}
          alt={product.name || "Product image"}
          onLoad={handleImageLoad}
          onError={handleImageError}
          sx={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
            borderBottom: imageLoaded ? "2px solid #FF8C00" : "none",
            borderRadius: "6px",
            display: imageLoaded ? "block" : "none",
            backgroundColor: imageError ? "#3D3D3D" : "transparent",
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, p: { xs: 1, sm: 2 }, pb: 0 }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: "#FF8C00",
            mb: 0.5,
            fontSize: { xs: "1rem", sm: "1.25rem" },
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="#CCCCCC"
          sx={{
            mb: 1,
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
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
      <CardActions
        sx={{
          p: { xs: 1, sm: 1.5 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        {isStore && (
          <>
            {isOwnProduct ? (
              <TooltipComponent title="This product was uploaded by you. Hence you cannot purchase it.">
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <Counter
                    key={counterKey}
                    max={product.quantity}
                    onChange={handleQuantityChange}
                    disabled
                    sx={{ width: "100%", maxWidth: { xs: "100%", sm: "200px" } }}
                  />
                </Box>
              </TooltipComponent>
            ) : (
              <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Counter
                  key={counterKey}
                  max={product.quantity}
                  onChange={handleQuantityChange}
                  disabled={product.quantity === 0}
                  sx={{ width: "100%", maxWidth: { xs: "100%", sm: "200px" } }}
                />
              </Box>
            )}
            {isOwnProduct ? (
              <TooltipComponent title="This product was uploaded by you. Hence you cannot purchase it.">
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  sx={{
                    backgroundColor: "#FF8C00",
                    "&:hover": { backgroundColor: "#CC5500" },
                    borderRadius: "20px",
                    "&.Mui-disabled": { backgroundColor: "#FFB266" },
                    width: "100%",
                    maxWidth: { xs: "100%", sm: "100%" },
                  }}
                  disabled
                >
                  Place Order
                </Button>
              </TooltipComponent>
            ) : (
              <TooltipComponent
                title={product.quantity === 0 ? "Out of stock" : ""}
              >
                <Button
                  size="small"
                  variant="contained"
                  onClick={handlePlaceOrder}
                  startIcon={<ShoppingCartIcon />}
                  sx={{
                    backgroundColor: isOrdering ? "#FFB266" : "#FF8C00",
                    "&:hover": {
                      backgroundColor: isOrdering ? "#FFB266" : "#CC5500",
                    },
                    borderRadius: "20px",
                    "&.Mui-disabled": { backgroundColor: "#FFB266" },
                    width: "100%",
                    maxWidth: { xs: "100%", sm: "200px" },
                  }}
                  disabled={product.quantity === 0 || isOrdering || !user}
                >
                  {isOrdering ? "Placing Order..." : "Place Order"}
                </Button>
              </TooltipComponent>
            )}
          </>
        )}
        {isEditable && (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              mt: { xs: 1, sm: 0 },
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
                try {
                  await onDelete(product);
                  setAlert({
                    severity: "success",
                    message: "Product deleted successfully",
                  });
                } catch (error) {
                  setAlert({
                    severity: "error",
                    message: "Failed to delete product",
                  });
                } finally {
                  setIsDeleting(false);
                }
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