export const orders = [
  {
    id: "1", // ✅ IMPORTANT: matches your URL (/orders/1)
    status: "Delivered",
    trackingStage: 4, // (0–5 based on your steps)
    date: "today",
    category: "today",
    address: "Hyderabad, India",
    totalAmount: 70998,
    items: [
      {
        id: "p1",
        name: "iPhone 14",
        description: "128GB Blue",
        price: 70998,
      },
    ],
  },
  {
    id: "2",
    status: "Shipped",
    trackingStage: 3,
    date: "active",
    category: "active",
    address: "Hyderabad, India",
    totalAmount: 2499,
    items: [
      {
        id: "p2",
        name: "Nike Shoes",
        description: "Running shoes",
        price: 2499,
      },
    ],
  },
  {
    id: "3",
    status: "Processing",
    trackingStage: 1,
    date: "active",
    category: "active",
    address: "Hyderabad, India",
    totalAmount: 999,
    items: [
      {
        id: "p3",
        name: "T-Shirt",
        description: "Black XL",
        price: 999,
      },
    ],
  },
  {
    id: "4",
    status: "Delivered",
    trackingStage: 5,
    date: "past",
    category: "past",
    address: "Hyderabad, India",
    totalAmount: 1499,
    items: [
      {
        id: "p4",
        name: "Headphones",
        description: "Noise Cancelling",
        price: 1499,
      },
    ],
  },
];