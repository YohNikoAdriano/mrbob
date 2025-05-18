// components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Card from './Card'
import Pagination from './Pagination'

// lib
import { IEvent } from '@/lib/database/models/event.model'

type CollectionProps = {
  data: IEvent[],
  emptyTitle: string,
  emptyStateSubtext: string, 
  collectionType: 'Event_Organized' | 'My_Tickets' | 'All_Events', 
  limit: number
  page: number | string, 
  totalPages?: number, 
  urlParamName?: string,
  type: string
}

const Collection = ({data, emptyTitle, emptyStateSubtext, collectionType, limit, page, totalPages = 0,  urlParamName, type}: CollectionProps) => {
  
  return (
    <>
      {data.length > 0 ? (
        type === 'home' ? (
          // Home Page: Carousel Layout
          <Carousel className="w-11/12 mx-auto" opts={{slidesToScroll: 1}}>
            <CarouselContent>
              {data.map((event) => {
                const hasOrderLink = collectionType === "Event_Organized";
                const hidePrice = collectionType === "My_Tickets";

                return (
                  <CarouselItem
                    key={event._id}
                    className="basis-1/1 sm:basis-1/2 lg:basis-1/3 w-full"
                  >
                    <Card
                      event={event}
                      hasOrderLink={hasOrderLink}
                      hidePrice={hidePrice}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent >
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          // View All Page: Grid + Pagination
          <div className="flex flex-col items-center gap-8">
            <ul className="grid w-full grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-10">
              {data.map((event) => {
                const hasOrderLink = collectionType === "Event_Organized";
                const hidePrice = collectionType === "My_Tickets";

                return (
                  <li key={event._id} className="flex justify-center">
                    <Card
                      event={event}
                      hasOrderLink={hasOrderLink}
                      hidePrice={hidePrice}
                    />
                  </li>
                );
              })}
            </ul>
            {totalPages > 1 && (
              <Pagination
                urlParamName={urlParamName}
                page={page}
                totalPages={totalPages}
              />
            )}
          </div>
        )
      ) : (
        // Empty State
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="b-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  )
}

export default Collection
