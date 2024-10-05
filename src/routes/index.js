import testRoutes from "./testRouters.js";
import doctorsRoutes from "./doctorsRouter.js";

function route(app) {
  app.use("/tests", testRoutes);
  app.use("/doctors", doctorsRoutes);
}

export default route