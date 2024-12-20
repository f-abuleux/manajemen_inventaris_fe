
import { registerSchema } from "@/schema/schema"
import { initialValues } from "@/types/initialValues"
import { ICreateDataProduct } from "@/types/types"
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik"
import { Mail } from "lucide-react"
import React from "react"

// Extend ImportMeta interface to include env property




const FormRegisterProduct: React.FC = () => {

    const createProduct = async (data: ICreateDataProduct, action: FormikHelpers<ICreateDataProduct>) => {
        const fetchData = await fetch(`${import.meta.env.VITE_API_URL}/product/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (fetchData.ok) {
            action.resetForm();
            alert("Product created seuccesfully")
        } else {
            alert("Failed to create product");
        }
    }

    return (
        <div className='sm:w-1/6 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-8'>
            <div className='space-y-6'>
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Form</h1>
                </div>
                <p className="text-gray-500 dark:text-gray-400">Input data product disini</p>
                <Formik
                    initialValues={initialValues}
                    validationSchema={registerSchema}
                    onSubmit={(values, action) => {
                        createProduct(values, action)
                        console.log(values)
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className='space-y-6'>
                            <div className='space-y-2'>
                                <div className='relative'>
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Field name="product_name" type="text" className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500  dark:text-black transition-all duration-300" placeholeder="Piring" />
                                    <ErrorMessage name="product_name" component={'div'} className="absolute text-[12px]" />
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <div className='relative'>
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Field as="select" name="product_category" className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black transition-all duration-300">
                                        <option value="" label="Select category" />
                                        <option value="Elektronik" label="Elektronik" />
                                        <option value="Pakaian" label="Pakaian" />
                                        <option value="Makanan" label="Makanan" />
                                        <option value="Lainnya" label="Lainnya" />
                                    </Field>
                                    <ErrorMessage name="product_category" component={'div'} className="absolute text-[12px]" />
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <div className='relative'>
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Field name="product_quantity" type="number" className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500  dark:text-black transition-all duration-300" placeholeder="Piring" min={0} />
                                    <ErrorMessage name="product_quantity" component={'div'} className="absolute text-[12px]" />
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <div className='relative'>
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Field name="product_price" type="number" className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500  dark:text-black transition-all duration-300" placeholeder="Piring" min={0} />
                                    <ErrorMessage name="product_price" component={'div'} className="absolute text-[12px]" />
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <div className='relative'>
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Field name="input_date" type="date" className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black transition-all duration-300" max={new Date().toISOString().split("T")[0]} />
                                    <ErrorMessage name="input_date" component={'div'} className="absolute text-[12px]" />
                                </div>
                            </div>
                            <button type="submit" className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300">Input Product</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default FormRegisterProduct