export default class Product {
    public id: number;
    public categoryId: number;
    public name: string;
    public price_old: number;
    public price_new: number;
    public product_image: string;
    public quantity: number;
    public description: string;

    constructor(
        categoryId: number,
        id: number,
        name: string,
        price_old: number,
        price_new: number,
        product_image: string,
        quantity: number,
        description: string
    ) {
        this.id = id;
        this.categoryId = categoryId;
        this.name = name;
        this.price_old = price_old;
        this.price_new = price_new;
        this.product_image = product_image;
        this.quantity = quantity;
        this.description = description;
    }
}
