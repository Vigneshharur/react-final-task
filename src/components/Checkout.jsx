import { Field, Form, FormikProvider, useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Checkout() {
  const credential = useSelector((state) => state.auth.credential);
  const navigate = useNavigate();
  useEffect(() => {
    if (!credential.user) {
      navigate("/login");
      return;
    }
    // if (!checkValidLogin()) {
    //   navigate("/logout");
    //   return;
    // }
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      address1: "",
      address2: "",
      pincode: "",
      payment: "",
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Please Enter name"),
      mobile: Yup.string().required("Please Enter mobile"),
      address1: Yup.string().required("Please Enter address1"),
      address2: Yup.string().required("Please Enter address2"),
      pincode: Yup.string().required("Please Enter Pincode"),
      payment: Yup.string()
        .required("Please select payment option")
        .oneOf(
          ["UPI", "Credit/Debit", "Net banking", "Cash on delivery"],
          "Select valid option"
        ),
    }),
  });

  const handleSubmit = (values) => {
    navigate("/confirm-order");
  };

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit} className="add-form">
        <h3>SHIPPING DETAILS</h3>
        <label>Name:</label>
        <br />
        <Field
          id="name"
          type="text"
          name="name"
          placeholder="Enter full name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <br />
        {formik.touched.name && formik.errors.name ? (
          <span className="error">{formik.errors.name}</span>
        ) : null}
        <br />
        <label>Mobile Number:</label>
        <br />
        <Field
          id="mobile"
          type="number"
          name="mobile"
          placeholder="Enter mobile"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.mobile}
        />
        <br />
        {formik.touched.mobile && formik.errors.mobile && (
          <span className="error">{formik.errors.mobile}</span>
        )}
        <br />
        <label>Address Line 1</label>
        <br />
        <Field
          id="address1"
          type="text"
          name="address1"
          placeholder="Enter address1"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address1}
        />
        <br />
        {formik.touched.address1 && formik.errors.address1 ? (
          <span className="error">{formik.errors.address1}</span>
        ) : null}
        <br />
        <label>Address Line 2:</label>
        <br />
        <Field
          id="address2"
          type="text"
          name="address2"
          placeholder="Enter Available address2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address2}
        />
        <br />
        {formik.touched.address2 && formik.errors.address2 ? (
          <span className="error">{formik.errors.address2}</span>
        ) : null}
        <br />
        <label>Pincode:</label>
        <br />
        <Field
          id="pincode"
          type="text"
          name="pincode"
          placeholder="Enter Postal code"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.pincode}
        />
        <br />
        {formik.touched.pincode && formik.errors.pincode ? (
          <span className="error">{formik.errors.pincode}</span>
        ) : null}
        <br />
        <label>Payment mode:</label>
        <br />
        <select id="payment" name="payment" onChange={formik.handleChange}>
          <option value="">Select payment mode</option>
          <option>UPI</option>
          <option>Debit/Credit card</option>
          <option>Net banking</option>
          <option>Cash on delivery</option>
        </select>
        <br />
        {formik.touched.payment && formik.errors.payment ? (
          <span className="error">{formik.errors.payment}</span>
        ) : null}
        <br />
        <br />

        <button type="submit">Checkout</button>
      </Form>
    </FormikProvider>
  );
}
