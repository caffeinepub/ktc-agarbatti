import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export interface Inquiry {
    name: string;
    email: string;
    message: string;
}
export interface Product {
    id: bigint;
    inStock: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    price: bigint;
}
export interface Testimonial {
    text: string;
    author: string;
    rating: bigint;
}
export interface backendInterface {
    addProduct(product: Product): Promise<void>;
    addTestimonial(testimonial: Testimonial): Promise<void>;
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    deleteProduct(productId: bigint): Promise<void>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getAllProducts(): Promise<Array<Product>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getCart(): Promise<Array<CartItem>>;
    removeFromCart(productId: bigint): Promise<void>;
    submitInquiry(inquiry: Inquiry): Promise<void>;
    updateCartQuantity(productId: bigint, quantity: bigint): Promise<void>;
    updateProduct(product: Product): Promise<void>;
}
