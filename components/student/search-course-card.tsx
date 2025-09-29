import Image from 'next/image';
import React from 'react'
import { IconTag } from '../ui/icon';
import { BookOpenText} from 'lucide-react';
import { Progress } from '../ui/progress';
import { formatter } from '@/lib/utils';

const SearchCourseCard = ({course}: {course: any}) => {
    let numberOfLessons = 0;

    for (const chapter of course.chapter) {
      for (const lesson of chapter.Lesson) {
       if (lesson) {
        numberOfLessons = numberOfLessons + 1;
       }
      }
    }
  return (
   <a href={`/student/courses/${course.id}`}>
    <div className='group hover:shadow-sm transition overflow-hidden border border-grey rounded-lg p-3 h-full'>
       <div className='relative w-full aspect-video rounded-md overflow-hidden'>
            <Image fill className='object-cover transition-all rounded-md ease-in transform group-hover:scale-105' alt={course.name} src={course.imageUrl} />
        </div>
        <div className='flex flex-col pt-2'>
            <p className='text-lg md:text-base font-medium group-hover:text-primary transition line-clamp-2'>
                {course.name}
            </p>
            <p className='text-sm text-gray/60'>
                {course.category.name}
            </p>
            <div className='my-3 flex items-center gap-x-2 text-sm md:text-xs'>
                <div className='flex items-center gap-x-1 text-gray/60'>
                <IconTag size={'sm'} icon={BookOpenText}/> 
                    <span>{numberOfLessons} {numberOfLessons ===  1 ? 'Lesson' : 'Lessons'}</span>
                </div>
            </div>
             {
                (course.progress >  0 ) || (course.paymentStatus === 'Free' && course.progress > 0) ? (
                    <div className='fle flex-col gap-x-2'>
                        <Progress variant={course.progress === 100 ? 'success': 'default'} value={Math.round(course.progress)} className="h-2 w-full"/>
                        <span className={ `text-sm  ${course.progress === 100 ? 'text-success' : 'text-primary'}`}>{Math.round(course.progress)}% complete</span>
                    </div>
                ) : (
                     <p className='font-medium'>
                        {
                            course.paymentStatus === 'Paid' ? 
                            formatter(course.price) :
                            "Free"
                        }
                     </p>
                )
             }
        </div>                
    </div>
    </a>

  )
}

export default SearchCourseCard