// Header in navigation
export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Explore Items",
    route: "/#items",
  },
  {
      label: "Create Items",
      route: "/items/create",
    },
  {
    label: "My Profile",
    route: "/profile",
  },
];
  
// Default Values when User Create or Update Event on Form
export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
  url: "",
};

export const itemDefaultValues = {
  imageUrl: "",
  name: "",
  description: "",
  status: 1,
  recievedDateTime: new Date(),
  deadlineDateTime: new Date(),
  isProcessed: false,
  processedDateTime: new Date(),
  isDelivery: false,
  toDeliverDateTime: new Date(),
  deliveryLocation: "",
  deliveryLocationUrl: "",
  isCompleted: false,
  completedDateTime: new Date(),
  serviceId: "",
  workerId: "",
  courierId: "",
  isComplain: false,
  complainId: "",
};