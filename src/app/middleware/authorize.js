export const authorizeRole = (roles) => {
  return (req, res, next) => {
      if (!req.user) {
          return res.status(401).json({ message: "Bạn cần đăng nhập để truy cập" });
      }
      const userRole = req.user.role; // Giả sử đã lưu thông tin người dùng trong req.user
      if (!roles.includes(userRole)) {
          return res.status(403).json({ message: "Bạn không có quyền truy cập" });
      }
      next();
  };
};

  