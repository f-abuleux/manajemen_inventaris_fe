import * as yup from "yup";

export const registerSchema = yup.object({
    product_name : yup.string().required(),
    product_category : yup.string().required(),
    product_quantity : yup.number().required(),
    product_price: yup.number().required(),
    input_date : yup.date().required()
})