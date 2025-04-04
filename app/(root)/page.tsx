import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";
import Search from "@/components/shared/Search";
import { SearchParamProps } from "@/types";
import { CategoryFilter } from "@/components/shared/CategoryFilter";

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
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-3">
        <div className="wrapper grid grid-cols-1 gap-5 lg:grid-cols-4 2xl:gap-0">
          <div className="col-span-3 flex flex-col justify-center gap-3">
            <p className="p-regular-14 md:p-regular-18">Welcome Joni!</p>
            <h1 className="h1-bold">Mr Bob's Shoescare</h1>
            <p className="p-regular-14 md:p-regular-18">Our team is committed to providing top-quality cleaning, restoration, and maintenance, ensuring every customer experiences excellence</p>
            <Button size='lg' asChild className="button w-full sm:w-fit">
              <Link href='#events'>
                Check Your Dashboard!
              </Link>
            </Button>
          </div>
          <Image src={'/assets/images/mrbob.png'} width={1000} height={1000} alt='Connectify Hero' className="hidden lg:block col-span-1 max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"/>
        </div>
      </section>

      {/* <section id='events' className="wrapper my-3 flex flex-col gap-3 md:gap-5"></section> */}

      <section id='queue' className="wrapper my-3 flex flex-col gap-3 md:gap-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex items-center shrink-0">
            <h2 className="h3-bold">
              Dirty Queue ⏳
            </h2>
          </div>
          <div className="grow">
            <Search />
          </div>
        </div>

        {/* All Event Data */}
        <Collection data={events?.data} emptyTitle= "No Event Found" emptyStateSubtext= "Come Back Later" collectionType="All_Events" limit={6} page={page} totalPages={events?.totalPages}/>
      </section>

      <section id='onProgress' className="wrapper my-3 flex flex-col gap-3 md:gap-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex items-center shrink-0">
            <h2 className="h3-bold">
              Freshness in Progress 🧽
            </h2>
          </div>
          <div className="grow">
            <Search />
          </div>
        </div>

        {/* All Event Data */}
        <Collection data={events?.data} emptyTitle= "No Event Found" emptyStateSubtext= "Come Back Later" collectionType="All_Events" limit={6} page={page} totalPages={events?.totalPages}/>
      </section>

      <section id='toDeliver' className="wrapper my-3 flex flex-col gap-3 md:gap-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex items-center shrink-0">
            <h2 className="h3-bold">
              Final Step: Delivery 🏁
            </h2>
          </div>
          <div className="grow">
            <Search />
          </div>
        </div>

        {/* All Event Data */}
        <Collection data={events?.data} emptyTitle= "No Event Found" emptyStateSubtext= "Come Back Later" collectionType="All_Events" limit={6} page={page} totalPages={events?.totalPages}/>
      </section>

      <section id='completed' className="wrapper my-3 flex flex-col gap-3 md:gap-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex items-center shrink-0">
            <h2 className="h3-bold">
              Mission Accomplished! 🎯
            </h2>
          </div>
          <div className="grow">
            <Search />
          </div>
        </div>

        {/* All Event Data */}
        <Collection data={events?.data} emptyTitle= "No Event Found" emptyStateSubtext= "Come Back Later" collectionType="All_Events" limit={6} page={page} totalPages={events?.totalPages}/>
      </section>
    </>
  );
}
{}