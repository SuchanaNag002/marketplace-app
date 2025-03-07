import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import Dialog from "../../components/ui/Dialog";
import { UserContext } from "../../../context/userContext";

// Mock or import your real API calls
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../../api/ProductsApi";

import ProductCard from "../../../components/ProductComponent/ProductCard";
import ProductForm from "../../../components/ProductComponent/ProductForm";

const drawerWidth = 240;

const Dashboard = ({ onLogout }) => {
  const { user } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width:600px)");

  // State for controlling the mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  // State for which view to show: "Add Product" (dialog) or "Edit Product" (list)
  const [viewMode, setViewMode] = useState("edit"); // default to "edit"

  // Products belonging to this seller
  const [myProducts, setMyProducts] = useState([]);

  // Dialog state for adding a product
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchMyProducts();
    // eslint-disable-next-line
  }, []);

  const fetchMyProducts = async () => {
    try {
      const allProducts = await getProducts();
      const sellerItems = allProducts.filter((p) => p.sellerId === user.id);
      setMyProducts(sellerItems);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Sidebar actions
  const handleAddProductClick = () => {
    setOpenDialog(true);
    if (isMobile) handleDrawerToggle();
  };

  const handleEditProductClick = () => {
    setViewMode("edit");
    if (isMobile) handleDrawerToggle();
  };

  // Create product
  const handleAddProduct = async (data) => {
    try {
      const newProduct = await createProduct({
        ...data,
        sellerId: user.id,
      });
      setMyProducts([...myProducts, newProduct]);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Delete product
  const handleDeleteProduct = async (product) => {
    try {
      await deleteProduct(product.id);
      setMyProducts(myProducts.filter((p) => p.id !== product.id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Example product update
  const handleUpdateProduct = async (product) => {
    try {
      const updatedData = { name: "Updated Name", description: "Updated Desc" };
      const updatedProduct = await updateProduct(product.id, updatedData);
      const updatedList = myProducts.map((p) =>
        p.id === product.id ? updatedProduct : p
      );
      setMyProducts(updatedList);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Sidebar content
  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Typography variant="h6" sx={{ p: 2, color: "#fff" }}>
        Menu
      </Typography>
      {/* List with icons */}
      <List sx={{ flexGrow: 1 }}>
        {/* Add Product */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleAddProductClick}
            sx={{
              color: "#FFFFFF",
              "&:hover": { backgroundColor: "#3D3D3D" },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Add Product" />
          </ListItemButton>
        </ListItem>

        {/* Edit Product */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleEditProductClick}
            sx={{
              color: "#FFFFFF",
              "&:hover": { backgroundColor: "#3D3D3D" },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Product" />
          </ListItemButton>
        </ListItem>
      </List>
      {/* Bottom section: user info + logout */}
      <Box sx={{ p: 2, borderTop: "1px solid #555" }}>
        <Typography variant="body2" sx={{ mb: 1, color: "#fff" }}>
          Logged in as: <strong>{user?.name}</strong>
        </Typography>
        <ListItemButton
          onClick={onLogout}
          sx={{
            color: "#FFFFFF",
            "&:hover": { backgroundColor: "#3D3D3D" },
            mt: 1,
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* Dark top navbar */}
      <Navbar title="E-Marketplace Dashboard" onMenuClick={handleDrawerToggle} />

      {/* Dark sidebar */}
      <Sidebar
        drawerContent={drawerContent}
        mobileOpen={mobileOpen}
        onClose={handleDrawerToggle}
      />

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8, // offset for the AppBar
        }}
      >
        {/* Show the seller's products with Edit/Delete */}
        {viewMode === "edit" && (
          <>
            <Typography variant="h5" sx={{ mb: 2 }}>
              My Products
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "1fr 1fr 1fr",
                },
                gap: 2,
              }}
            >
              {myProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onDelete={() => handleDeleteProduct(prod)}
                  onEdit={() => handleUpdateProduct(prod)}
                  isEditable
                />
              ))}
            </Box>
          </>
        )}
      </Box>

      {/* Dialog for adding a product */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} title="Add New Product">
        <ProductForm onSubmit={handleAddProduct} />
      </Dialog>
    </Box>
  );
};

export default Dashboard;
