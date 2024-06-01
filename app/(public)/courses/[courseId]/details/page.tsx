import CourseDetails from '@/components/courses/course-details'
import MetaData from '@/components/ui/meta-data'
import prismadb from '@/lib/db'

const CourseDetailPage = async ({params}: {params: {courseId: string}}) => {
  const course = await prismadb.course.findUnique({
    where: {
      id: params.courseId
    },
    include: {
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
  })
  return (
  <>
    <MetaData title='upgrade | Course Details' description='courses offered at upgrade e-learning platform' keywords="programming,alx"/>
   
   <CourseDetails course={course}/>
  </>
  )
}

export default CourseDetailPage