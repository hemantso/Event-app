const express = require("express");
const multer = require("multer");

const UserController = require("./controllers/UserController");
const EventController = require("./controllers/EventController");
const DashboardController = require("./controllers/DashboardController");
const LoginController = require("./controllers/LoginController");
const RegistrationController = require("./controllers/RegistrationController");
const ApprovalController = require("./controllers/ApprovalController");
const RejectionsController = require("./controllers/RejectionsController");

const routes = express.Router();
const uploadConfig = require("./config/upload");
const RejectionController = require("./controllers/RejectionController");
const upload = multer(uploadConfig);

routes.get("/status", (req, res) => {
  res.send({ status: 200 });
});

//LoginController
routes.post("/login", LoginController.store);


//Registration
routes.post("/registration/:eventId", RegistrationController.create);
routes.post(
  "/registration/:registration_id",
  RegistrationController.getRegistration
);
//ApprovalController
routes.post(
  "/registration/:registration_id/approvals",
  ApprovalController.approval
);

//RejectionsController
routes.post(
  "/registration/:registration_id/rejection",
  RejectionController.rejection
);
//dashboard
routes.get("/dashboard", DashboardController.getAllEvents);
routes.get("/events/:sport", DashboardController.getAllSportsEvents);
routes.get("/dashboard/:eventId", DashboardController.getEventById);

//Event
routes.delete("/event/:eventId", EventController.delete);
routes.post("/event", upload.single("thumbnail"), EventController.createEvent);

//User
routes.post("/user/register", UserController.createUser);
routes.get("/user/:userId", UserController.getUserById);

module.exports = routes;
