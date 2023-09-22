import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import { MouseEvent } from "react";
import Hidden from "@mui/material/Hidden";
import { makeRequest } from "../axiosBaseUrl";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const pages = ["Art", "Science", "Food"];
const profileActions = ["Write a Post", "Logout", "Delete Account"];

export const Navbar = () => {
  const [clickedElement, setClickedElement] = useState<string | null>(null);

  const handleMouseDown = (element: string) => {
    setClickedElement(element);
  };

  const handleMouseUp = () => {
    setClickedElement(null);
  };

  const [anchorElNavPages, setAnchorElNavPages] = useState<null | HTMLElement>(null);
  const [anchorElNavProfile, setAnchorElNavProfile] = useState<null | HTMLElement>(null);

  const handleOpenNavMenuPages = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNavPages(event.currentTarget);
  };

  const handleOpenNavMenuProfile = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNavProfile(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNavPages(null);
    setAnchorElNavProfile(null);
  };

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContextProvider");
  }

  const { currentUser, logout } = authContext;

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };
  const handleDeleteAccount = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete your account?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await makeRequest.delete(
                `/users/delete-user/${currentUser?.id}`
              );
              if (response.status === 200) {
                toast.success("User deleted successfully");
                setTimeout(async () => {
                  await logout();
                  window.location.href = "/";
                }, 5000);
              } else {
                toast.error("An error occurred while deleting the user.");
              }
            } catch (error) {
              toast.error("There was an error deleting the user");
              console.error("There was an error deleting the user", error);
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="navbar">
      <ToastContainer />
      <AppBar
        sx={{
          boxShadow: 0,
          padding: 0,
          backgroundColor: "#b9e7e7",
          height: "70px",
        }}
      >
        <Container
          sx={{
            backgroundColor: "#b9e7e7",
            color: "black",
            height: "70px",
            display: "flex",
          }}
        >
          <Toolbar disableGutters sx={{ padding: 0, margin: 0, width: "100%" }}>
            <div>
              {/* Left part of the navbar */}
              <div>
                {/* Logo */}
                <Link to={"/"} className="link">
                  <AdbIcon sx={{ display: "flex", margin: "0 12px 0 0" }} />
                </Link>
                {/* Name of the website */}
                <Hidden only={["xs"]}>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      display: "flex",
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    Blogster
                  </Typography>
                </Hidden>
              </div>

              {/* Right part of the navbar */}
              <div>
                {/* Menu Pages Desktop */}
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "black", display: "flex" }}
                      href={`/?cat=${page.toLowerCase()}`}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>

                {/* Login when user is not logged in */}
                {!currentUser && (
                  <Link to="/login" className="link">
                    Login
                  </Link>
                )}

                {/* Dropdown Menu Pages Mobile */}
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenuPages}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNavPages}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNavPages)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                      mt: 1,
                    }}
                  >
                    {pages.map((page) => (
                      <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{
                          color: "black",
                          display: "block",
                          margin: "0 16px",
                        }}
                        href={`/?cat=${page.toLowerCase()}`}
                      >
                        {page}
                      </Button>
                    ))}
                  </Menu>
                </Box>

                {/* Dropdown Menu Profile Actions */}
                {currentUser && (
                  <>
                    <Box sx={{ flexGrow: 1, display: "flex" }}>
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenuProfile}
                        onMouseDown={() => handleMouseDown("iconButton")}
                        onMouseUp={handleMouseUp}
                        sx={{
                          backgroundColor: "white",
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "300",
                          border: "1px solid teal",
                          transform:
                            clickedElement === "iconButton" ? "scale(0.8)" : "scale(1)",
                          transition: "transform 0.2s ease-in-out",
                          ":hover": {
                            backgroundColor: "white",
                            border: "1px solid teal",
                          },
                        }}
                      >
                        <span>{currentUser?.username.slice(0, 1)}</span>
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNavProfile}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        open={Boolean(anchorElNavProfile)}
                        onClose={handleCloseNavMenu}
                        sx={{
                          display: "block",
                          mt: 1,
                        }}
                      >
                        {profileActions.map((action) => (
                          <Button
                            key={action}
                            onClick={() => {
                              if (action === "Delete Account") {
                                handleCloseNavMenu();
                                handleDeleteAccount();
                              } else if (action === "Logout") {
                                handleLogout();
                              } else if (action === "Write a Post") {
                                window.location.href = "/write";
                              }
                            }}
                            sx={{
                              color: "black",
                              display: "block",
                              margin: "0 16px",
                            }}
                          >
                            {action}
                          </Button>
                        ))}
                      </Menu>
                    </Box>
                  </>
                )}
              </div>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
