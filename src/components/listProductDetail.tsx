import { registerSchema } from "@/schema/schema";
import { ICreateDataProduct, IDataProduct } from "@/types/types";
import { convertISOToDate, convertPrice, finalPriceProduct } from "@/utils/utils";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";

export default function ListProductDetail({ product_name, product_quantity, product_price, product_category, input_date, key, product_id, onDelete, onUpdate }: { product_name: string, product_quantity: number, product_price: number, product_category: string, input_date: string, key: number, product_id: string, onDelete: (id: string) => void, onUpdate : (product : IDataProduct) => void}) {
    const [modal, setModal] = useState<boolean>(true)

    const deleteDataProduct = async () => {
        const fetchData = await fetch(`${import.meta.env.VITE_API_URL}/product/delete/${product_id}`, {
            method: "DELETE"
        });
        console.log(fetchData)
        alert("Product successfully deleted")
        onDelete(product_id)
    }

    const updateDataProduct = async (data: ICreateDataProduct, action: FormikHelpers<ICreateDataProduct>) => {
        const fetchData = await fetch(`${import.meta.env.VITE_API_URL}/product/update/${product_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (fetchData.ok) {
            alert("Product updated seuccesfully")
            setModal(false)
            onUpdate({ ...data, product_id })
        } else {
            alert("Failed to update product");
        }
    }

    const handleModal = () => {
        setModal(!modal)
    }

    useEffect(() => {
        handleModal()
    }, [])

    const initialUpdateValues = {
        product_name: product_name,
        product_category: product_category,
        product_quantity: product_quantity,
        product_price: product_price,
        input_date: input_date
    }

    return (
        <div className="flex flex-wrap gap-2 font-[abel] border-[1px] rounded-2xl p-4 items-center" key={key} >
            <p className="w-1/5">{product_name}</p>
            <p className="w-1/5 text-[14px]">{convertPrice(finalPriceProduct(product_price, product_quantity))}</p>
            <p className="w-1/5">{product_quantity}</p>
            <p className="w-1/5">{convertISOToDate(input_date)}</p>
            <button onClick={deleteDataProduct} className="hover:bg-black hover:text-white duration-300 p-1 rounded-sm text-[10px]">DELETE</button>
            <button onClick={handleModal} className="hover:bg-black hover:text-white duration-300 p-1 rounded-sm text-[10px]">UPDATE</button>
            {
                modal && (
                    <div className="absolute right-10 h-16 border-[1px] rounded-md">
                        <Formik
                            initialValues={initialUpdateValues}
                            validationSchema={registerSchema}
                            onSubmit={(values, action) => {
                                updateDataProduct(values, action)
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className="flex flex-col gap-2 p-2 backdrop-blur-sm">
                                    <div>
                                        <p className="font-bold">Product Name</p>
                                        <Field name="product_name" type="text" />
                                        <ErrorMessage name="product_name" component={'div'} className="absolute text-[12px]" />
                                    </div>
                                    <div>
                                        <p className="font-bold">Product Category</p>
                                        <Field as="select" name="product_category" >
                                            <option value="" label="Select category" />
                                            <option value="Elektronik" label="Elektronik" />
                                            <option value="Pakaian" label="Pakaian" />
                                            <option value="Makanan" label="Makanan" />
                                            <option value="Lainnya" label="Lainnya" />
                                        </Field>
                                        <ErrorMessage name="product_category" component={'div'} className="absolute text-[12px]" />
                                    </div>
                                    <div>
                                        <p className="font-bold">Product Quantity</p>
                                        <Field name="product_quantity" type="number" min={0} />
                                        <ErrorMessage name="product_quantity" component={'div'} className="absolute text-[12px]" />
                                    </div>
                                    <div>
                                        <p className="font-bold">Product Price</p>
                                        <Field Field name="product_price" type="number" min={0} />
                                        <ErrorMessage name="product_price" component={'div'} className="absolute text-[12px]" />
                                    </div>
                                    <div>
                                        <p className="font-bold">Input Date</p>
                                        <Field name="input_date" type="date" max={new Date().toISOString().split("T")[0]} />
                                        <ErrorMessage name="input_date" component={'div'} className="absolute text-[12px]" />
                                    </div>
                                    <button type="submit" className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300">Input Product</button>
                                    <button onClick={handleModal}>Cancel</button>

                                </Form>
                            )}

                        </Formik>
                    </div>
                )
            }
        </div>
    )
}