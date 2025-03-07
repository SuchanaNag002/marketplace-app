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
import { UserContext } from "../../context/userContext";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/ProductsApi";

import ProductCard from "../../components/ProductComponent/ProductCard";
import ProductForm from "../../components/ProductComponent/ProductForm";

const drawerWidth = 240;

const Dashboard = ({ onLogout }) => {
  const { user } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width:600px)");

  const [mobileOpen, setMobileOpen] = useState(false);
  const [viewMode, setViewMode] = useState("edit");
  const [myProducts, setMyProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchMyProducts();
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

  const handleAddProductClick = () => {
    setOpenDialog(true);
    if (isMobile) handleDrawerToggle();
  };

  const handleEditProductClick = () => {
    setViewMode("edit");
    if (isMobile) handleDrawerToggle();
  };

  const handleAddProduct = async (data) => {
    try {
      const response = await createProduct({
        ...data,
        sellerId: user.id,
      });
      setMyProducts([...myProducts, response]);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error in Dashboard:", error);
      throw new Error(
        error.response?.data?.error || "Could not add product to store!"
      );
    }
  };

  const handleDeleteProduct = async (product) => {
    try {
      await deleteProduct(product.id);
      setMyProducts(myProducts.filter((p) => p.id !== product.id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

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

  const gradientStyle = {
    background: "linear-gradient(45deg, #FF8C00, #FFA500)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "semibold",
  };

  const selectedStyle = {
    backgroundColor: "#3D3D3D",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "#3D3D3D" },
  };

  const darkOrange = "#FF8C00";

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", alignItems: "center" }}>
      <Typography variant="h6" sx={{ p: 2, color: "#fff" }}>
        Menu
      </Typography>
      <List sx={{ flexGrow: 1, width: "100%", px: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleAddProductClick}
            sx={{
              justifyContent: "center",
              ...(openDialog && selectedStyle),
              "&:hover": selectedStyle,
            }}
          >
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <AddCircleOutlineIcon sx={{ color: darkOrange }} />
            </ListItemIcon>
            <ListItemText
              primary="Add Product"
              primaryTypographyProps={{ sx: { ...gradientStyle } }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleEditProductClick}
            sx={{
              justifyContent: "center",
              ...(viewMode === "edit" && !openDialog && selectedStyle),
              "&:hover": selectedStyle,
            }}
          >
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <EditIcon sx={{ color: darkOrange }} />
            </ListItemIcon>
            <ListItemText
              primary="Edit Product"
              primaryTypographyProps={{ sx: { ...gradientStyle } }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ p: 2, borderTop: "1px solid #555", width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1, ml: { xs: 1, sm: 2 } }}>
          <Box
            sx={{
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
              borderRadius: "50%",
              background: "linear-gradient(45deg, #FF8C00, #FFA500)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 1,
            }}
          >
            <Typography sx={{ color: "#fff", fontWeight: "semibold", fontSize: { xs: "14px", sm: "16px" } }}>
              {user?.name?.slice(0, 2).toUpperCase()}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "#fff", fontWeight: "semibold" }}>
            {user?.name}
          </Typography>
        </Box>
        <ListItemButton
          onClick={onLogout}
          sx={{
            justifyContent: "center",
            "&:hover": selectedStyle,
            width: "100%",
          }}
        >
          <ListItemIcon sx={{ minWidth: "36px" }}>
            <ExitToAppIcon sx={{ color: darkOrange }} />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ sx: { ...gradientStyle } }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar
        title="E-Marketplace Dashboard"
        onMenuClick={handleDrawerToggle}
      />
      <Sidebar
        drawerContent={drawerContent}
        mobileOpen={mobileOpen}
        onClose={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
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
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Add New Product"
      >
        <ProductForm onSubmit={handleAddProduct} />
      </Dialog>
    </Box>
  );
};

export default Dashboard;