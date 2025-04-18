// User Params
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};
export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};
  
// Event Params
export type CreateEventParams = {
  userId: string;
  event: {
    title: string;
    description: string;
    location: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};
export type UpdateEventParams = {
  userId: string;
  event: {
    _id: string;
    title: string;
    imageUrl: string;
    description: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};
export type DeleteEventParams = {
  eventId: string;
  path: string;
};

// Getters Event Params
export type GetAllEventsParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};
export type GetEventsByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};
export type GetRelatedEventsByCategoryParams = {
  categoryId: string;
  eventId: string;
  limit?: number;
  page: number | string;
};
  
// Constructor Event Params
export type Event = {
  _id: string;
  title: string;
  description: string;
  price: string;
  isFree: boolean;
  imageUrl: string;
  location: string;
  startDateTime: Date;
  endDateTime: Date;
  url: string;
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  category: {
    _id: string;
    name: string;
  };
};
  
// Category Params
export type CreateCategoryParams = {
  categoryName: string;
};
  
// Order Params
export type CheckoutOrderParams = {
  eventTitle: string;
  eventId: string;
  price: string;
  isFree: boolean;
  buyerId: string;
};
export type CreateOrderParams = {
  stripeId: string;
  eventId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: Date;
};

// Getters Order Params
export type GetOrdersByEventParams = {
  eventId: string;
  searchString: string;
};
export type GetOrdersByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};
  
// URL Query Params
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};
export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};
export type SearchParamProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};




// ===========
export type CreateItemParams = {
  userId: string;
  item: {
    imageUrl: string;
    name: string;
    description?: string;
    customerId: string;
    status: number;
    recievedDateTime: Date;
    deadlineDateTime: Date;
    isProcessed: Boolean;
    processedDateTime: Date;
    isDelivery: Boolean;
    toDeliverDateTime: Date;
    deliveryLocation: string;
    deliveryLocationUrl: string;
    isCompleted: boolean;
    completedDateTime: Date;
    serviceId: string;
    workerId: string;
    courierId: string;
    isComplain: boolean;
    complainId: string;
  };
  path: string;
};

export type UpdateItemParams = {
  userId: string;
  item: {
    _id: string;
    imageUrl: string;
    name: string;
    description?: string;
    customerId: string;
    status: number;
    recievedDateTime: Date;
    deadlineDateTime: Date;
    isProcessed: Boolean;
    processedDateTime: Date;
    isDelivery: Boolean;
    toDeliverDateTime: Date;
    deliveryLocation: string;
    deliveryLocationUrl: string;
    isCompleted: boolean;
    completedDateTime: Date;
    serviceId: string;
    workerId: string;
    courierId: string;
    isComplain: boolean;
    complainId: string;
  };
  path: string;
};