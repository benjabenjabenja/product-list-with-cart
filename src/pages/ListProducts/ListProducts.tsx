import { Product } from "@/App";
import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";

const CardItem: FC<{item: Product}> = ({ item }) => {
    return (
        <Card>
            <CardContent>
                <p>{item? '' : "-"}</p>
            </CardContent>
        </Card>
    )
}

const ListProducts: FC<{ productList: Product[] | null }> = ({ productList }) => {

    return (
        <>
            {Array.isArray(productList) && productList.length > 0 ?
                (productList?.map( (item, i) => (<CardItem item={item} key={i} />) )) :
                <div style={{ textAlign: 'center', padding: '10rem' }}> No prdocuts to show. </div>   
            }
        </>
    )
}

export default ListProducts;