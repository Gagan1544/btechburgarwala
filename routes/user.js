import express from "express";
import passport from "passport";
import {
  getAdminStats,
  getAdminUsers,
  logout,
  myProfile,
} from "../controllers/user.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// console.log(process.env.RAZORPAY_API_KEY);
// console.log(process.env.FRONTEND_URL);
process.nextTick(() => {
  router.get(
    "/googlelogin",
    passport.authenticate("google", {
      scope: ["profile"],
    })
  );
  router.get(
    "/login",
    passport.authenticate("google", {
      // scope: ["profile"],

      successRedirect: process.env.FRONTEND_URL,
      // successRedirect: ,
    })
    // (req, res, next) => {
    //   res.send("logged in");
    // }
  );

  router.get("/me", isAuthenticated, myProfile);

  router.get("/logout", logout);

  // Admin Routes
  router.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminUsers);

  router.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminStats);
});

export default router;
