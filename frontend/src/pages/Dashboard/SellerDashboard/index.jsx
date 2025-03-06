import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Navbar from "../../../components/ui/Navbar";
import Sidebar from "../../../components/ui/Sidebar";
import Dialog from "../../../components/ui/Dialog";
import Button from "../../../components/ui/button";
import { UserContext } from "../../../context/userContext";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../api/ProductsApi";
import ProductCard from "../../../components/ProductComponent/ProductCard";
import ProductForm from "../../../components/ProductComponent/ProductForm";

const drawerWidth = 240;

const SellerDashboard = ({ onLogout }) => {
  const { user } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width:600px)");

  // State for drawer, view mode, and products
  const [mobileOpen, setMobileOpen] = useState(false);
  const [viewMode, setViewMode] = useState("all"); // "all" or "edit"
  const [allProducts, setAllProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);

  // Control the dialog
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const products = await getProducts();
      setAllProducts(products);
      const myProds = products.filter((prod) => prod.sellerId === user.id);
      setMyProducts(myProds);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleShowAllProducts = () => {
    setViewMode("all");
    if (isMobile) handleDrawerToggle();
  };

  const handleShowMyProducts = () => {
    setViewMode("edit");
    if (isMobile) handleDrawerToggle();
  };

  const handleAddProductClick = () => {
    setOpenDialog(true);
    if (isMobile) handleDrawerToggle();
  };

  const handleAddProduct = async (data) => {
    try {
      const newProduct = await createProduct({
        ...data,
        sellerId: user.id,
      });
      setAllProducts([...allProducts, newProduct]);
      setMyProducts([...myProducts, newProduct]);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (product) => {
    try {
      await deleteProduct(product.id);
      setAllProducts(allProducts.filter((p) => p.id !== product.id));
      setMyProducts(myProducts.filter((p) => p.id !== product.id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Dummy update function; replace with your actual update logic
  const handleUpdateProduct = async (product) => {
    try {
      const updatedData = { name: "New Name", description: "Updated desc" };
      const updatedProduct = await updateProduct(product.id, updatedData);
      const updatedAll = allProducts.map((p) =>
        p.id === product.id ? updatedProduct : p
      );
      setAllProducts(updatedAll);
      const updatedMine = myProducts.map((p) =>
        p.id === product.id ? updatedProduct : p
      );
      setMyProducts(updatedMine);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Menu
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          px: 2,
        }}
      >
        <Button onClick={handleShowAllProducts}>All Products</Button>
        <Button onClick={handleAddProductClick}>Add Product</Button>
        <Button onClick={handleShowMyProducts}>Edit Product</Button>
      </Box>
      <Box sx={{ p: 2, borderTop: "1px solid #ddd" }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Logged in as: <strong>{user?.name}</strong>
        </Typography>
        <Button color="secondary" onClick={onLogout} fullWidth>
          Logout
        </Button>
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
        {viewMode === "all" && (
          <>
            <Typography variant="h5" sx={{ mb: 2 }}>
              All Products
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
              {allProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </Box>
          </>
        )}
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
      {/* Responsive Dialog with ProductForm */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Add New Product"
        onConfirm={() => {}}
      >
        <ProductForm onSubmit={handleAddProduct} />
      </Dialog>
    </Box>
  );
};

export default SellerDashboard;
