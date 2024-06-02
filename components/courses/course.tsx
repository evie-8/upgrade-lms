"use client"
import Container from "@/components/ui/container"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,  faFilter,  faSearch, faThLarge } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from "react";
import {CourseCard, CourseCardList} from "./course-card";
import FilterContainer from "./filter-card";
import { SidebarClose,  SidebarOpen } from "lucide-react";
import Banner from "@/components/ui/banner";
import { Course } from "@prisma/client";
import { formatter } from "@/lib/utils";

interface Props {
  courses: any[]
}

const Courses = ({courses}: Props) => {
      const [selectedCategory, setSelectedCategory] = useState<string | number>('All');
      const [selectedSkillLevel, setSelectedSkillLevel] = useState<string | number>('All');
      const [selectedPrice, setSelectedPrice] = useState<string | number>('All');
      const [selectedRating, setSelectedRating] = useState<number | number>(0);
 
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);
  const [selected, setSelected] = useState("asc");
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<Course[] | null>(courses);

 const getLength = () => {
  let coursesLength = '';
  if (filteredData && filteredData?.length !== 0) {
    if (filteredData?.length === 1) {
      coursesLength = `${filteredData.length} course`
    } else {
      coursesLength = `${filteredData.length} courses`
    }
  } else {
    coursesLength = `0 courses`
  }

  return coursesLength
 }

  const [sideBar, setSideBar] = useState(false);

  const handleSideBar = () => {
    setSideBar(prev => !prev)
  };
 
  const handleClick = () => {
    setShow(prev => !prev);
  };

  const handleView = () => {
    setView(prev => !prev);
  };

  const handleSearch = (event: any) => {
    const query =  event.target.value;
    setSearchQuery(query);
    
  };

  const filterCourses = () => {
    let newData = courses;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      newData = newData.filter((course: any) =>
        course.name.toLowerCase().includes(query) ||
        course.category.name.toLowerCase().includes(query) ||
        course.courseStatus.toLowerCase().includes(query) ||
        course.duration.toLowerCase().includes(query) ||
        course.difficulty.toLowerCase().includes(query)
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      newData = newData.filter((course: any) => course.category.name === selectedCategory);
    }

    if (selectedSkillLevel && selectedSkillLevel !== 'All') {
      newData = newData.filter(course => course.difficulty === selectedSkillLevel);
    }

    if (selectedPrice && selectedPrice !== 'All') {
      newData = newData.filter(course => course.paymentStatus === selectedPrice);
    }

   {
    
       if (selectedRating && selectedRating !== 0) {
      // Assuming ratings are stored as numbers and 'Ratings' filter values match these numbers.
      newData = newData.filter(course => course.rating === selectedRating);
    }
     
   }

    setFilteredData(newData);
  };

  /**sort */
  const sortBySelected = (order: string) => {
    if (order === 'asc') {
      if (filteredData) {
        filteredData.sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      }
    } else {
      if (filteredData) {
        filteredData.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    }
  } ;
  
  const handleSort = (event: any) => {
    const order = event.target.value;
    setSelected(order);
    sortBySelected(order);
  }

  useEffect(() => {
    filterCourses();
  }, [searchQuery, selectedCategory, selectedPrice, selectedSkillLevel, selectedRating ]);
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
                      <input  onChange={handleSearch} placeholder="Search courses..." />
                    
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

                    <FilterContainer
                        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                        selectedSkillLevel={selectedSkillLevel}  setSelectedSkillLevel={setSelectedSkillLevel}
                        selectedPrice={selectedPrice} setSelectedPrice={setSelectedPrice}
                        selectedRating={selectedRating} setSelectedRating={setSelectedRating}/>
             
                
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
                    <span> {getLength()}</span>
                  </div>
                  <div className="menu-items">
                    <div className="select-wrapper">
                      <p>Sort By :</p>
                        <select value={selected}  onChange={handleSort} name="" id="">
                          <option value="desc">Newest</option>
                          <option  value="asc">Oldest</option>
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
             
               {
                !filteredData || !filteredData.length ?
               
                <div className="w-full flex items-center justify-center mt-16  font-medium">
                  <p> No courses found</p>
              </div>
               
               :
               view ?
               <section className='list-view'>
                 
                 {
                  filteredData && filteredData.length && 
                  filteredData.map((course: any) => (
                    <CourseCardList
                    key={course.id}
                    id={course.id}
                    image={course.imageUrl}
                    category={course.category?.name}
                    status={course.courseStatus}
                    duration={course.duration}
                    level={course.difficulty}
                    name={course.name}
                    cost={course.paymentStatus === 'Free' ? 'Free' : formatter(course.price?.toString())}
                />
                  )) 
                  }


              </section>
              :
              <section className='grid-view'>
              {
                  filteredData && filteredData.length && 
                  filteredData.map((course: any) => (
                    <CourseCard
                    key={course.id}
                    id={course.id}
                    image={course.imageUrl}
                    category={course.category?.name}
                    status={course.courseStatus}
                    duration={course.duration}
                    level={course.difficulty}
                    name={course.name}
                    cost={course.paymentStatus === 'Free' ? 'Free' : formatter(course.price?.toString())}
                />
                  ))  }

              </section>
               

               }
          </main>
          
        </div>
       
      </Container>

      <Banner image={'images/banner1.jpg'} link="/courses" title='Need help finding a course?' action='Find Your Programme'
  slogan='Discover your perfect course! Explore our diverse range of offerings and start your learning journey today. Let us guide you to success' /> 
   

    </section>
  )
}

export default Courses;
