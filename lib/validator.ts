import { z } from "zod";

// Data Type and Rules on Form
export const eventFormSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters.",
    })
    .max(50, {
      message: "Title must be at maximum 50 characters.",
    }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(400, {
      message: "Description must be at maximum 400 characters.",
    }),
  location: z
    .string()
    .min(3, {
      message: "Location must be at least 3 characters.",
    })
    .max(200, {
      message: "Location must be at maximum 200 characters.",
    }),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});

// Data Type and Rules on Form
export const itemFormSchema = z.object({
  imageUrl: z.string(),
  name: z 
    .string()
    .min(3, {
      message: "Name must be at least 3 characters",
    })
    .max(50, {
      message: "Name must be at maximum 50 characters",
    }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters",
    })
    .max(400, {
      message: "Description must be at maximum 400 characters",
    }),
  customerId: z.string(),
  status: z.number(),
  recievedDateTime: z.date(),
  deadlineDateTime: z.date(),
  isProcessed: z.boolean(),
  processedDateTime: z.date(),
  isDelivery: z.boolean(),
  toDeliverDateTime: z.date(),
  deliveryLocation: z
    .string()
    .min(3, {
      message: "Location must be at least 3 characters",
    })
    .max(200, {
      message: "Location must be at maximum 200 characters",
    }),
  deliveryLocationUrl: z
    .string()
    .min(3, {
      message: "Location must be at least 3 characters",
    })
    .max(200, {
      message: "Location must be at maximum 200 characters",
    }),
  isCompleted: z.boolean(),
  completedDateTime: z.date(),
  serviceId: z.string(),
  workerId: z.string(),
  courierId: z.string(),
  isComplain: z.boolean(),
  complainId: z.string(),
});