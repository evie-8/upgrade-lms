import { getCourses } from '@/action-server/get-courses';
import SearchPage from '@/components/student/search-page'
import MetaData from '@/components/ui/meta-data';
import { currentUser } from '@/lib/auth';
import prismadb from '@/lib/db'

interface SearchProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
}

const Courses = async({searchParams}: SearchProps) => {
  const user = await currentUser()
  const categories = await prismadb.category.findMany();

  const courses = await getCourses({
     userId: String(user?.id),
     ...searchParams
  })
  return (
   <>
     <MetaData title='upgrade-student | Courses search page' description='courses offered at upgrade e-learning platform' keywords="programming,alx"/>
  
  <SearchPage categories={categories} courses={courses}/>
   </>
  )
}

export default Courses