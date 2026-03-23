import List "mo:core/List";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  // Product Types and Catalog
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    imageUrl : Text;
    inStock : Bool;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };
  };

  let products = Map.empty<Nat, Product>();

  // Seed default products
  do {
    let seedProducts : [Product] = [
      {
        id = 1;
        name = "Rose Agarbatti";
        category = "Agarbatti";
        description = "Delicate rose fragrance crafted from pure rose petals. Perfect for morning prayers and meditation.";
        price = 12000;
        imageUrl = "/assets/generated/product-rose-agarbatti.dim_400x400.jpg";
        inStock = true;
      },
      {
        id = 2;
        name = "Chandan Agarbatti";
        category = "Agarbatti";
        description = "Rich sandalwood aroma derived from aged chandan. Evokes serenity and temple tranquility.";
        price = 15000;
        imageUrl = "/assets/generated/product-chandan-agarbatti.dim_400x400.jpg";
        inStock = true;
      },
      {
        id = 3;
        name = "Guggal Dhup Sticks";
        category = "Dhup Sticks";
        description = "Sacred guggal resin dhup sticks for deep purification rituals and spiritual ceremonies.";
        price = 9500;
        imageUrl = "/assets/generated/product-guggal-dhup.dim_400x400.jpg";
        inStock = true;
      },
      {
        id = 4;
        name = "Sambrani Cups";
        category = "Sambrani";
        description = "Traditional sambrani cups with aromatic loban smoke — ideal for evening aarti and blessing rituals.";
        price = 8500;
        imageUrl = "/assets/generated/product-sambrani.dim_400x400.jpg";
        inStock = true;
      },
    ];
    for (p in seedProducts.values()) {
      products.add(p.id, p);
    };
  };

  // Cart Types
  type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  let carts = Map.empty<Principal, List.List<CartItem>>();

  // Inquiry Types
  type Inquiry = {
    name : Text;
    email : Text;
    message : Text;
  };

  let inquiries = Map.empty<Nat, Inquiry>();
  var nextInquiryId = 0;

  // Testimonial Types
  type Testimonial = {
    author : Text;
    text : Text;
    rating : Nat;
  };

  let testimonials = Map.empty<Nat, Testimonial>();
  var nextTestimonialId = 0;

  public type ContactInformation = {
    address : Text;
    phone : Text;
    email : Text;
  };

  // Product Catalog Functions
  public query func getAllProducts() : async [Product] {
    let arr = products.values().toArray();
    arr.sort();
  };

  public shared func addProduct(product : Product) : async () {
    if (products.containsKey(product.id)) { Runtime.trap("This product already exists.") };
    products.add(product.id, product);
  };

  public shared func updateProduct(product : Product) : async () {
    if (not products.containsKey(product.id)) { Runtime.trap("This product does not exist.") };
    products.add(product.id, product);
  };

  public shared func deleteProduct(productId : Nat) : async () {
    if (not products.containsKey(productId)) { Runtime.trap("This product does not exist.") };
    products.remove(productId);
  };

  // Cart Functions
  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    if (quantity == 0) { Runtime.trap("Quantity must be greater than 0.") };
    let cart = switch (carts.get(caller)) {
      case (null) { List.empty<CartItem>() };
      case (?cart) { cart };
    };
    cart.add({ productId; quantity });
    carts.add(caller, cart);
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    let cart = switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart does not exist.") };
      case (?cart) { cart };
    };
    let newCart = List.empty<CartItem>();
    for (item in cart.values()) {
      if (item.productId != productId) {
        newCart.add(item);
      };
    };
    carts.add(caller, newCart);
  };

  public shared ({ caller }) func updateCartQuantity(productId : Nat, quantity : Nat) : async () {
    if (quantity == 0) { Runtime.trap("Quantity must be greater than 0.") };
    let cart = switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart does not exist.") };
      case (?cart) { cart };
    };
    let newCart = List.empty<CartItem>();
    for (item in cart.values()) {
      if (item.productId == productId) {
        newCart.add({ productId; quantity });
      } else {
        newCart.add(item);
      };
    };
    carts.add(caller, newCart);
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart.toArray() };
    };
  };

  // Inquiry Functions
  public shared func submitInquiry(inquiry : Inquiry) : async () {
    inquiries.add(nextInquiryId, inquiry);
    nextInquiryId += 1;
  };

  public query func getAllInquiries() : async [Inquiry] {
    inquiries.values().toArray();
  };

  // Testimonial Functions
  public shared func addTestimonial(testimonial : Testimonial) : async () {
    testimonials.add(nextTestimonialId, testimonial);
    nextTestimonialId += 1;
  };

  public query func getAllTestimonials() : async [Testimonial] {
    testimonials.values().toArray();
  };
};
