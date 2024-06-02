import Courses from '@/components/courses/course';
import MetaData from '@/components/ui/meta-data';
import prismadb from '@/lib/db';

const CoursesPage =  async () => {
  const courses = await prismadb.course.findMany({
    where: {
      NOT: {
        courseStatus: 'Coming_Soon'
      },
    },
    include: {
      category: true,
      reviews: true,
     
    },

  });

   for (const course of courses) {
    let sum  = 0;
    if (course.reviews) {
    for (const review of course.reviews) {
      sum = review.rating
    };
    course.rating = Math.floor(sum / course.reviews.length); 
  }
   else {
    course.rating = 0
   };    
   }
  return (
   <>
   <MetaData title='upgrade | courses' description='courses offered at upgrade e-learning platform' keywords="programming,alx"/>
     <Courses courses={courses}/>
   </>
  )
}

export default CoursesPage