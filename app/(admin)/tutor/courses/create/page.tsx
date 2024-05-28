import CreateCourseCard from "@/components/admin/courses/create-course";
import MetaData from "@/components/ui/meta-data";

const CreateCoursePage = () => {

  return (
    <>
    <MetaData title='upgrade-admin | Create Course' description='courses offered at upgrade e-learning platform' keywords="programming,alx"/>
   
    <CreateCourseCard/>
    </>
  )
}

export default CreateCoursePage