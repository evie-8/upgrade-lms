"use client"
import { Review, User } from "@prisma/client"
import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi,
} from "@/components/ui/carousel";
import ReviewCard from "../review-card";

const AllReviews = ({reviews}: {reviews: Review[] & {reviewer: User}| null } | null) => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!api) {
          return
        }
     
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
     
        api.on("select", () => {
          setCurrent(api.selectedScrollSnap() + 1)
        })
      }, [api])
  return (
    <article className="flex flex-col gap-4 my-6">
         <h2 className="text-lg font-bold font-poppins">{reviews.length ? reviews.length : 0} {reviews.length === 1 ? 'review' : 'reviews'}</h2>

            {
            (reviews && (reviews.length > 0))  &&

            <Carousel opts={{ align: "start", loop: true,}}  setApi={setApi}
            className="grid grid-cols-1 items-center justify-center relative mb-5">
          <CarouselContent>
            
           {
            reviews.map((review) => (
                <CarouselItem key={review.id}>
                    <ReviewCard review={review}/>
            
                </CarouselItem>
               
            ))
           }
          </CarouselContent>
          <div className="absolute -bottom-14 left-1/2  -translate-x-1/2 -translate-y-1/2 flex items-center flex-nowrap gap-5">
          <CarouselPrevious />
          <p className="text-lg font-bold">{current} <span className="text-sm font-normal mx-2">of</span> {count}</p>
          <CarouselNext/>
          </div>
         </Carousel>
        }
   
   
    </article>
  )
}

export default AllReviews