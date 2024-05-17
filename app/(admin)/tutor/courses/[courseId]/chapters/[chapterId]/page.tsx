import ChapterIdCard from "@/components/admin/courses/chapters/chapterId"

const ChapterIdPage = async( {params}: {params: {courseId: string, chapterId: string}}) => {

  return (
   <ChapterIdCard chapterId={params.chapterId} courseId={params.courseId}/>
  )
}

export default ChapterIdPage