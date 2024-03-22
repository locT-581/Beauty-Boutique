export const User = {
  uid: "",
  email: "",
  fullName: "",
  phoneNumber: "",
  address: "",
  city: "",
  district: "",
  cart: [],
};
export const Product = {
  name: "",
  description: "",
  price: 0,
  imageUrls: [], // Many images of product
  ingredients: [],
  category: "",
  stock: 0,
  avatar: "",
  displayMode: "",
  soldQuantity: 0,
};
export const Blog = {
  title: "",
  content: "",
  voucher: [],
  createAt: "",
  lastUpdate: "",
  status: "",
  likes: 0,
  views: 0,
  avatar: "",
  displayMode: "",
};

export const Flower = {
  id: "",
  name: "",
  description: "",
  imageUrls: [],
};

export const Bill = {
  id: "",
  uid: "aVuRI2TJ9KOGvVAM7G5wsRa06z42",
  shippingInfo: {
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    time,
  },
  products: [{ name: "07UlQN4X5xlNWo6WZjbX", quantity: 2 }],
  total: "674000",
  createAt: "",
  status: "awaiting-fulfillment",
  paymentStatus: "wait-payment",
  paymentMethod: "cod",
  note: "",
  message: "",
  voucher: "",
};
