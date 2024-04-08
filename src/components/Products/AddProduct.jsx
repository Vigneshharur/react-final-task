import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../store/product-slice";
import { Field, Form, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { checkValidLogin } from "../../http";

export default function AddProduct() {
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
    if (!credential.isAdmin) {
      navigate("/");
      return;
    }
  });
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      quantity: "",
      madeIn: "",
      image: "",
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Please Enter Title"),
      description: Yup.string().required("Please Enter Description"),
      price: Yup.string().required("Please Enter Price"),
      quantity: Yup.string().required("Please Enter Available Quantity"),
      madeIn: Yup.string().required("Please Enter Made In"),
      image: Yup.string().required("Please Enterimage URL"),
    }),
  });

  const handleSubmit = ({
    title,
    description,
    price,
    quantity,
    madeIn,
    image,
  }) => {
    const id = Math.random();
    const product = {
      id,
      title,
      description,
      price,
      quantity,
      madeIn,
      addedTime: Date.now(),
      image,
    };
    try {
      dispatch(productActions.addProduct(product));
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        className="add-form"
      >
        <h3>ADD NEW PRODUCT</h3>
        <label>Title:</label>
        <br />
        <Field
          id="title"
          type="text"
          name="title"
          placeholder="Enter title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        <br />
        {formik.touched.title && formik.errors.title ? (
          <span className="error">{formik.errors.title}</span>
        ) : null}
        <br />
        <label>Description:</label>
        <br />
        <Field
          id="description"
          type="text"
          name="description"
          placeholder="Enter Description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        <br />
        {formik.touched.description && formik.errors.description && (
          <span className="error">{formik.errors.description}</span>
        )}
        <br />
        <label>Price:</label>
        <br />
        <Field
          id="price"
          type="number"
          name="price"
          placeholder="Enter price"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
        <br />
        {formik.touched.price && formik.errors.price ? (
          <span className="error">{formik.errors.price}</span>
        ) : null}
        <br />
        <label>Available Quantity:</label>
        <br />
        <Field
          id="quantity"
          type="number"
          name="quantity"
          placeholder="Enter Available Quantity"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.quantity}
        />
        <br />
        {formik.touched.quantity && formik.errors.quantity ? (
          <span className="error">{formik.errors.quantity}</span>
        ) : null}
        <br />
        <label>Made In:</label>
        <br />
        <Field
          id="madeIn"
          type="text"
          name="madeIn"
          placeholder="Enter Made In"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.madeIn}
        />
        <br />
        {formik.touched.madeIn && formik.errors.madeIn ? (
          <span className="error">{formik.errors.madeIn}</span>
        ) : null}
        <br />
        <label>Image URL:</label>
        <br />
        <Field
          id="image"
          type="text"
          name="image"
          placeholder="Enter Image URL"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.image}
        />
        <br />
        {formik.touched.image && formik.errors.image ? (
          <span className="error">{formik.errors.image}</span>
        ) : null}
        <br />
        <br />
        <button type="submit">Add</button>
      </Form>
    </FormikProvider>
  );
}
