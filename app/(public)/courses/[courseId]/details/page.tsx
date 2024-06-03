import CourseDetails from '@/components/courses/course-details'
import MetaData from '@/components/ui/meta-data'
import { currentUser } from '@/lib/auth'
import prismadb from '@/lib/db'

const CourseDetailPage = async ({params}: {params: {courseId: string}}) => {
  const user = await currentUser();
  const course = await prismadb.course.findUnique({
    where: {
      id: params.courseId
    },
    include: {
      resources: true,
      category: true,
      reviews: {
        include: {
          reviewer: true,
        },
      },
      chapter: {
        where: {
          isAvailable: true,
        },
        orderBy :{
          position: 'asc'
        },
        include: {
          quiz: {
            include: {
              Question: true
            }
          },
          Lesson: {
            where: {
              isDraft: false,
            },
            orderBy :{
              position: 'asc'
            },
            include : {
              muxData: true
            }
          
          }
        }
      }
    }
  });

  
  let sum = 0 ;
  if (course?.reviews){
  for (const review of course?.reviews) {
    sum = sum + review.rating;
  }
};

const order = await prismadb.order.findUnique({
  where: {
    userId_courseId: {
      userId: String(user?.id),
      courseId: String(course?.id)

    }
  }
})

console.log('details,order', order)
  //@ts-ignore
  course.rating = Math.floor(sum / course?.reviews.length);

  return (
  <>
    <MetaData title='upgrade | Course Details' description='courses offered at upgrade e-learning platform' keywords="programming,alx"/>
   
   <CourseDetails course={course} purchase={order}/>
  </>
  )
}

export default CourseDetailPage