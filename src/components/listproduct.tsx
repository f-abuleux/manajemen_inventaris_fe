import { IDataProduct } from "@/types/types";
import { useEffect, useState } from "react";
import ListProductDetail from "./listProductDetail";


const ListProduct: React.FC = () => {
    const [dataProduct, setDataProduct] = useState<IDataProduct[]>([])

    const fetchProduct = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/product`, {
                method: "GET",
            });
            if (!response.ok) throw new Error("Failed to fetch products")
            const data = await response.json();
            setDataProduct(data.findProduct)
        } catch (error) {
            console.error("Error :", error)
        }
    }

    const handleDelete = (productId: string) => {
        setDataProduct((prev) =>
            prev.filter((product) => product.product_id !== productId)
        )
    }

    const handleUpdate = (updatedProduct: IDataProduct) => {
        setDataProduct((prev) =>
            prev.map((product) =>
                product.product_id === updatedProduct.product_id ? updatedProduct : product
            )
        );
    }

    useEffect(() => {
        fetchProduct()
    }, [])


    return (
        <div className="sm:w-2/3 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-8">
            <div className="space-x-6 mb-6">
                <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 ">List Product</h1>
            </div>
            <div className="flex gap-4 px-4 py-2">
                <p className="w-1/5">Nama Product</p>
                <p className="w-1/5">Total Harga</p>
                <p className="w-1/5">Qty Product</p>
                <p className="w-1/5">Input Masuk</p>
                <p className="w-1/5"></p>
            </div>
            <div className="flex flex-col gap-2 ">
                {
                    dataProduct && dataProduct.map((product, key) => (
                        <ListProductDetail product_id={product.product_id} product_category={product.product_category} product_name={product.product_name} product_price={product.product_price} product_quantity={product.product_quantity} key={key} input_date={product.input_date} onDelete={handleDelete} onUpdate={handleUpdate}/>
                    ))
                }
            </div>
        </div>
    )
}

export default ListProduct