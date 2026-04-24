export const orders = [
  {
    id: "ord_001",
    status: "Delivered",
    trackingStage: 5, // ✅ delivered
    date: "April 23, 2026",
    category: "today",
    address: "Hyderabad, India",
    totalAmount: 70998,
    items: [
      {
        id: "p1",
        name: "iPhone 14",
        description: "128GB Blue",
        price: 69999,
      },
      {
        id: "p2",
        name: "Case Cover",
        description: "Silicone Black",
        price: 999,
      },
    ],
  },
  {
    id: "ord_002",
    status: "Shipped",
    trackingStage: 3, // ✅ shipped
    date: "April 22, 2026",
    category: "active",
    address: "Hyderabad, India",
    totalAmount: 2499,
    items: [
      {
        id: "p3",
        name: "Nike Shoes",
        description: "Running shoes",
        price: 2499,
      },
    ],
  },
  {
    id: "ord_003",
    status: "Processing",
    trackingStage: 1, // ✅ packed stage
    date: "April 21, 2026",
    category: "active",
    address: "Hyderabad, India",
    totalAmount: 799,
    items: [
      {
        id: "p4",
        name: "T-Shirt",
        description: "Black XL",
        price: 799,
      },
    ],
  },
  {
    id: "ord_004",
    status: "Delivered",
    trackingStage: 5, // ✅ delivered
    date: "April 18, 2026",
    category: "past",
    address: "Hyderabad, India",
    totalAmount: 1299,
    items: [
      {
        id: "p5",
        name: "Keyboard",
        description: "Mechanical RGB",
        price: 1299,
      },
    ],
  },
];