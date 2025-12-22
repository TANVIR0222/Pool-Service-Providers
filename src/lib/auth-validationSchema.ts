import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .trim()
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .trim()
    .required("Password is required"),
});

//  Yup validation schema
export const registerValidationSchema = Yup.object().shape({
  full_name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  checkbox: Yup.boolean().oneOf(
    [true],
    "Please accept the Terms of Service and Privacy Policy"
  ),
});

export const resetPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .trim()
    .required("Email is required"),
});

export const createNewPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const changePasswordalidationSchema = Yup.object().shape({
  current_password: Yup.string()
    .required("Current password is required")
    .min(8, "Password must be at least 8 characters"),

  password: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters"),

  password_confirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
