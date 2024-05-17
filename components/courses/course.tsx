"use client"
import Container from "@/components/ui/container"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,  faFilter,  faSearch, faThLarge } from '@fortawesome/free-solid-svg-icons';

import { useState } from "react";
import {CourseCard, CourseCardList} from "./course-card";
import FilterContainer from "./filter-card";
import { SidebarClose,  SidebarOpen } from "lucide-react";
import Banner from "@/components/ui/banner";



const Courses = () => {
 
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);

  const [sideBar, setSideBar] = useState(false);

  const handleSideBar = () => {
    setSideBar(prev => !prev)
  }
 
  const handleClick = () => {
    setShow(prev => !prev);
  }

  const handleView = () => {
    setView(prev => !prev);
  }
  
  return (
    <section className="relative">
  <div className={`overlay ${sideBar ? 'block' :'hidden'}`} />
    <div className="courses-banner" style={{width:'100%', backgroundRepeat:'no-repeat', backgroundSize:'cover',  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(images/courses.jpg)`, backgroundPosition: 'center'}}>
        <Container>
          <div className="heading">
              <h3>Explore Our Courses</h3>
          </div>
        </Container>
    </div>
        {/**course section */}

      <Container>
     
       <div className='all-courses-container'>
     
          <nav className={` ${sideBar ? 'right-0' : '-right-[100%]'} ${show ? 'lg:hidden' : 'show'}`} tabIndex={0} onBlur={ () => setSideBar(false)}>
          
              <div className="sidebar">
            
                    <section className="search">
                      <input placeholder="Search courses..." />
                    
                    <FontAwesomeIcon icon={faSearch} className="icon"/>
                    
                    </section>

                    <div className="title-area">
                    <div className="heading-wrapper">
                    <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="-49 141 512 512" 
                          width="20" height="20" 
                          color="#3c4852"
                          aria-hidden="true" 
                          className="">
                            <path d="M413 232H177.7c-10.321-29.098-38.109-50-70.7-50s-60.379 20.902-70.7 50H1c-13.807 0-25 11.193-25 25s11.193 25 25 25h35.3c10.32 29.098 38.109 50 70.7 50s60.379-20.902 70.7-50H413c13.807 0 25-11.193 25-25s-11.193-25-25-25m-306 50c-13.785 0-25-11.215-25-25s11.215-25 25-25 25 11.215 25 25-11.215 25-25 25m306 230H177.7c-10.32-29.098-38.109-50-70.7-50s-60.379 20.902-70.7 50H1c-13.807 0-25 11.193-25 25s11.193 25 25 25h35.3c10.32 29.098 38.109 50 70.7 50s60.379-20.902 70.7-50H413c13.807 0 25-11.193 25-25s-11.193-25-25-25m-306 50c-13.785 0-25-11.215-25-25s11.215-25 25-25 25 11.215 25 25-11.215 25-25 25m306-190h-35.3c-10.32-29.098-38.109-50-70.7-50s-60.379 20.902-70.7 50H1c-13.807 0-25 11.193-25 25s11.193 25 25 25h235.3c10.32 29.098 38.109 50 70.7 50s60.379-20.902 70.7-50H413c13.807 0 25-11.193 25-25s-11.193-25-25-25m-106 50c-13.785 0-25-11.215-25-25s11.215-25 25-25 25 11.215 25 25-11.215 25-25 25"></path>
                          </svg>
                  <span>Filters</span>
                    </div>

                  {
                    <button onClick={handleClick} className="hidden lg:flex items-center sm:hidden" title="hide filter sidebar">
                        <SidebarClose className="text-primary"/>
                    </button>
                  }

                  {
                    /*small screens */
                    <button onClick={handleSideBar} className="flex sm:flex items-center lg:hidden" title="hide filter sidebar">
                        <SidebarClose className="text-primary"/>
                    </button>
                  }
                    </div>

                    <FilterContainer/>
             
                
              </div>
          </nav>

          <main className={` ${show ? 'show' : ''}`}>
              <div className='title-bar'>
                  <div className="title">

                    <button onClick={handleClick} title="show filter sidebar">
                     {
                      show &&  <SidebarOpen/>
                     }
                    </button>  
                    <span>
                       10 courses
                    </span></div>
                  <div className="menu-items">
                    <div className="select-wrapper">
                      <p>Sort By :</p>
                        <select  name="" id="">
                          <option  value="Default">Default</option>
                          <option value="Newest">Newest</option>
                          <option  value="Oldest">Oldest</option>
                        </select>
                      
                    </div>
                    <p className="icon-1" onClick={handleSideBar} title="show filter bar">
                      <FontAwesomeIcon icon={faFilter} className="icon"/>
                    </p>
                  <p className="icon-2" onClick={handleView}> 
                      {
                      view ? <FontAwesomeIcon icon={faThLarge} className="icon" title="grid-view"/> 
                          :
                        <FontAwesomeIcon icon={faBars} className="w-5 h-5 text-primary" title="list view"/>
                      }
                      </p>
                 
              </div>
              </div>
             
               { view ?
               <section className='list-view'>
                   <CourseCardList 
          image='/images/program.jpg' category='Web Development' 
          status='Open' duration='6 Weeks' level='Beginner'
          name='Front-End Development'
          />

        <CourseCardList 
          image='/images/program1.jpg' category='Programming' 
          status='Closed' duration='2 Months' level='Expert'
          name='Python Programming'
          />

        <CourseCardList
          image='/images/program2.jpg' category='Data' 
          status='Coming Soon' duration='3 Months' level='Intermediate'
          name='Data AI and Machine Learning'cost='UGX 150,000'
          />

        <CourseCardList 
          image='/images/program3.jpg' category='Software' 
          status='Open' duration='3 Months' level='Beginner'
          name='Introduction To JavaScript'
          />

              </section>
              :
              <section className='grid-view'>
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

        <CourseCard 
          image='/images/program2.jpg' category='Data' 
          status='Coming Soon' duration='3 Months' level='Intermediate'
          name='Data AI and Machine Learning'cost='UGX 150,000'
          />

        <CourseCard 
          image='/images/program3.jpg' category='Software' 
          status='Open' duration='3 Months' level='Beginner'
          name='Introduction To JavaScript'
          />

              </section>

               }
          </main>
          
        </div>
       
      </Container>

      <Banner image={'images/banner1.jpg'} title='Need help finding a course?' action='Find Your Programme'
  slogan='Discover your perfect course! Explore our diverse range of offerings and start your learning journey today. Let us guide you to success' /> 
   

    </section>
  )
}

export default Courses;
