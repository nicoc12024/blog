import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const deleteUser = (req, res) => {
  const userId = req.params.id;

  // Verify JWT Token
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Access Denied");

  let decodedUserId;
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    decodedUserId = verified.id;
  } catch (error) {
    return res.status(400).json("Invalid Token");
  }

  // Check if the decoded userId matches the userId to be deleted
  if (String(decodedUserId) !== String(userId)) {
    return res.status(403).json("You are not authorized to delete this user");
  }

  // SQL query to delete the user
  const deleteQuery = "DELETE FROM users WHERE id = ?";

  db.query(deleteQuery, [userId], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ error: "An error occurred while deleting the user." });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    // Clear the cookie after successfully deleting the user
    res.clearCookie("access_token", { sameSite: "none", secure: true });

    return res.status(200).json({ message: "User deleted successfully." });
  });
};
