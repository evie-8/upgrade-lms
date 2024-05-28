import ChapterIdCard from "@/components/admin/courses/chapters/chapterId"
import MetaData from "@/components/ui/meta-data"

const ChapterIdPage = async( {params}: {params: {courseId: string, chapterId: string}}) => {

  return (
    <>
    <MetaData title='upgrade-admin | Chapter ' description='courses offered at upgrade e-learning platform' keywords="programming,alx"/>
   
   <ChapterIdCard chapterId={params.chapterId} courseId={params.courseId}/>
   </>
  )
}

export default ChapterIdPage