import Array "mo:core/Array";
import Iter "mo:core/Iter";
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

  let products = Map.empty<Nat, Product>();

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

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };
  };

  // Product Catalog Functions
  public query func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public shared ({ caller }) func addProduct(product : Product) : async () {
    if (products.containsKey(product.id)) { Runtime.trap("This product already exists.") };
    products.add(product.id, product);
  };

  public shared ({ caller }) func updateProduct(product : Product) : async () {
    if (not products.containsKey(product.id)) { Runtime.trap("This product does not exist.") };
    products.add(product.id, product);
  };

  public shared ({ caller }) func deleteProduct(productId : Nat) : async () {
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
  public shared ({ caller }) func submitInquiry(inquiry : Inquiry) : async () {
    inquiries.add(nextInquiryId, inquiry);
    nextInquiryId += 1;
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.values().toArray();
  };

  // Testimonial Functions
  public shared ({ caller }) func addTestimonial(testimonial : Testimonial) : async () {
    testimonials.add(nextTestimonialId, testimonial);
    nextTestimonialId += 1;
  };

  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    testimonials.values().toArray();
  };
};
