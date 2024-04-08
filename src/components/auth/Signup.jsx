import { Field, Form, FormikProvider, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { generateAuthToken } from "../../http";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userActions } from "../../store/user-slice";

export default function Signup() {
  const navigate = useNavigate();

  const credential = useSelector((state) => state.auth.credential);
  useEffect(() => {
    if (credential.user) {
      navigate("/");
      return;
    }
  });
  const users = useSelector((state) => state.user.users);
  const userEmails = users.map((user) => user.email);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      fname: "",
      lname: "",
      password: "",
      confirm: "",
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Please enter email")
        .email()
        .test("unique-email", "This email is already in use", function (value) {
          const { path, createError } = this;
          if (userEmails.includes(value)) {
            return createError({
              path,
              message: "This email is already in use",
            });
          }
          return true;
        }),
      fname: Yup.string().required("Please enter first name"),
      lname: Yup.string().required("Please enter last name"),
      password: Yup.string()
        .required("Please enter password")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-z]/, "password must contain at least 1 lower case letter")
        .matches(/[A-Z]/, "password must contain at least 1 upper case letter")
        .matches(/\d/, "password must contain at least 1 number")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "password must contain at least 1 special character"
        ),
      confirm: Yup.string()
        .required("Please enter confirm password")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
  });

  function handleSubmit(values) {
    const id = Math.random();
    const newUser = {
      id,
      email: values.email,
      fname: values.fname,
      lname: values.lname,
      password: values.password,
      admin: false,
    };
    dispatch(userActions.addUser(newUser));
    dispatch(addAuth(id, newUser.admin));
    navigate("/");
  }

  return (
    <FormikProvider value={formik}>
      <Form className="add-form">
        <h3>Create Account</h3>
        <label>Email:</label>
        <br />
        <Field name="email" type="text" placeholder="Enter Email" />
        <br />
        {(formik.touched.email && formik.errors.email) ||
        (formik.errors.email && formik.errors.email.endsWith("use")) ? (
          <span className="error">{formik.errors.email}</span>
        ) : null}
        <br />
        <label>First Name:</label>
        <br />
        <Field name="fname" type="text" placeholder="Enter First Name" />
        <br />
        {formik.touched.fname && formik.errors.fname ? (
          <span className="error">{formik.errors.fname}</span>
        ) : null}
        <br />
        <label>Last Name:</label> <br />
        <Field name="lname" type="text" placeholder="Enter Last Name" /> <br />
        {formik.touched.lname && formik.errors.lname ? (
          <span className="error">{formik.errors.lname}</span>
        ) : null}
        <br />
        <label>Password:</label> <br />
        <Field name="password" type="password" placeholder="Enter Password" />
        <br />
        {formik.touched.password && formik.errors.password ? (
          <span className="error">{formik.errors.password}</span>
        ) : null}
        <br />
        <label>Confirm Password:</label> <br />
        <Field name="confirm" type="password" placeholder="Enter Password" />
        <br />
        {formik.touched.confirm && formik.errors.confirm ? (
          <>
            <span className="error">{formik.errors.confirm}</span> <br />
          </>
        ) : null}
        <br />
        <button type="submit">Sign Up</button>
        <br />
        <br />
        <p style={{ marginLeft: "12%" }}>
          Continue without signup{" "}
          <Link
            style={{
              color: "blue",
              padding: "0px",
              textDecoration: "underline",
              fontSize: "16px",
            }}
            to="/"
          >
            Home
          </Link>
        </p>
      </Form>
    </FormikProvider>
  );
}
