import * as Yup from "yup";

const LoginValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Please Enter your password"),
});

const RegisterValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Please Enter your password")
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

const phoneRegExp = /^(\+62|62)8[1-9][0-9]{6,9}$/;

const ChatValidations = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("Phone Number Required")
    .max(15)
    .min(13)
    .matches(phoneRegExp, "Phone number is not valid, using 62 or +62"),
  message: Yup.string().required("Please Enter your message"),
});

export { LoginValidation, RegisterValidation, ChatValidations };
