import nodemailer from "nodemailer"; // Để gửi email
import bcrypt from "bcrypt"; // Thư viện để mã hóa mật khẩu
import dotenv from "dotenv"; // Để quản lý biến môi trường
import User from "../models/users.js"; // Mô hình User từ MongoDB
import Doctor from "../models/doctors.js";
import Customer from "../models/customers.js";
import Staff from "../models/staffs.js";
import Manager from "../models/managers.js";
dotenv.config(); // Tải biến môi trường

// Tạo transporter cho nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Địa chỉ email từ biến môi trường
    pass: process.env.EMAIL_PASS, // Mật khẩu hoặc mật khẩu ứng dụng từ biến môi trường
  },
});

// Hàm tạo mã PIN chính
function generateMainPinCode() {
  return Math.floor(100000 + Math.random() * 900000); // Tạo mã PIN chính 6 chữ số
}

// Hàm tạo mã PIN phụ 4 chữ số
function generateSecondaryPinCode() {
  return Math.floor(1000 + Math.random() * 9000); // Tạo mã PIN phụ 4 chữ số
}

// Hàm xử lý đăng ký người dùng
// export const registerUser = async (req, res) => {
//   const { email, password, role } = req.body; // Nhận vai trò từ yêu cầu đăng ký

//   // Kiểm tra xem các trường cần thiết đã được cung cấp chưa
//   if (!email || !password || !role) {
//     return res.status(400).json({ message: "Email, password, and role are required" });
//   }

//   try {
//     // Kiểm tra xem người dùng đã tồn tại chưa
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     // Mã hóa mật khẩu
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Tạo mã PIN chính
//     const pin = generateMainPinCode(); // Tạo mã PIN chính 6 chữ số

//     // Tạo người dùng mới
//     const newUser = new User({
//       email,
//       password: hashedPassword,
//       pin,
//       pinSecondary: "", // Mã PIN phụ sẽ được thêm sau
//       pinCreatedAt: Date.now(), // Thời gian tạo mã PIN
//       isActive: false, // Tài khoản chưa được kích hoạt
//       role // Lưu vai trò người dùng
//     });

//     // Lưu người dùng mới vào cơ sở dữ liệu
//     await newUser.save();
//     req.session.email = email; // Lưu email vào phiên
//     req.session.save(); // Lưu phiên
//     console.log("email session: " + email);

//     // Thiết lập tùy chọn email để thông báo mã PIN
//     const mailOptions = {
//       from: process.env.EMAIL_USER, // Sử dụng địa chỉ email từ biến môi trường
//       to: email,
//       subject: "Your Registration PIN",
//       text: `Hello ${email},\n\nThank you for signing up! Your main PIN is: ${pin}.\n\nBest regards,\nSupport Team.`,
//     };

//     // Gửi email chứa mã PIN
//     await transporter.sendMail(mailOptions);
//     res.status(201).json({ message: "Registration successful, PIN has been sent to email", data: newUser });

//   } catch (error) {
//     // Xử lý lỗi trong quá trình đăng ký
//     res.status(500).json({ message: "Error while registering", error: error.message });
//   }
// };
// export const registerUser = async (req, res) => {
//   const { email, password, role, doctorData } = req.body;

//   // Kiểm tra xem các trường cần thiết có được cung cấp không
//   if (!email || !password || !role) {
//     return res
//       .status(400)
//       .json({ message: "Email, password, and role are required" });
//   }

//   try {
//     // Kiểm tra xem người dùng đã tồn tại hay chưa
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     // Mã hóa mật khẩu
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Tạo mã PIN chính
//     const pin = generateMainPinCode(); // 6-digit PIN

//     // Tạo người dùng mới
//     const newUser = new User({
//       email,
//       password: hashedPassword,
//       pin,
//       pinSecondary: "", // Mã PIN thứ hai sẽ được thêm sau
//       pinCreatedAt: Date.now(), // Thời gian tạo PIN
//       isActive: false, // Tài khoản chưa được kích hoạt
//       role, // Lưu vai trò người dùng
//       doctorId: null, // Khởi tạo doctorId là null
//     });

//     // Nếu người dùng có vai trò là "doctor" thì tạo một Doctor rỗng
//     let savedDoctor;
//     if (role === "doctor") {
//       const newDoctor = new Doctor({
//         fullName: doctorData?.fullName || "", // Sử dụng giá trị mặc định nếu không có doctorData
//         numberPhone: doctorData?.numberPhone || null,
//         avatar: doctorData?.avatar || "",
//         address: doctorData?.address || "",
//         birthday: doctorData?.birthday || null,
//         experience: doctorData?.experience || 0,
//         description: doctorData?.description || "",
//         workingtime: doctorData?.workingtime || 0,
//       });
//       savedDoctor = await newDoctor.save(); // Lưu bác sĩ
//       newUser.doctorId = savedDoctor._id; // Gán doctorId cho người dùng từ savedDoctor
//     }

//     // Lưu người dùng mới vào cơ sở dữ liệu
//     await newUser.save();

//     // Lưu email vào session
//     req.session.email = email;
//     req.session.save(); // Lưu session
//     console.log("Email session: " + email);

//     // Đặt tùy chọn email để thông báo mã PIN
//     const mailOptions = {
//       from: process.env.EMAIL_USER, // Email từ biến môi trường
//       to: email,
//       subject: "Your Registration PIN",
//       text: `Hello ${email},\n\nThank you for signing up! Your main PIN is: ${pin}.\n\nBest regards,\nSupport Team.`,
//     };

//     // Gửi email chứa mã PIN
//     await transporter.sendMail(mailOptions);

//     // Sử dụng populate để lấy thông tin bác sĩ nếu cần
//     const populatedUser = await User.findById(newUser._id).populate("doctorId");

//     // Phản hồi với thông báo thành công và dữ liệu người dùng đã populate
//     res.status(201).json({
//       message: "Registration successful, PIN has been sent to email",
//       data: populatedUser,
//     });
//   } catch (error) {
//     // Xử lý lỗi trong quá trình đăng ký
//     res.status(500).json({ message: "Error while registering", error: error.message });
//   }
// };

export const registerUser = async (req, res) => {
  const { email, password, role, additionalData } = req.body;

  // Kiểm tra xem các trường cần thiết có được cung cấp không
  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Email, password, and role are required" });
  }

  try {
    // Kiểm tra xem người dùng đã tồn tại hay chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo mã PIN chính
    const pin = generateMainPinCode();

    // Tạo người dùng mới
    const newUser = new User({
      email,
      password: hashedPassword,
      pin,
      pinSecondary: "",
      pinCreatedAt: Date.now(),
      isActive: false,
      role,
      doctorId: null,
      customerId: null,
      staffId: null,
    });

    let savedData;
    if (role === "doctor") {
      // Tạo bác sĩ
      const newDoctor = new Doctor({
        fullName: additionalData?.fullName || "",
        numberPhone: additionalData?.numberPhone || null,
        avatar: additionalData?.avatar || "",
        address: additionalData?.address || "",
        birthday: additionalData?.birthday || null,
        experience: additionalData?.experience || 0,
        description: additionalData?.description || "",
        workingtime: additionalData?.workingtime || 0,
      });
      savedData = await newDoctor.save();
      newUser.doctorId = savedData._id;
    } else if (role === "customer") {
      // Tạo khách hàng
      const newCustomer = new Customer({
        fullName: additionalData?.fullName || "",
        numberPhone: additionalData?.numberPhone || null,
        address: additionalData?.address || "",
        birthday: additionalData?.birthday || null,
        membershipLevel: additionalData?.membershipLevel || "Bronze",
      });
      savedData = await newCustomer.save();
      newUser.customerId = savedData._id;
    } else if (role === "staff") {
      // Tạo nhân viên
      const newStaff = new Staff({
        fullName: additionalData?.fullName || "",
        numberPhone: additionalData?.numberPhone || null,
        position: additionalData?.position || "",
        address: additionalData?.address || "",
        birthday: additionalData?.birthday || null,
        salary: additionalData?.salary || 0,
      });
      savedData = await newStaff.save();
      newUser.staffId = savedData._id;
    }
    else if (role === "manager") {
      // Tạo nhân viên
      const newManager = new Manager({
        fullName: additionalData?.fullName || "",
        numberPhone: additionalData?.numberPhone || null,
        position: additionalData?.position || "",
        address: additionalData?.address || "",
        birthday: additionalData?.birthday || null,
        salary: additionalData?.salary || 0,
      });
      savedData = await newManager.save();
      newManager.managerId = savedData._id;
    }

    // Lưu người dùng mới
    await newUser.save();

    req.session.email = email;
    req.session.save();

    // Gửi email chứa mã PIN
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Registration PIN",
      text: `Hello ${email},\n\nThank you for signing up! Your main PIN is: ${pin}.\n\nBest regards,\nSupport Team.`,
    };
    await transporter.sendMail(mailOptions);

    const populatedUser = await User.findById(newUser._id)
      .populate("doctorId")
      .populate("customerId")
      .populate("staffId")
      .populate("managerId");

    res.status(201).json({
      message: "Registration successful, PIN has been sent to email",
      data: populatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while registering",
      error: error.message,
    });
  }
};


// Hàm cho phép người dùng đặt mã PIN phụ
export const setSecondaryPin = async (req, res) => {
  const { pinSecondary } = req.body; // Nhận email và mã PIN phụ từ yêu cầu
  // Kiểm tra xem email có trong phiên không
  if (!req.session.email) {
    return res
      .status(400)
      .json({
        message: "Email không tồn tại trong phiên. Vui lòng đăng ký lại.",
      });
  }

  const email = req.session.email;
  // Kiểm tra xem các trường cần thiết đã được cung cấp chưa
  if (!email || !pinSecondary) {
    return res
      .status(400)
      .json({ message: "Email and secondary PIN are required" });
  }

  // Kiểm tra mã PIN phụ có đúng định dạng 4 chữ số không
  if (!/^\d{4}$/.test(pinSecondary)) {
    return res.status(400).json({ message: "Secondary PIN must be 4 digits" });
  }

  try {
    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Mã hóa mã PIN phụ trước khi lưu
    const hashedPin = await bcrypt.hash(pinSecondary, 10); // 10 là số lần băm

    // Cập nhật mã PIN phụ
    user.pinSecondary = hashedPin; // Lưu mã PIN phụ đã được mã hóa vào người dùng
    await user.save(); // Lưu thay đổi vào cơ sở dữ liệu

    // Không gửi email thông báo mã PIN phụ
    res
      .status(200)
      .json({ message: "Secondary PIN has been set successfully." });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error while setting secondary PIN",
        error: error.message,
      });
  }
};