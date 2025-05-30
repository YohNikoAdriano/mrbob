// import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs/server";

import ItemForm from "@/components/shared/ItemForm";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CreateItems = async () => {

  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="wrapper mb-3 py-3">
      
        <div className="rounded-3xl bg-primary-50 
        items-center px-5 py-5 flex justify-between"> 
          <h3 className="h5-bold text-center sm:text-left">
            Create Item
          </h3>
          <div className="flex flex-col gap-1">
          <Dialog>
              <DialogTrigger asChild>
                <Button className="button w-full">
                  Add New Customer
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                </DialogHeader>
                <div className="grid gap-2">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="firstName" className="text-right">
                      First Name
                    </Label>
                    <Input id="firstName" placeholder="Customer First Name" className="input-field px-3 md:px-6 col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="lastName" className="text-right">
                      Last Name
                    </Label>
                    <Input id="lastName" placeholder="Customer Last Name" className="input-field px-3 md:px-6 col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input id="phone" placeholder="Customer Phone" className="input-field px-3 md:px-6 col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="loc" className="text-right">
                      Location
                    </Label>
                    <Input id="loc" placeholder="Customer Location" className="input-field px-3 md:px-6 col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="locUrl" className="text-right">
                      Location Url
                    </Label>
                    <Input id="locUrl" placeholder="Customer Location Url" className="input-field px-3 md:px-6 col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="button w-fit">Save Data</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="button w-full">
                  Add New Service
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                </DialogHeader>
                <div className="grid gap-2">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="serviceName" className="text-right">
                      Name
                    </Label>
                    <Input id="serviceName" placeholder="Service Name" className="input-field px-3 md:px-6 col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="servicePrice" className="text-right">
                      Price
                    </Label>
                    <Input id="servicePrice" placeholder="Service Price" type="number" className="input-field px-3 md:px-6 col-span-3" />
                  </div>
                  <div className="grid grid-cols-8 items-center gap-4">
                    <Label htmlFor="ownerEarning" className="text-right col-span-3">
                      Owner Earning
                    </Label>
                    <Input id="ownerEarning" placeholder="Owner Earning" type="number" className="input-field px-3 md:px-6 col-span-5" />
                  </div>
                  <div className="grid grid-cols-8 items-center gap-4">
                    <Label htmlFor="workerEarning" className="text-right col-span-3">
                      Worker Earning
                    </Label>
                    <Input id="workerEarning" placeholder="Worker Earning" type="number" className="input-field px-3 md:px-6 col-span-5" />
                  </div>
                  <div className="grid grid-cols-8 items-center gap-4">
                    <Label htmlFor="courierEarning" className="text-right col-span-3">
                      Courier Earning
                    </Label>
                    <Input id="courierEarning" placeholder="Courier Earning" type="number" className="input-field px-3 md:px-6 col-span-5" />
                  </div>
                  <div className="grid grid-cols-8 items-center gap-4">
                    <Label htmlFor="ccEarning" className="text-right col-span-3">
                      Content Creator Earning
                    </Label>
                    <Input id="ccEarning" placeholder="Content Creator Earning" type="number" className="input-field px-3 md:px-6 col-span-5" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="button w-fit">Save Data</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

      </section>

      <div className="wrapper my-3">
        {/* <EventForm userId={userId} type="Create" /> */}
        <ItemForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateItems;
