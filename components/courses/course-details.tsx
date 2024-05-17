"use client";

import Container from "@/components/ui/container";
import { faShare, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Book, Calendar,  Check,  CircleHelp,  GraduationCap,  Languages, Signal, TimerIcon } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { faFacebook, faLinkedin, faSquareXTwitter } from "@fortawesome/free-brands-svg-icons";
import { CourseCard } from "./course-card";
import { useEffect, useState } from "react";
import CourseViewButton from "./button-course";

import CurriculumDetails from "./curriculum";
import { Progress } from "../ui/progress";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi,
} from "../ui/carousel";
import ReviewCard from "../review-card";
import Ratings from "./ratings";
import { Badge } from "../ui/badge";

const CourseDetails = () => {
  const [selected, setSelected] = useState("Overview");
  const [view, setView] = useState(0);

  /**new */
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
 
  useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <>
      <div className="courses-banner" style={{width:'100%', backgroundRepeat:'no-repeat', backgroundSize:'cover',  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(images/course-details.jpg)`, backgroundPosition: 'center'}}>
        <Container>
          <div className="flex flex-col md:flex-row  items-center md:justify-between  justify-center gap-5 my-5">
              <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-5">
                  <div className="flex gap-2 flex-nowrap">
                    <p className="rounded-full py-2 px-4 bg-primary/10 text-primary text-sm">Software</p>
                    <p className="rounded-full py-2 px-4 bg-primary/10 text-primary text-sm">Web Designing</p>
                   
                  </div>
                  <h2 className=" text-white text-center md:text-start font-extrabold text-2xl md:text-3xl ">Introduction to Front-End Development</h2>
                  <div className="flex gap-4 flex-nowrap">
                   <p className="text-white flex items-center justify-center gap-2 flex-nowrap">
                   <Calendar className="w-4 h-4 mb-1 text-danger"/>
                    <span className="text-sm ">6 Weeks</span>
                   </p>
                   <p className="text-white flex items-center justify-center gap-2 flex-nowrap">
                   <Signal className="w-4 h-4 mb-1 text-warning"/>
                    <span className="text-sm ">Intermediate</span>
                   </p>
                  </div>
                 
                 <p className="flex items-center gap-2 flex-nowrap">
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
              <article className="bg-white p-8 rounded-lg text-[16px]">
              <h2 className="text-lg font-bold font-poppins">Course Overview</h2>
              <p className="my-4 font-light leading-7">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
              <p className="my-4 font-light leading-7">Aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto. Sam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
              <p className="my-4 font-light leading-7">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>

            </article>
             }

            {
              selected === 'Curriculum' && 
              <article className="bg-white p-8 rounded-lg text-lg">
              <h2 className=" font-bold font-poppins">Curriculum</h2>
             <div className="my-3 flex flex-col gap-4">
                <CurriculumDetails title="Introduction to HTML" index={1} view={view} setView={setView}/>
                <CurriculumDetails title="HTML Basics" index={2} view={view} setView={setView}/>
                <CurriculumDetails title="Links and Images" index={3} view={view} setView={setView}/>
                <CurriculumDetails title="Tables and Forms" index={4} view={view} setView={setView}/>
                <CurriculumDetails title="Semantic HTML" index={5} view={view} setView={setView}/>
                <CurriculumDetails title="HTML5 Features" index={6} view={view} setView={setView}/>
                <CurriculumDetails title="Responsive Design with HTML" index={7} view={view} setView={setView}/>
                <CurriculumDetails title="Project: Building Your First Web Page" index={8} view={view} setView={setView}/>


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

             
             <article className="flex flex-col gap-4 mb-6">
             <h2 className="text-lg font-bold font-poppins">3 Reviews</h2>
             <Carousel opts={{ align: "start", loop: true,}}  setApi={setApi}
                className="grid grid-cols-1 items-center justify-center relative mb-5">
              <CarouselContent>
                <CarouselItem>
                <ReviewCard name={'Sarah Williams'} role={'Web Developer'}/>
                </CarouselItem>
                <CarouselItem>
                <ReviewCard name={'Zendaya Jackie'} role={'Web Developer'}/>
                </CarouselItem>
                <CarouselItem>
                <ReviewCard name={'Emma Watson'} role={'Web Developer'}/>
                </CarouselItem>
              </CarouselContent>
              <div className="absolute -bottom-14 left-1/2  -translate-x-1/2 -translate-y-1/2 flex items-center flex-nowrap gap-5">
              <CarouselPrevious/>
              <p className="text-lg font-bold">{current} <span className="text-sm font-normal mx-2">of</span> {count}</p>
              <CarouselNext/>
              </div>
             </Carousel>
             </article>

             <article className="bg-white p-8 rounded-lg">
             <h2 className="text-lg font-semibold font-poppins">Add a review</h2>
             <div className="flex flex-col gap-3  my-2">
              <p className="text-sm ">How was the course?</p>
              <Ratings/>
             </div>
             <textarea placeholder="Write a review" className="border border-grey rounded-lg outline-none my-2 p-4 w-full"></textarea>
             <button className="whitespace-nowrap mx-auto px-10 py-3 border font-semibold text-sm  border-transparent bg-primary text-white rounded-md hover-button  transition-all ease-in duration-75">Submit Review</button>
             </article>
              </>
             
             }

              <div>
              <h2 className="text-lg font-bold font-poppins">Related Courses</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-4" >
              <CourseCard 
          image='/images/program.jpg' category='Web Development' 
          status='Open' duration='6 Weeks' level='Beginner'
          name='Front-End Development'
          />

        <CourseCard 
          image='/images/program1.jpg' category='Programming' 
          status='Closed' duration='2 Months' level='Expert'
          name='Python Programming'
          />
              </div>
              </div>
            </section>

            <section className="xl:col-span-4 lg:col-span-5 ">
              <section className="rounded-lg bg-white sticky lg:top-[17.4%]">
              <div>
                <div className="aspect-video rounded-t-lg">
                  <img src="/images/program2.jpg" alt='details' className="rounded-t-lg w-full h-full"/>
                </div>
                
                  <p className="px-8 my-3 pb-2 text-3xl font-extrabold text-primary border-b border-grey">Free</p>
              </div>
              <div className="py-3 px-8">     
               

               <div className=" flex flex-col  gap-5 my-4">
                 <div className="flex items-center justify-between gap-4">
                        <div className="flex gap-2 items-center">
                          <span className="bg-primary/10 p-2 rounded-full border border-dashed border-primary"><TimerIcon size={18} className="text-primary w-4 h-4"/></span>
                          <span className="text-sm">Duration</span>
                        </div>

                        <p className="font-semibold text-sm">12 Weeks</p>
                 </div>
                 <div className="flex items-center justify-between gap-4">
                        <div className="flex gap-2 items-center">
                          <span className="bg-primary/10 p-2 rounded-full border border-dashed border-primary"><Book size={18} className="text-primary w-4 h-4"/></span>
                          <span className="text-sm">Lessons</span>
                        </div>

                        <p className="font-semibold text-sm">5</p>
                 </div>
                 <div className="flex items-center justify-between gap-4">
                        <div className="flex gap-2 items-center">
                          <span className="bg-primary/10 p-2 rounded-full border border-dashed border-primary"><CircleHelp size={18} className="text-primary w-4 h-4"/></span>
                          <span className="text-sm">Quizzes</span>
                        </div>

                        <p className="font-semibold text-sm">5</p>
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

                        <p className="font-semibold text-sm">Beginner</p>
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