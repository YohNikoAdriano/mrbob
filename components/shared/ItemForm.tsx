"use client";

// react
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// shadcn ui zod validator
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Dropdown from "./Dropdown";
import FileUploader from "./FileUploader";

// react datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// uploadthing
import { useUploadThing } from "@/lib/uploadthing";

// constant
import { itemDefaultValues } from "@/constant";

// lib
import { itemFormSchema } from "@/lib/validator";
import { createItem, updateItem } from "@/lib/actions/item.actions";
import { IItem } from "@/lib/database/models/item.model";
import { statusMapping } from "@/lib/utils";


function mapItemToFormValues(item: IItem) {
  const validStatuses = ["recieved", "completed", "processed", "to_deliver"] as const;
  
  const status = validStatuses.includes(item.status as any) ? item.status : "recieved";
  
  return {
    imageUrl: item.imageUrl,
    name: item.name,
    description: item.description ?? "",
    status: item.status ?? 1,
    recievedDateTime: new Date(item.recievedDateTime),
    deadlineDateTime: new Date(item.deadlineDateTime),
    isProcessed: Boolean(item.isProcessed),
    processedDateTime: new Date(item.processedDateTime ?? new Date()),
    isDelivery: Boolean(item.isDelivery),
    toDeliverDateTime: new Date(item.toDeliverDateTime ?? new Date()),
    deliveryLocation: item.deliveryLocation ?? "",
    deliveryLocationUrl: item.deliveryLocationUrl ?? "",
    isCompleted: Boolean(item.isCompleted),
    completedDateTime: new Date(item.completedDateTime ?? new Date()),
    serviceId: item.service?._id ?? "",
    workerId: item.worker?._id ?? "",
    courierId: item.courier?._id ?? "",
    isComplain: Boolean(item.isComplained),
    complainId: item.complain?._id ?? "",
  };
}

type ItemFormProps = {
  userId: string
  type: "Create" | "Update"
  item?: IItem
  itemId?: string
};

const ItemForm = ({ userId, type, item, itemId }: ItemFormProps) => {
  const router = useRouter()

  // Image Uploader
  const [files, setFiles] = useState<File[]>([]);
  const {startUpload} = useUploadThing('imageUploader')

  // Form Schema and Value
  const initialFormValues =
    item && type === "Update" ? mapItemToFormValues(item) : itemDefaultValues;

  const form = useForm<z.infer<typeof itemFormSchema>>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: initialFormValues,
  });

  
  // OnSubmit
  async function onSubmit(values: z.infer<typeof itemFormSchema>) {

    // handle when upload image
    let uploadedImageUrl = values.imageUrl
    if(files.length > 0){
      const uploadedImages = await startUpload(files)
      if(!uploadedImages){
        return
      }
      uploadedImageUrl = uploadedImages[0].ufsUrl
    }

    // Handle when Create
    if(type === 'Create'){
      try {
        const newItem = await createItem({
          item: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: '/profile'
        })

        if(newItem){
          form.reset()
          // NANTI GANTI
          // router.push(`/items/${newItem._id}`)
          router.push('/profile')
        }

      } catch (error) {
        console.log(error)
      }
    }

    // Handle when Update
    if(type === 'Update'){
      if(!itemId) {
        router.back() 
        return
      }

      try {
        const updatedItem = await updateItem({
          userId,
          item: { ...values, imageUrl: uploadedImageUrl, _id: itemId},
          // NANTI DIGANTI
          // path: `/items/${itemId}`
          path: '/profile'
        })

        if(updatedItem){
          form.reset()
          // NANTI DIGANTI
          // router.push(`/events/${updatedItem._id}`)
          router.push('/profile')
        }

      } catch (error) {
        console.log(error)
      }
    }

  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-row gap-3">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Item Name"
                      className="input-field px-3 md:px-6"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Customer */}
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Customer ID or Name"
                      className="input-field px-3 md:px-6"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row gap-3">
            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Dropdown
                      onChangeHandler={field.onChange}
                      value={statusMapping[field.value as number] || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Service */}
            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Dropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row gap-3">
            {/* Worker */}
            <FormField
              control={form.control}
              name="workerId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Dropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Courier */}
            <FormField
              control={form.control}
              name="courierId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Dropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row gap-3">
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      placeholder="Description"
                      className="textarea rounded-2xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image */}
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          

          <div className="flex flex-row gap-3">
            {/* Delivery Location */}
            <FormField
              control={form.control}
              name="deliveryLocation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[36px] md:h-[45px] overflow-hidden rounded-full bg-grey-50 p-regular-10 md:p-regular-12 px-3 md:px-6 py-2 md:py-3">
                      <Image
                        src="/assets/icons/location-grey.svg"
                        alt="Calendar"
                        width={24}
                        height={24}
                      />
                      <Input
                        placeholder="Delivery Location"
                        className="input-field ml-1"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Delivery Location Url */}
            <FormField
              control={form.control}
              name="deliveryLocationUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[36px] md:h-[45px] overflow-hidden rounded-full bg-grey-50 p-regular-10 md:p-regular-12 px-3 md:px-6 py-2 md:py-3">
                      <Image
                        src="/assets/icons/location-grey.svg"
                        alt="Calendar"
                        width={24}
                        height={24}
                      />
                      <Input
                        placeholder="Delivery Location Url"
                        className="input-field ml-1"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row gap-3">
            {/* isDelivery */}
            <FormField
              control={form.control}
              name="isDelivery"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center h-[36px] md:h-[45px] w-full overflow-hidden rounded-full bg-grey-50 p-regular-10 md:p-regular-12 px-3 md:px-6 py-2 md:py-3">
                      <FormLabel
                        htmlFor="isDelivery"
                        className="whitespace-nowrap pr-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Pickup & Delivery
                      </FormLabel>
                      <Checkbox
                        onCheckedChange={field.onChange}
                        id="isDelivery"
                        className="mr-2 h-5 w-5 border-2 border-primary-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* isDelivery */}
            <FormField
              control={form.control}
              name="isDelivery"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center h-[36px] md:h-[45px] w-full overflow-hidden rounded-full bg-grey-50 p-regular-10 md:p-regular-12 px-3 md:px-6 py-2 md:py-3">
                      <FormLabel
                        htmlFor="isDelivery"
                        className="whitespace-nowrap pr-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Pickup & Delivery
                      </FormLabel>
                      <Checkbox
                        onCheckedChange={field.onChange}
                        id="isDelivery"
                        className="mr-2 h-5 w-5 border-2 border-primary-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 w-full"
          >
            {form.formState.isSubmitting ? "Submitting..." : `${type} Item`}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ItemForm;
