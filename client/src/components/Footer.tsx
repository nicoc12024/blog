import { makeRequest } from "../axiosBaseUrl";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Footer = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContextProvider");
  }

  const { currentUser, logout } = authContext;

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
    <footer>
      <h1>Blogster</h1>
      {currentUser && (
        <span className="delete-account" onClick={handleDeleteAccount}>
          Click here to Delete Account
        </span>
      )}
      <span>
        <ToastContainer />
        Made with ♥️ and <b>React.js</b>.
      </span>
    </footer>
  );
};
