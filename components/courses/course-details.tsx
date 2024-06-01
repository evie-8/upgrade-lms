"use client";

import Container from "@/components/ui/container";
import { faShare, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Book, Calendar,  Check,  CircleHelp,  GraduationCap,  Languages, Signal, TimerIcon } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { faFacebook, faLinkedin, faSquareXTwitter } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import CourseViewButton from "./button-course";
import CurriculumDetails from "./curriculum";
import { Progress } from "../ui/progress";

import { Badge } from "../ui/badge";
import { formatter } from "@/lib/utils";
import "react-quill/dist/quill.bubble.css"
import { Course } from "@prisma/client";
import { fetchCourseByCategoryName } from "@/action-server/courses";
import { CourseCard } from "./course-card";
import AllReviews from "../student/all-review";
import ReviewCreation from "../student/review-create";
import { useCurrentUser } from "@/hooks/use-current-user";

const CourseDetails = ({course}: {course: any}) => {
  const [selected, setSelected] = useState("Overview");
  const [view, setView] = useState(0);
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
const user = useCurrentUser();
  
  let numberOfLessons = 0;
  let numberOfQuizzes = 0;

  for (const chapter of course.chapter) {
    for (const lesson of chapter.Lesson) {
     if (lesson) {
      numberOfLessons = numberOfLessons + 1;
     }
    }
   if (chapter.quizId) {
    numberOfQuizzes = numberOfQuizzes  + 1;
   }
  }
 useEffect(() => {
  const fetchRelatedCourses = async () => {
    let data = await fetchCourseByCategoryName(course.category.name);
    const newData = data?.filter((courseItem) => courseItem.id !== course.id);
   if (newData) {
    setRelatedCourses(newData);
   }

  }
  fetchRelatedCourses();
 }, [])


  return (
    <>
      <div className="courses-banner " style={{width:'100%', backgroundRepeat:'no-repeat', backgroundSize:'cover',  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${course.imageUrl})`, backgroundPosition: 'center'}}>
        <Container>
          <div className="flex flex-col md:flex-row  items-center md:justify-between  justify-center gap-5 my-5">
              <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-5">
                  <div className="flex gap-2 flex-nowrap">
                    <p className="rounded-full py-2 px-4 bg-primary/10 text-primary text-sm">{course.category.name}</p>
                   
                   
                  </div>
                  <h2 className=" text-white text-center md:text-start font-extrabold text-2xl md:text-3xl ">{course.name}</h2>
                  <div className="flex gap-4 flex-nowrap">
                   <p className="text-white flex items-center justify-center gap-2 flex-nowrap">
                   <Calendar className="w-4 h-4 mb-1 text-danger"/>
                    <span className="text-sm ">{course.duration}</span>
                   </p>
                   <p className="text-white flex items-center justify-center gap-2 flex-nowrap">
                   <Signal className="w-4 h-4 mb-1 text-warning"/>
                    <span className="text-sm ">{course.difficulty}</span>
                   </p>
                  </div>
                 
                 <p className="flex items-center gap-2 flex-nowrap">
                  {/**upafe later */}
                   <span className="flex gap-2 flex-nowrap ">
                      <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-ranking"/>
                        <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-ranking"/>
                        <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-ranking"/>
                        <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-grey"/>
                        <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-grey"/>
                    </span>

                    <span className="text-sm text-white inline-flex">(4 Ratings)</span>
                  </p>
                   
                
              </div>

              <div className="flex md:flex-col items-center justify-center gap-4">
                <button className="border border-transparent  whitespace-nowrap rounded-md px-10 py-3 bg-primary text-white font-bold text-sm m m-2 hover:bg-primary/50">Start Now</button>
              
               <HoverCard>
                  <HoverCardTrigger>
                  <button className="flex items-center flex-nowrap whitespace-nowrap gap-3 px-10 py-3 border border-white rounded-md text-white font-bold text-sm bg-transparent">Share <FontAwesomeIcon icon={faShare} className="w-6 h-6"/></button>
                  </HoverCardTrigger>
                  <HoverCardContent className="flex items-center flex-nowrap whitespace-nowrap gap-3 px-10 py-3 border  border-white bg-white rounded-md  my-1">
                      <FontAwesomeIcon icon={faFacebook} className="w-6 h-6 text-facebook"/>
                      <FontAwesomeIcon icon={faSquareXTwitter} className="w-6 h-6 text-black"/>
                      <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6 text-linkedIn"/>
                  </HoverCardContent>
                </HoverCard>
              
              </div>
            </div>
        </Container>
        </div>

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-12">
            <section className="xl:col-span-8 lg:col-span-7 flex flex-col gap-5">
              <div className="grid grid-cols-3 gap-3 items-start justify-start">
                <CourseViewButton name="Overview" selected={selected} setSelected={setSelected}/>
                <CourseViewButton name="Curriculum" selected={selected} setSelected={setSelected}/>
                <CourseViewButton name="Reviews" selected={selected} setSelected={setSelected}/>
              </div>

             {
              selected === 'Overview' && 
              <article className="bg-white p-8 rounded-lg !text-[16px]">
              <h2 className="text-lg font-bold font-poppins">Course Overview</h2>
          
              <div className="quill">
                <div className="ql-container ql-bubble">
                <div className="desc mt-2 ql-editor  !leading-[1.5] !text-[16px]" dangerouslySetInnerHTML={{__html: course.description}}/>
                </div>

              </div>
            
            </article>
             }

            {
              selected === 'Curriculum' && 
              <article className="bg-white p-8 rounded-lg text-lg">
              <h2 className=" font-bold font-poppins">Curriculum</h2>
             <div className="my-3 flex flex-col gap-4">
               {
                course.chapter && course.chapter.length &&
                course.chapter.map((chapter: any) => (
                  <CurriculumDetails key={chapter.id} chapter={chapter} index={chapter.position} view={view} setView={setView}/>
                
                ))
               }

             </div>
            </article>
             }

{
              selected === 'Reviews' && 
              <>
               <article className="grid grid-cols-1 xl:grid-cols-12  bg-white p-8 rounded-lg gap-5">
                  <div className="xl:col-span-3 flex flex-col items-center justify-center gap-2 xl:border-r xl:border-grey">
                    <p className="text-6xl font-bold">3.0</p>
                    <p className="flex gap-2 flex-nowrap">
                  
                        <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-ranking"/>
                        <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-ranking"/>
                        <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-ranking"/>
                        <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-grey"/>
                        <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-grey"/>
                   
                  </p>

                    <p className="text-sm">2 ratings</p>

                  </div>
                  <div className="xl:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 px-5">
                    <div>
                      <span className="text-sm">5 Stars</span>
                      <p className="flex items-center justify-center gap-2">
                        <Progress className="h-2" value={20}/>
                       <Badge className="bg-grey ">20%</Badge>
                      </p>
                    </div>

                    <div>
                      <span className="text-sm">4 Stars</span>
                      <p className="flex items-center justify-center gap-2">
                        <Progress className="h-2" value={30}/>
                        <Badge className="bg-grey ">30%</Badge>
                      </p>
                    </div>
                    <div>
                      <span className="text-sm">3 Stars</span>
                      <p className="flex items-center justify-center gap-2">
                        <Progress className="h-2" value={12}/>
                        <Badge className="bg-grey ">12%</Badge>
                      </p>
                    </div>
                    <div>
                      <span className="text-sm">2 Stars</span>
                      <p className="flex items-center justify-center gap-2">
                        <Progress className="h-2" value={25}/>
                        <Badge className="bg-grey ">25%</Badge>
                      </p>
                    </div>
                    <div>
                      <span className="text-sm">1 Star</span>
                      <p className="flex items-center justify-center gap-2">
                        <Progress className="h-2" value={13}/>
                        <Badge className="bg-grey ">13%</Badge>
                      </p>
                    </div>

                  </div>
              </article>
              <AllReviews reviews={course.reviews}/>

              <ReviewCreation 
                  
                  courseId={course.id}  
                  reviews={course.reviews.filter((review) => review.reviewerId === user?.id && course.id === review.courseId)[0]}/>

             
             
              </>
             
             }

              {
                relatedCourses  && relatedCourses.length > 0 &&
                <div>
                <h2 className="text-lg font-bold font-poppins">Related Courses</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-4" >
              
                  {
                    relatedCourses.map((item: any) => (
                      <CourseCard
                      key={item.id}
                      id={item.id}
                      image={item.imageUrl}
                      category={item.category?.name}
                      status={item.courseStatus}
                      duration={item.duration}
                      level={item.difficulty}
                      name={item.name}
                      cost={item.paymentStatus === 'Free' ? 'Free' : formatter(item.price?.toString())}
                  />
                    ))
                  }
                </div>
                </div>
              }
            </section>

            <section className="xl:col-span-4 lg:col-span-5 ">
              <section className="rounded-lg bg-white sticky lg:top-[17.4%]">
              <div>
                <div className="aspect-video rounded-t-lg">
                  <img src="/images/program2.jpg" alt='details' className="rounded-t-lg w-full h-full"/>
                </div>
                
                  <p className="px-8 my-3 pb-2 text-3xl font-extrabold text-primary border-b border-grey">{course.paymentStatus === 'Free' ? 'Free' : formatter(course.price)}</p>
              </div>
              <div className="py-3 px-8">     
               

               <div className=" flex flex-col  gap-5 my-4">
                 <div className="flex items-center justify-between gap-4">
                        <div className="flex gap-2 items-center">
                          <span className="bg-primary/10 p-2 rounded-full border border-dashed border-primary"><TimerIcon size={18} className="text-primary w-4 h-4"/></span>
                          <span className="text-sm">Duration</span>
                        </div>

                        <p className="font-semibold text-sm">{course.duration}</p>
                 </div>
                 <div className="flex items-center justify-between gap-4">
                        <div className="flex gap-2 items-center">
                          <span className="bg-primary/10 p-2 rounded-full border border-dashed border-primary"><Book size={18} className="text-primary w-4 h-4"/></span>
                          <span className="text-sm">Lessons</span>
                        </div>

                        <p className="font-semibold text-sm">{numberOfLessons}</p>
                 </div>
                 <div className="flex items-center justify-between gap-4">
                        <div className="flex gap-2 items-center">
                          <span className="bg-primary/10 p-2 rounded-full border border-dashed border-primary"><CircleHelp size={18} className="text-primary w-4 h-4"/></span>
                          <span className="text-sm">Quizzes</span>
                        </div>

                        <p className="font-semibold text-sm">{numberOfQuizzes}</p>
                 </div>
                 <div className="flex items-center justify-between gap-4">
                        <div className="flex gap-2 items-center">
                          <span className="bg-primary/10 p-2 rounded-full border border-dashed border-primary"><Languages size={18} className="text-primary w-4 h-4"/></span>
                          <span className="text-sm">Languages</span>
                        </div>

                        <p className="font-semibold text-sm">English</p>
                 </div>
                 <div className="flex items-center justify-between gap-4">
                        <div className="flex gap-2 items-center">
                          <span className="bg-primary/10 p-2 rounded-full border border-dashed border-primary"><Signal size={18} className="text-primary w-4 h-4"/></span>
                          <span className="text-sm">Skill Level</span>
                        </div>

                        <p className="font-semibold text-sm">{course.difficulty}</p>
                 </div>
                 <div className="flex items-center justify-between gap-4">
                        <div className="flex gap-2 items-center">
                          <span className="bg-primary/10 p-2 rounded-full border border-dashed border-primary"><GraduationCap size={18} className="text-primary w-4 h-4"/></span>
                          <span className="text-sm">Certificate</span>
                        </div>

                        <p className="font-semibold text-sm">No</p>
                 </div>

               </div>

            
              <h2 className="font-bold text-lg font-poppins">More Information</h2>
              <div className="flex gap-5 flex-col my-4">
                 <div className="flex gap-2 items-center">
                             <span className="bg-primary/10 p-2 rounded-full border border-dashed border-primary"><Check size={18} className="text-primary w-4 h-4 font-bold"/></span>
                             <span className="text-sm">Full lifetime Access</span>
                   </div>
                   <div className="flex gap-2 items-center">
                             <span className="bg-primary/10 p-2 rounded-full border border-dashed border-primary"><Check size={18} className="text-primary w-4 h-4 font-bold"/></span>
                             <span className="text-sm">Downloadable resources</span>
                   </div>
                   <div className="flex gap-2 items-center">
                             <span className="bg-primary/10 p-2 rounded-full border border-dashed border-primary"><Check size={18} className="text-primary w-4 h-4 font-bold"/></span>
                             <span className="text-sm">Certificate on Completion</span>
                   </div>
                   <div className="flex gap-2 items-center">
                             <span className="bg-primary/10 p-2 rounded-full border border-dashed border-primary"><Check size={18} className="text-primary w-4 h-4 font-bold"/></span>
                             <span className="text-sm">Free Trial for 7 days</span>
                   </div>




              </div>
              <button className="w-full py-3 bg-primary text-white mx-auto rounded-md font-medium">Start Now</button>
            
             

             </div>
              </section>
           
             
            </section>

          </div>
        </Container>
    </>
  )
}

export default CourseDetails;