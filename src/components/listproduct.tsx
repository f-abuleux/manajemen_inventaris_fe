import { convertISOToDate, convertPrice, finalPriceProduct } from "@/utils/utils";
import { useEffect, useState } from "react";

interface IDataProduct {
    product_name: string,
    product_id: string,
    product_category: string,
    product_price: number,
    product_quantity: number,
    input_date: string
}

const ListProduct: React.FC = () => {
    const [dataProduct, setDataProduct] = useState<IDataProduct[]>([])

    console.log(dataProduct)

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/product`, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error("Failed to fetch products")
            }
            const data = await response.json();
            setDataProduct(data.findProduct)
        } catch (error) {
            console.error("Error :", error)
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);


    return (
        <div className="sm:w-2/3 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-8">
            <div className="space-x-6 mb-6">
                <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 ">List Product</h1>
            </div>
            <div className="flex gap-4 px-4 py-2">
                <p className="w-1/5">Nama Product</p>
                <p className="w-1/5">Total Harga Product</p>
                <p className="w-1/5">Quantity Product</p>
                <p className="w-1/5">Input Masuk</p>
            </div>
            <div className="flex flex-col gap-2 ">
                {
                    dataProduct && dataProduct.map((product, key) => (
                        <div className="flex gap-2 font-[abel] border-[1px] rounded-2xl p-4" key={key} >

                            <p className="w-1/5">{product.product_name}</p>
                            <p className="w-1/5">Price : {convertPrice(finalPriceProduct(product.product_price, product.product_quantity))}</p>
                            <p className="w-1/5">Quantity : {product.product_quantity}</p>
                            <p className="w-1/5">{convertISOToDate(product.input_date)}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ListProduct