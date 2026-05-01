export const orders = [
  {
    id: "1",
    createdAt: "23 Apr 2026",

    status: "Delivered",
    trackingStage: 5,

    eta: "Arrived on 26 Apr 2026",
    courier: "Delhivery",
    trackingId: "DL123456789",

    timeline: [
      { step: "ordered", date: "23 Apr 2026" },
      { step: "packed", date: "24 Apr 2026" },
      { step: "in transit", date: "25 Apr 2026" },
      { step: "shipped", date: "25 Apr 2026" },
      { step: "out for delivery", date: "26 Apr 2026" },
      { step: "delivered", date: "26 Apr 2026" },
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
        images: ["/img1.png", "/img2.png", "/img3.png"],
      },
    ],

    reviews: [
      { rating: 5, text: "Amazing phone, worth every rupee!" },
      { rating: 4, text: "Camera is great, battery could be better." },
      { rating: 5, text: "Super smooth performance." },
    ],
  },

  {
    id: "2",
    createdAt: "24 Apr 2026",

    status: "Out for delivery",
    trackingStage: 4,

    eta: "Arriving Today",
    courier: "BlueDart",
    trackingId: "BD987654321",

    timeline: [
      { step: "ordered", date: "24 Apr 2026" },
      { step: "packed", date: "25 Apr 2026" },
      { step: "in transit", date: "25 Apr 2026" },
      { step: "shipped", date: "26 Apr 2026" },
      { step: "out for delivery", date: "26 Apr 2026" },
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
        images: ["/shoe1.png", "/shoe2.png"],
      },
    ],

    reviews: [
      { rating: 5, text: "Very comfortable shoes!" },
      { rating: 4, text: "Good for running." },
    ],
  },

  {
    id: "3",
    createdAt: "25 Apr 2026",

    status: "Shipped",
    trackingStage: 3,

    eta: "Arriving Tomorrow",
    courier: "Ekart",
    trackingId: "EK456123789",

    timeline: [
      { step: "ordered", date: "25 Apr 2026" },
      { step: "packed", date: "25 Apr 2026" },
      { step: "in transit", date: "26 Apr 2026" },
      { step: "shipped", date: "26 Apr 2026" },
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
        images: ["/tshirt1.png", "/tshirt2.png"],
      },
    ],

    reviews: [
      { rating: 4, text: "Nice fabric." },
      { rating: 3, text: "Size runs a bit small." },
    ],
  },

  {
    id: "4",
    createdAt: "26 Apr 2026",

    status: "In transit",
    trackingStage: 2,

    eta: "Arriving in 2 days",
    courier: "XpressBees",
    trackingId: "XB741258963",

    timeline: [
      { step: "ordered", date: "26 Apr 2026" },
      { step: "packed", date: "26 Apr 2026" },
      { step: "in transit", date: "27 Apr 2026" },
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
        images: ["/headphone1.png", "/headphone2.png"],
      },
    ],

    reviews: [
      { rating: 5, text: "Sound quality is excellent!" },
      { rating: 4, text: "Good noise cancellation." },
    ],
  },
];