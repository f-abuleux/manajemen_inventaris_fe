import * as yup from "yup";

export const registerSchema = yup.object({
    product_name : yup.string().required("Product name is required"),
    product_category : yup.string().required("Product category must be choosed"),
    product_quantity : yup.number().required("Product is required").min(1, "Product quantity must be atleast 1"),
    product_price: yup.number().required("Product price is required").min(100, "Product price must be atleast Rp. 100"),
    input_date : yup.date().required("Input date is required")
})