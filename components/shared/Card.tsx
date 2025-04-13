// next
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'

// lib
import { IEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import { DeleteConfirmation } from './DeleteConfirmation'
import { Switch } from "@/components/ui/switch"
import { Label } from '../ui/label'

type CardProps = {
  event: IEvent, 
  hasOrderLink?: boolean, 
  hidePrice?: boolean
}

const Card = async ( {event, hasOrderLink, hidePrice}: CardProps) => {

  const { sessionClaims } = await auth()
  const userId = sessionClaims?.userId as string
  const isEventCreator = userId === event.organizer._id.toString()

  return (
    <div className='group relative flex flex-col my-3 w-full max-w-[300px] min-h-[300px] md:min-h-[330px]  overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg hover:scale-105 '>

      {/* Background Event */}
      <Link href={`/events/${event._id}`} style={{backgroundImage: `url(${event.imageUrl})`}} className='flex-center flex-grow bg-grey-50 bg-cover bg-center text-gray-500' />

      {/* Is Event Creator ? Able to Edit and Delete Their Event */}
      {isEventCreator && !hidePrice && (
        <div className='absolute right-2 top-2 flex flex-col gap-5 rounded-xl bg-white opacity-80 border-2 border-primary p-2 shadow-sm transition-all'>
          <Link href={`/events/${event._id}/update`}>
            <Image src="/assets/icons/edit.svg" alt='edit' width={20} height={20} />
          </Link>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      {/* Deadline and Status */}
      <div className='flex flex-col min-h-[150px] px-2 py-2 gap-1 md:gap-2'>

        {/* Deadline */}
        <div className='w-full rounded-lg px-2 py-1 border-2 border-red-700 text-center bg-gray-50'>
          {/* <Image src="/assets/icons/deadline.svg" alt='edit' width={20} height={20} /> */}
          <span className='p-semibold-9 md:p-semibold-10 text-red-700 line-clamp-1'>
            {formatDateTime(event.startDateTime).dateTime}
          </span>
        </div>

        {/* Current Status and Action to Updating Status */}
        <div className='flex justify-between w-full items-center gap-1'>
          <div className='flex flex-none rounded-lg bg-primary-50 px-2 py-1 md:py-1.5 h-full items-center'>
            <span className='p-medium-9 md:p-medium-10'>
              DQ
            </span>
          </div>
          <div className='flex flex-1 rounded-lg bg-primary-50 px-2 py-1 md:py-1.5 h-full items-center justify-center space-x-1.5'>
            <Label htmlFor="airplane-mode" className='p-medium-9 md:p-medium-10 line-clamp-1'>Cleaning</Label>
            <Switch id="airplane-mode" />
          </div>
        </div>

        {/* All Information */}
        <div className='flex flex-col px-1'>

          {/* Event Information */}
          <Link href={`/events/${event._id}`} className='min-h-[35px] sm:min-h-[38px] md:min-h-[45px]' >
            <p className='p-semibold-11 md:p-semibold-12 line-clamp-2 flex-1 text-black mb-1'>{event.title}</p>
          </Link>

          {/* Location */}
          <div className='flex flex-row gap-1 items-center'>
            <Image src="/assets/icons/location.svg" alt='edit' width={20} height={20} />
            <div>
              <p className='p-regular-9 md:p-regular-10 text-grey-500 line-clamp-1'>{event.location}</p>
            </div>
          </div>

          {/* Service */}
          <div className='flex flex-row gap-1 items-center'>
            <Image src="/assets/icons/service.svg" alt='edit' width={20} height={20} />
            <div>
              <p className='p-regular-9 md:p-regular-10 text-grey-500 line-clamp-1'>Deep Clean</p>
            </div>
          </div>

          {/* Assigned Date */}
          <div className='flex flex-row gap-1 items-center'>
            <Image src="/assets/icons/assignDate.svg" alt='edit' width={20} height={20} />
            <div>
              <p className='p-regular-9 md:p-regular-10 text-grey-500 line-clamp-1'>{formatDateTime(event.startDateTime).dateTime}</p>
            </div>
          </div>

          {/* Assigned To */}
          <div className='flex flex-row gap-1 items-center'>
            <Image src="/assets/icons/assignTo.svg" alt='edit' width={20} height={20} />
            <div>
              <p className='p-regular-9 md:p-regular-10 text-grey-500 line-clamp-1'>{event.organizer.firstName} {event.organizer.lastName}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Card
