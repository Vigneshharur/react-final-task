import { Field, Form, FormikProvider, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { generateAuthToken } from "../../http";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { authActions } from "../../store/auth-slice";
import { addAuth } from "../../store/auth-action";

export default function Login() {
  const navigate = useNavigate();

  const credential = useSelector((state) => state.auth.credential);
  useEffect(() => {
    if (credential.user) {
      navigate("/");
      return;
    }
  });

  const [error, setError] = useState("");
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Please enter email")
        .email("Email must be a valid email"),
      password: Yup.string().required("Please enter password"),
    }),
  });

  useEffect(() => {
    if (formik.errors.email || formik.errors.password) {
      setError(undefined);
    }
  }, [formik.errors]);

  function handleSubmit(values) {
    const user = users.filter((user) => user.email === values.email);
    if (user.length === 0) {
      setError("Invalid user email");
      return;
    } else {
      if (user[0].password !== values.password) {
        setError("Invalid password");
        return;
      }
    }
    dispatch(addAuth(user[0].id, user[0].admin));
    navigate("/");
  }

  return (
    <FormikProvider value={formik}>
      <Form className="add-form">
        <h3 style={{ paddingLeft: "50px" }}>Login</h3>
        <label>Email:</label>
        <br />
        <Field name="email" type="text" placeholder="Enter Email" />
        <br />
        {formik.touched.email && formik.errors.email ? (
          <span className="error">{formik.errors.email}</span>
        ) : null}
        <br />
        <label>Password:</label> <br />
        <Field name="password" type="password" placeholder="Enter Password" />
        <br />
        {formik.touched.password && formik.errors.password ? (
          <>
            <span className="error">{formik.errors.password}</span>
            <br />
          </>
        ) : null}
        {error && (
          <>
            <span className="error">{error}</span>
            <br />
          </>
        )}
        <br />
        <button type="submit">Login</button>
        <br />
        <br />
        <p style={{ marginLeft: "12%" }}>
          Continue without Login
          <Link
            style={{
              color: "blue",
              padding: "5px",
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

export function loginLoader() {}
