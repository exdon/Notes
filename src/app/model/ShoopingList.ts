export class ShoopingList {
    id: string;
    listName: string;
    categories: Array<Categories>;
}

export class Categories {
    categoryid: string;
    categoryName: string;
    products: Array<Products>;
}

export class Products {
    productId: string;
    productName: string;
    productQuantity: string;
    productUnit: string;
    productPrice?: string;
    productPicture?: string;
    productNote?: string;
}
