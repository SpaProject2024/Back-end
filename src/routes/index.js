import testRoutes from "./testRouters.js";
import doctorsRoutes from "./doctorsRouter.js";
import services from "./ServiceRouter.js";

function route(app) {
  app.use("/tests", testRoutes);
  app.use("/doctors", doctorsRoutes);
  app.use("/services", services);
}

export default route