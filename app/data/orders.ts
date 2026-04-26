export const orders = [
  {
    id: "1",
    status: "Delivered",
    trackingStage: 5,

    eta: "Arrived on Apr 26",
    courier: "Delhivery",
    trackingId: "DL123456789",

    timeline: [
      { step: "ordered", date: "Apr 23" },
      { step: "packed", date: "Apr 24" },
      { step: "in transit", date: "Apr 25" },
      { step: "shipped", date: "Apr 25" },
      { step: "out for delivery", date: "Apr 26" },
      { step: "delivered", date: "Apr 26" },
    ],

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
    status: "Out for delivery",
    trackingStage: 4,

    eta: "Arriving Today",
    courier: "BlueDart",
    trackingId: "BD987654321",

    timeline: [
      { step: "ordered", date: "Apr 24" },
      { step: "packed", date: "Apr 25" },
      { step: "in transit", date: "Apr 25" },
      { step: "shipped", date: "Apr 26" },
      { step: "out for delivery", date: "Apr 26" },
      { step: "delivered", date: "" },
    ],

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
    status: "Shipped",
    trackingStage: 3,

    eta: "Arriving Tomorrow",
    courier: "Ekart",
    trackingId: "EK456123789",

    timeline: [
      { step: "ordered", date: "Apr 25" },
      { step: "packed", date: "Apr 25" },
      { step: "in transit", date: "Apr 26" },
      { step: "shipped", date: "Apr 26" },
      { step: "out for delivery", date: "" },
      { step: "delivered", date: "" },
    ],

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
    status: "In transit",
    trackingStage: 2,

    eta: "Arriving in 2 days",
    courier: "XpressBees",
    trackingId: "XB741258963",

    timeline: [
      { step: "ordered", date: "Apr 26" },
      { step: "packed", date: "Apr 26" },
      { step: "in transit", date: "Apr 27" },
      { step: "shipped", date: "" },
      { step: "out for delivery", date: "" },
      { step: "delivered", date: "" },
    ],

    category: "active",
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