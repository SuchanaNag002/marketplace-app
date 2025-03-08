import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, useMediaQuery, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import StoreIcon from "@mui/icons-material/Store";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import Dialog from "../../components/ui/Dialog";
import { UserContext } from "../../context/userContext";
import { ProductContext } from "../../context/productContext";
import { getOrders } from "../../api/OrdersApi";
import ProductCard from "../../components/ProductComponent/ProductCard";
import OrderCard from "../../components/OrderComponent/OrderCard";
import ProductForm from "../../components/ProductComponent/ProductForm";
import LoadingState from "../../components/ui/LoadingState";
import EmptyState from "../../components/ui/EmptyState";
import AlertComponent from "../../components/ui/Alert";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;
const darkOrange = "#FF8C00";
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

const Dashboard = ({ onLogout }) => {
  const { user } = useContext(UserContext);
  const { products, loading, fetchProducts, addProduct, editProduct, removeProduct } = useContext(ProductContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [viewMode, setViewMode] = useState("store");
  const [myProducts, setMyProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editProductData, setEditProductData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else if (currentScrollY === 0) {
        setShowNavbar(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts();
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (!products.length || loading) return;
    if (location.pathname === "/store") {
      setViewMode("store");
      fetchStoreProducts();
    } else if (location.pathname === "/editMyProducts") {
      setViewMode("edit");
      fetchMyProducts();
    } else if (location.pathname === "/myOrders") {
      setViewMode("orders");
      fetchMyOrders();
    }
  }, [location.pathname, products, loading]);

  const fetchMyProducts = () => {
    const items = products.filter((p) => p.userId === user.id);
    setMyProducts(items);
    setFilteredProducts(items);
  };

  const fetchStoreProducts = () => {
    setFilteredProducts(products);
  };

  const fetchMyOrders = async () => {
    try {
      setIsOrdersLoading(true);
      const orders = await getOrders(user.id);
      const enrichedOrders = orders.map((order) => ({
        ...order,
        product: products.find((p) => p.id === order.productId),
      }));
      setFilteredProducts(enrichedOrders);
    } catch (error) {
      setAlert({ severity: "error", message: "Failed to fetch orders" });
    } finally {
      setIsOrdersLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (viewMode === "orders") {
      const filtered = filteredProducts.filter((order) =>
        order.product?.name.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    } else {
      const filtered = (viewMode === "edit" ? myProducts : products).filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAddProductClick = () => {
    setEditProductData(null);
    setOpenDialog(true);
    if (isMobile) handleDrawerToggle();
  };

  const openEditDialog = (product) => {
    setEditProductData(product);
    setOpenDialog(true);
    if (isMobile) handleDrawerToggle();
  };

  const handleSubmitProduct = async (data) => {
    try {
      let productData;
      if (data instanceof FormData) {
        if (!editProductData) data.append("userId", user.id);
        productData = data;
      } else {
        productData = { ...data, userId: user.id };
      }
      if (editProductData) {
        const updatedProduct = await editProduct(editProductData.id, productData);
        setAlert({ severity: "success", message: "Product updated successfully" });
      } else {
        const newProduct = await addProduct(productData);
        setAlert({ severity: "success", message: "Product added successfully" });
        if (viewMode === "edit") {
          setMyProducts((prev) => [...prev, newProduct]);
          setFilteredProducts((prev) => [...prev, newProduct]);
        } else {
          setFilteredProducts((prev) => [...prev, newProduct]);
        }
      }
      setEditProductData(null);
      setOpenDialog(false);
      await fetchProducts();
      if (viewMode === "edit") {
        fetchMyProducts();
      } else if (viewMode === "store") {
        fetchStoreProducts();
      }
    } catch (error) {
      setAlert({
        severity: "error",
        message: editProductData ? "Could not update product!" : "Could not add product to store!",
      });
      throw error;
    }
  };

  const handleDeleteProduct = async (product) => {
    try {
      await removeProduct(product.id);
      fetchMyProducts();
      setAlert({ severity: "success", message: "Product deleted successfully" });
    } catch (error) {
      setAlert({ severity: "error", message: "Failed to delete product" });
    }
  };

  const handlePlaceOrder = (updatedProduct) => {
    setFilteredProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    if (viewMode === "edit") {
      setMyProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
    }
  };

  const handleDeleteOrder = (orderId) => {
    setFilteredProducts((prevProducts) =>
      prevProducts.filter((order) => order.id !== orderId)
    );
  };

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", alignItems: "center" }}>
      <Typography variant="h6" sx={{ p: 2, color: "#fff" }}>
        Menu
      </Typography>
      <List sx={{ flexGrow: 1, width: "100%", px: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate("/store")}
            sx={{ justifyContent: "center", ...(location.pathname === "/store" && selectedStyle), "&:hover": selectedStyle }}
          >
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <StoreIcon sx={{ color: darkOrange }} />
            </ListItemIcon>
            <ListItemText primary="Go To Store" primaryTypographyProps={{ sx: gradientStyle }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleAddProductClick}
            sx={{ justifyContent: "center", ...(openDialog && !editProductData && selectedStyle), "&:hover": selectedStyle }}
          >
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <AddCircleOutlineIcon sx={{ color: darkOrange }} />
            </ListItemIcon>
            <ListItemText primary="Add Product" primaryTypographyProps={{ sx: gradientStyle }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate("/editMyProducts")}
            sx={{ justifyContent: "center", ...(location.pathname === "/editMyProducts" && selectedStyle), "&:hover": selectedStyle }}
          >
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <EditIcon sx={{ color: darkOrange }} />
            </ListItemIcon>
            <ListItemText primary="Edit Products" primaryTypographyProps={{ sx: gradientStyle }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate("/myOrders")}
            sx={{ justifyContent: "center", ...(location.pathname === "/myOrders" && selectedStyle), "&:hover": selectedStyle }}
          >
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <ListAltIcon sx={{ color: darkOrange }} />
            </ListItemIcon>
            <ListItemText primary="My Orders" primaryTypographyProps={{ sx: gradientStyle }} />
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ p: 2, borderTop: "1px solid #555", width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1, ml: { xs: 1, sm: 2 } }}>
          <Box sx={{ width: { xs: 36, sm: 40 }, height: { xs: 36, sm: 40 }, borderRadius: "50%", background: "linear-gradient(45deg, #FF8C00, #FFA500)", display: "flex", alignItems: "center", justifyContent: "center", mr: 1 }}>
            <Typography sx={{ color: "#fff", fontWeight: "semibold", fontSize: { xs: "14px", sm: "16px" } }}>
              {user?.name?.slice(0, 2).toUpperCase()}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "#fff", fontWeight: "semibold" }}>
            {user?.name}
          </Typography>
        </Box>
        <ListItemButton onClick={onLogout} sx={{ justifyContent: "center", "&:hover": selectedStyle, width: "100%" }}>
          <ListItemIcon sx={{ minWidth: "36px" }}>
            <ExitToAppIcon sx={{ color: darkOrange }} />
          </ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ sx: gradientStyle }} />
        </ListItemButton>
      </Box>
    </Box>
  );

  const renderContent = () => {
    if (loading || isOrdersLoading) {
      return <LoadingState />;
    }
    if (filteredProducts.length === 0) {
      return <EmptyState />;
    }
    if (viewMode === "orders") {
      return (
        <Box
          sx={{
            display: "grid",
            mb: 4,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
            gap: { xs: 1, sm: 2 },
          }}
        >
          {filteredProducts.map((order) => (
            <OrderCard key={order.id} order={order} onDeleteOrder={handleDeleteOrder} setAlert={setAlert} />
          ))}
        </Box>
      );
    }
    return (
      <Box
        sx={{
          display: "grid",
          mb: 4,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
          gap: { xs: 1, sm: 2 },
        }}
      >
        {filteredProducts.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            onPlaceOrder={handlePlaceOrder}
            isStore={viewMode === "store"}
            onEdit={() => openEditDialog(prod)}
            onDelete={() => handleDeleteProduct(prod)}
            isEditable={viewMode === "edit"}
            user={user}
            setAlert={setAlert}
          />
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      {showNavbar && (
        <Navbar onSearchChange={handleSearchChange} handleDrawerToggle={handleDrawerToggle} searchQuery={searchQuery} />
      )}
      <Sidebar drawerWidth={drawerWidth} drawerContent={drawerContent} mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: { xs: showNavbar ? 16 : 2, sm: showNavbar ? 8 : 2, md: showNavbar ? 8 : 2 } }}
      >
        {renderContent()}
        {alert && <AlertComponent severity={alert.severity} message={alert.message} onClose={() => setAlert(null)} />}
      </Box>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setEditProductData(null);
        }}
        title={editProductData ? "Edit Product" : "Add New Product"}
      >
        <ProductForm onSubmit={handleSubmitProduct} product={editProductData || {}} setAlert={setAlert} />
      </Dialog>
    </Box>
  );
};

export default Dashboard;
