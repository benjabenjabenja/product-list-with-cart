import { Product } from "@/App";
import { getProductsService } from "@/services/ProductService";
import { useEffect, useState } from "react";

const useProducts = () => {
    const [products, setProducs] = useState<Product[] | null>(null);
    const [loadingProducts, setLoadingProducts] = useState<boolean>(false);

    /**
     * Load data 
     */
    useEffect(
        () => {
            const loadData = async () => {
                await getProducts();
            }
            loadData();
        }, []
    )
    /**
     * Getter of product array.
     */
    const getProducts = async () => {
        setLoadingProducts(true);
        try {
            const products = await getProductsService();
            if(!!products){
                setProducs(products);
                setLoadingProducts(false)
            } 
        } catch(error) {
            setLoadingProducts(false)
            throw new Error('Canot GET products. try later')
        }
    }

    return {
        products,
        loadingProducts
    }
}

export default useProducts;