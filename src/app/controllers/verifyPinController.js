import User from "../models/users.js"; // Mô hình User từ MongoDB
// Hàm để tạo mã PIN ngẫu nhiên
function generatePinCode() {
  return Math.floor(100000 + Math.random() * 900000); // Tạo mã PIN 6 chữ số
}

// Hàm gửi email chứa mã PIN mới (giả định có sẵn hàm này)
async function sendPinEmail(email, pin) {
  // Logic gửi email (ví dụ: sử dụng thư viện nodemailer)
  console.log(`Sending email to ${email} with PIN: ${pin}`);
}

// Hàm để xác minh mã PIN
export const verifyPin = async (req, res) => {
  const { pin } = req.body;
  // Kiểm tra xem email có trong phiên không
  if (!req.session.email) {
    return res.status(400).json({ message: "Email không tồn tại trong phiên. Vui lòng đăng ký lại." });
  }

  const email = req.session.email; // Lấy email từ phiên
  
  // Kiểm tra xem các trường bắt buộc có được cung cấp không
  if (!email || !pin) {
    return res.status(400).json({ message: "Email và mã PIN là bắt buộc" });
  }

  try {
    // Tìm người dùng theo email
    const user = await User.findOne({ email });

    // Kiểm tra xem người dùng có tồn tại không
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Kiểm tra thời gian hết hạn của mã PIN (3 phút)
    const pinExpirationTime = 3 * 60 * 1000; // 3 phút
    const now = Date.now();4
    const pinCreatedAt = user.pinCreatedAt;

    if (now - pinCreatedAt > pinExpirationTime) {
      return res.status(400).json({
        message: "Mã PIN đã hết hạn. Vui lòng yêu cầu mã PIN mới.",
        expired: true,
      });
    }

    // In ra mã PIN đã lưu và mã PIN đã nhập để gỡ lỗi
    console.log(`Stored PIN: ${user.pin}, Entered PIN: ${pin}`);

    // Kiểm tra xem mã PIN đã nhập có khớp với mã PIN đã lưu không
    if (user.pin.toString() === pin.toString()) {
      // Nếu mã PIN đúng, kích hoạt tài khoản
      user.isActive = true;
      console.log("Previous active status:", user.isActive); // In ra giá trị trước khi thay đổi

      try {
        const savedUser = await user.save(); // Lưu vào cơ sở dữ liệu

        // Kiểm tra xem lưu có thành công không
        if (savedUser.isActive === true) {
          console.log("User saved successfully:", savedUser); // In ra thông tin người dùng sau khi lưu
        } else {
          console.error("Failed to update isActive field.");
        }

        // Kiểm tra lại giá trị sau khi lưu
        const updatedUser = await User.findOne({ email });
        console.log("Updated user after save:", updatedUser); // In ra thông tin người dùng sau khi lưu

        return res.status(200).json({ message: "Kích hoạt tài khoản thành công!" });
      } catch (saveError) {
        console.error("Error saving user:", saveError); // In ra thông báo lỗi nếu lưu không thành công
        return res.status(500).json({
          message: "Lỗi khi lưu thông tin người dùng",
          error: saveError.message,
        });
      }
    } else {
      return res.status(400).json({ message: "Mã PIN không đúng" });
    }
  } catch (error) {
    // Xử lý lỗi
    console.error("Error verifying PIN:", error); // In ra thông báo lỗi
    res.status(500).json({ message: "Lỗi khi xác minh mã PIN", error: error.message });
  }
};

// Hàm để yêu cầu mã PIN mới
export const resendPin = async (req, res) => {
  const email = req.session.email;

  if (!email) {
    return res.status(400).json({ message: "Email không được tìm thấy trong phiên làm việc" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Tạo mã PIN mới và cập nhật thời gian tạo mã PIN
    const newPin = generatePinCode();
    user.pin = newPin;
    user.pinCreatedAt = Date.now(); // Cập nhật thời gian tạo mã PIN

    // Lưu người dùng và gửi email chứa mã PIN mới
    await user.save();
    await sendPinEmail(user.email, newPin);

    return res.status(200).json({ message: "Mã PIN mới đã được gửi đến email của bạn." });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi gửi mã PIN mới", error: error.message });
  }
};
