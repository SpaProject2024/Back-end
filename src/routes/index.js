import testRoutes from "./testRouters.js";
import doctorsRoutes from "./doctorsRouter.js";
import loginRoutes from "./loginRouter.js";
import registerRoutes from "./registerRouter.js";
import verifyPinRoutes from "./verifyPinRouter.js";
import fogetPasswordRoutes from "./fogetPasswordRouter.js";
import sendAppointmentRouter from "./sendAppointmentRouter.js";
import managersRouter from "./managersRouter.js";
import services from "./service.js";
function route(app) {
  app.use("/tests", testRoutes);
  app.use("/doctors", doctorsRoutes);
  app.use("/login", loginRoutes);
  app.use("/register", registerRoutes);
  app.use("/verifyPin", verifyPinRoutes);
  app.use("/fogetPassword", fogetPasswordRoutes);
  app.use("/sendappointment", sendAppointmentRouter);
  app.use("/services", services);
  app.use("/managers", managersRouter);
  app.use("/warehouse", warehouseRouters);
}
export default route;
