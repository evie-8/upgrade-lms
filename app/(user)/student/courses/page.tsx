import SearchPage from '@/components/student/search-page'
import prismadb from '@/lib/db'

const Courses = async() => {
  const categories = await prismadb.category.findMany();
  return (
    <SearchPage categories={categories}/>
  )
}

export default Courses