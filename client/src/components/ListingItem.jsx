import { Link } from "react-router-dom"
import {
    MdLocationOn
} from 'react-icons/md';

export default function ListingItem({listing}) {
  return (
    <div className="bg-white shadow-md hover: shadow-lg 
    rounded-lg transition-shadow w-full sm:w-[330px] overflow-hidden">
        <Link to ={`/listing/${listing._id}`}>
            <img 
            src={listing.imageUrls[0]} 
            alt="listing image" 
            className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105
            transition-scale duration-300"
            />
            <div className="p-3 flex flex-col gap-2 w-full mt-3">
                <p className="truncate text-lg font-semibold text-slate-700">{listing.name}</p>
                <div className="flex items-center gap-1">
                    <MdLocationOn className="h-4 w-4 text-green-700"/>
                    <p className="text-sm w-full truncate text-gray-600">{listing.address}</p>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
                  <p className="mt-2 text-slate-500 font-semibold">
                  ${listing.offer 
                  ? listing.discountedPrice.toLocaleString('en-US') 
                  : listing.regularPrice.toLocaleString('en-US')}
                  {listing.type === 'rent' && ' / month'}
                  </p>
                  <div className="flex gap-2 font-bold text-xs text-slate-700">
                    <div className="">
                        {listing.bedrooms > 1 ? `${listing.bedrooms} beds`: `${listing.bedrooms} bed` }
                    </div>
                    <div>
                        {listing.bathrooms > 1 ? `${listing.bathrooms} baths`: `${listing.bathrooms} bath` }
                    </div>
                  </div>
            </div>
        </Link>
    </div>
  )
}
