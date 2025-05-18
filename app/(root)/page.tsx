// next
import Image from "next/image";
import Link from "next/link";

// components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import Search from "@/components/shared/Search";
import Collection from "@/components/shared/Collection";
import { CategoryFilter } from "@/components/shared/CategoryFilter";

// lib
import { getAllEvents } from "@/lib/actions/event.actions";

// types
import { SearchParamProps } from "@/types";


export default async function Home( {searchParams}: SearchParamProps) {

  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const searchText = (params?.query as string) || "";
  const category = (params?.category as string) || "";

  // Fetch All Event Data
  const events = await getAllEvents({
    query: searchText,
    category: category,
    page: page,
    limit: 6
  })
  
  return (
    <>
      {/* Hero */}
      <section className="hidden sm:block bg-primary-50 bg-dotted-pattern bg-contain mb-5 py-3 sm:py-0 md:py-3">
        <div className="wrapper items-center grid gap-3 sm:grid-cols-8 sm:min-h-[150px] md:grid-cols-10 md:min-h-[140px] lg:grid-cols-12 lg:min-h-[150px]">
          <Image src={'/assets/images/mrbob.png'} width={1000} height={1000} alt='Mr Bob Hero' className="sm:col-span-2 md:col-span-2 lg:col-span-2 max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"/>
          <div className="sm:col-span-6 md:col-span-8 lg:col-span-10 flex flex-col justify-center gap-2">
            <h1 className="h4-bold md:h3-bold">Mr Bob's Shoescare</h1>
            <p className="p-regular-12 md:p-regular-14">Our team is committed to providing top-quality cleaning, restoration, and maintenance, ensuring every customer experiences excellence</p>
            <Button asChild className="button w-fit">
              <Link href='#events'>
                Dashboard
              </Link>
            </Button>
          </div>
          
        </div>
      </section>

      {/* Cleaning Process */}
      <div className="wrapper grid grid-cols-8 gap-5">

        <div className="col-span-4">
          {/* Dirty Queue */}
          <section id='queue' className="mt-3 flex flex-col gap-2 md:gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5 shrink-0">
                <div>
                  <h2 className="h5-bold">
                    Dirty Queue
                  </h2>
                  <span className="p-medium-9 md:p-medium-10">
                    View All
                    <Badge className="ml-1">11</Badge>
                  </span>
                </div>
              </div>
              <div className="grow mt-1">
                <Search />
              </div>
            </div>
            <Collection data={events?.data} emptyTitle= "No Event Found" emptyStateSubtext= "Come Back Later" collectionType="All_Events" limit={6} page={page} totalPages={events?.totalPages} type='home'/>
          </section>
        </div>

        <div className="col-span-4">
          {/* onProgress */}
          <section id='onProgress' className="mt-3 flex flex-col gap-2 md:gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5 shrink-0">
                <div>
                  <h2 className="h5-bold">
                    Processed
                  </h2>
                  <span className="p-medium-9 md:p-medium-10">
                    View All
                    <Badge className="ml-1">11</Badge>
                  </span>
                </div>
              </div>
              <div className="grow mt-1">
                <Search />
              </div>
            </div>
            <Collection data={events?.data} emptyTitle= "No Event Found" emptyStateSubtext= "Come Back Later" collectionType="All_Events" limit={6} page={page} totalPages={events?.totalPages} type='home'/>
          </section>
        </div>

        <div className="col-span-4">
          {/* toDeliver */}
          <section id='toDeliver' className="mt-3 flex flex-col gap-2 md:gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5 shrink-0">
                <div>
                  <h2 className="h5-bold">
                    To Deliver
                  </h2>
                  <span className="p-medium-9 md:p-medium-10">
                    View All
                    <Badge className="ml-1">11</Badge>
                  </span>
                </div>
              </div>
              <div className="grow mt-1">
                <Search />
              </div>
            </div>
            <Collection data={events?.data} emptyTitle= "No Event Found" emptyStateSubtext= "Come Back Later" collectionType="All_Events" limit={6} page={page} totalPages={events?.totalPages} type='home'/>
          </section>
        </div>

        <div className="col-span-4">
          {/* Completed */}
          <section id='completed' className="mt-3 flex flex-col gap-2 md:gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5 shrink-0">
                <div>
                  <h2 className="h5-bold">
                    Completed
                  </h2>
                  <span className="p-medium-9 md:p-medium-10">
                    View All
                    <Badge className="ml-1">11</Badge>
                  </span>
                </div>
              </div>
              <div className="grow mt-1">
                <Search />
              </div>
            </div>

            <Collection data={events?.data} emptyTitle= "No Event Found" emptyStateSubtext= "Come Back Later" collectionType="All_Events" limit={6} page={page} totalPages={events?.totalPages} type='home'/>
          </section>
        </div>

      </div>
    </>
  );
}
{}