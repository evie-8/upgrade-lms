"use client";

import { useEffect, useState } from 'react';
import Container from '../ui/container';
import { Category, Course} from '@prisma/client';
import { fetchCourseByCategoryName } from '@/action-server/courses';
import { CourseCard } from '../courses/course-card';
import { formatter } from '@/lib/utils';
import Animation from '../ui/animation';

interface Props {
    categories: Category[]
}
const CourseSectionHomePage = ({categories}: Props) => {
    const [categoryName, setCategoryName] = useState("All");
    const [courses, setCourses] = useState<Course[] | any>([])
    

    useEffect(() => {
       const fetchCourses  = async() => {
        try {
            
            const data = await fetchCourseByCategoryName(categoryName);
            setCourses(data)
            
        } catch  {
            return 
        }

       }
        fetchCourses();
    },[categoryName])
    return (
        <div className='course-section'>
            <div className='h-[10vh] bg-white'></div>
            <div className='flex items-center justify-center bg-white h-[13vh]'>
                <Container>
                <div className='category-name'>
                        <p
                            className={categoryName === 'All' ? 'active' : ''}
                            onClick={() => setCategoryName('All')}
                        >
                            All
                        </p>
                        {categories.length > 0 &&
                            categories.map((category) => (
                                <p
                                    key={category.id}
                                    className={categoryName === category.name ? 'active' : ''}
                                    onClick={() => setCategoryName(category.name)}
                                >
                                    {category.name}
                                </p>
                            ))}
                    </div>
                </Container>
            </div>
            <Container>
                <div className='heading'>
                    <h3>Explore Featured <span>Courses</span></h3>
                    <p>Unlock Your Potential, Anytime, Anywhere: Explore Limitless Learning with Our Online Courses.</p>
                </div>
                
                <Animation>
                        <div className='courses-wrapper'>
                    {courses.length > 0 ? (
                        courses.map((course: any) => (
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
                        ))
                    ) : (
                        <p>No courses available.</p>
                    )}
                </div>
                </Animation>
            </Container>
        </div>
    );
};

export default CourseSectionHomePage;
