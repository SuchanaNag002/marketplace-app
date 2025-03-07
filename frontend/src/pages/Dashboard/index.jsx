import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, useMediaQuery, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import StoreIcon from "@mui/icons-material/Store";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import Dialog from "../../components/ui/Dialog";
import { UserContext } from "../../context/userContext";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../api/ProductsApi";
import ProductCard from "../../components/ProductComponent/ProductCard";
import ProductForm from "../../components/ProductComponent/ProductForm";

const drawerWidth = 240;

const Dashboard = ({ onLogout }) => {
  const { user } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [viewMode, setViewMode] = useState("store");
  const [myProducts, setMyProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      const allProducts = await getProducts();
      const items = allProducts.filter((p) => p.userId === user.id);
      setMyProducts(items);
      setFilteredProducts(items);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = myProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAddProductClick = () => {
    setEditProduct(null);
    setOpenDialog(true);
    setViewMode("edit");
    if (isMobile) handleDrawerToggle();
  };

  const openEditDialog = (product) => {
    setEditProduct(product);
    setOpenDialog(true);
    setViewMode("edit");
    if (isMobile) handleDrawerToggle();
  };

  const handleSubmitProduct = async (data) => {
    try {
      let productData;
      if (data instanceof FormData) {
        if (!editProduct) data.append("userId", user.id);
        productData = data;
      } else {
        productData = { ...data, userId: user.id };
      }
      if (editProduct) {
        await updateProduct(editProduct.id, productData);
      } else {
        await createProduct(productData);
      }
      setEditProduct(null);
      setOpenDialog(false);
      fetchMyProducts();
    } catch (error) {
      console.error("Error in Dashboard:", error);
      throw new Error(
        error.response?.data?.error ||
          (editProduct ? "Could not update product!" : "Could not add product to store!")
      );
    }
  };

  const handleDeleteProduct = async (product) => {
    try {
      await deleteProduct(product.id);
      const updatedProducts = myProducts.filter((p) => p.id !== product.id);
      setMyProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handlePlaceOrder = (product) => {
    console.log("Placing order for:", product);
  };

  const gradientStyle = {
    backgroundImage: "linear-gradient(45deg, #CC5500, #FFA333)",
    backgroundClip: "text",
    textFillColor: "transparent",
    color: "transparent",
    fontWeight: "semibold",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    MozBackgroundClip: "text",
    MozTextFillColor: "transparent",
  };

  const selectedStyle = {
    backgroundColor: "#3D3D3D",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "#3D3D3D" },
  };

  const darkOrange = "#FF8C00";

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", alignItems: "center" }}>
      <Typography variant="h6" sx={{ p: 2, color: "#fff" }}>Menu</Typography>
      <List sx={{ flexGrow: 1, width: "100%", px: 2 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => { setViewMode("store"); if (isMobile) handleDrawerToggle(); }} sx={{ justifyContent: "center", ...(viewMode === "store" && !openDialog && selectedStyle), "&:hover": selectedStyle }}>
            <ListItemIcon sx={{ minWidth: "36px" }}><StoreIcon sx={{ color: darkOrange }} /></ListItemIcon>
            <ListItemText primary="Go To Store" primaryTypographyProps={{ sx: gradientStyle }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleAddProductClick} sx={{ justifyContent: "center", ...(!editProduct && openDialog && selectedStyle), "&:hover": selectedStyle }}>
            <ListItemIcon sx={{ minWidth: "36px" }}><AddCircleOutlineIcon sx={{ color: darkOrange }} /></ListItemIcon>
            <ListItemText primary="Add Product" primaryTypographyProps={{ sx: gradientStyle }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => { setViewMode("edit"); if (isMobile) handleDrawerToggle(); }} sx={{ justifyContent: "center", ...(viewMode === "edit" && !openDialog && selectedStyle), "&:hover": selectedStyle }}>
            <ListItemIcon sx={{ minWidth: "36px" }}><EditIcon sx={{ color: darkOrange }} /></ListItemIcon>
            <ListItemText primary="Edit Product" primaryTypographyProps={{ sx: gradientStyle }} />
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ p: 2, borderTop: "1px solid #555", width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1, ml: { xs: 1, sm: 2 } }}>
          <Box sx={{ width: { xs: 36, sm: 40 }, height: { xs: 36, sm: 40 }, borderRadius: "50%", background: "linear-gradient(45deg, #FF8C00, #FFA500)", display: "flex", alignItems: "center", justifyContent: "center", mr: 1 }}>
            <Typography sx={{ color: "#fff", fontWeight: "semibold", fontSize: { xs: "14px", sm: "16px" } }}>{user?.name?.slice(0, 2).toUpperCase()}</Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "#fff", fontWeight: "semibold" }}>{user?.name}</Typography>
        </Box>
        <ListItemButton onClick={onLogout} sx={{ justifyContent: "center", "&:hover": selectedStyle, width: "100%" }}>
          <ListItemIcon sx={{ minWidth: "36px" }}><ExitToAppIcon sx={{ color: darkOrange }} /></ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ sx: gradientStyle }} />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar onSearchChange={handleSearchChange} handleDrawerToggle={handleDrawerToggle} />
      <Sidebar drawerWidth={drawerWidth} drawerContent={drawerContent} mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: { xs: 16, sm: 8, md: 8 } }}>
        {viewMode === "store" && (
          <Box sx={{ display: "grid", mb: 4, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }, gap: { xs: 1, sm: 2 } }}>
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} onPlaceOrder={() => handlePlaceOrder(prod)} isStore={true} />
            ))}
          </Box>
        )}
        {viewMode === "edit" && (
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }, gap: { xs: 1, sm: 2 } }}>
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} onEdit={() => openEditDialog(prod)} onDelete={() => handleDeleteProduct(prod)} isEditable={true} />
            ))}
          </Box>
        )}
      </Box>
      <Dialog open={openDialog} onClose={() => { setOpenDialog(false); setEditProduct(null); }} title={editProduct ? "Edit Product" : "Add New Product"}>
        <ProductForm onSubmit={handleSubmitProduct} product={editProduct || {}} />
      </Dialog>
    </Box>
  );
};

export default Dashboard;
