import doctorRouters from "./doctorsRouter.js";
import appointsRoutes from "./AppointRouter.js";
import loginRoutes from "./loginRouter.js";
import registerRoutes from "./registerRouter.js";
import verifyPinRoutes from "./verifyPinRouter.js";
import fogetPasswordRoutes from "./fogetPasswordRouter.js";
import sendAppointmentRouter from "./sendAppointmentRouter.js";
import managersRouter from "./managersRouter.js";
import suppliersRouter from "./supplierRouter.js";
import services from "./ServiceRouter.js";
function route(app) {
  app.use("/doctor", doctorRouters);
  app.use("/login", loginRoutes);
  app.use("/register", registerRoutes);
  app.use("/verifyPin", verifyPinRoutes);
  app.use("/fogetPassword", fogetPasswordRoutes);
  app.use("/sendappointment", sendAppointmentRouter);
  app.use("/services", services);
  app.use("/suppliers", suppliersRouter);
  app.use("/managers", managersRouter);
  app.use("/appointments", appointsRoutes);
}
export default route;
