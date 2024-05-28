import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusinessTime, faJournalWhills, faLayerGroup} from '@fortawesome/free-solid-svg-icons';
import ReviewCard from '@/components/review-card';
import Banner from '@/components/ui/banner';
import Steps from './steps';
import StepsImage from './steps-image';

import CourseSectionHomePage from './home-courses-section';
import prismadb from '@/lib/db';

const Home =  async () => {
 const categories = await prismadb.category.findMany();
  return (
   <>

      <Container>
      <div className='hero'>
        <div className='grid-1'>
            <div>
              <p>
                Discover <span>Thrilling</span>
              </p>
              <p>
                Online Courses
              </p>
            </div>
            <p>
            Explore a world of dynamic online classes. Elevate your skills and expand your horizons from anywhere.
            </p>
            
            <button><Link href={'/courses'}>Find A Course</Link></button>
        
        </div>
        <div className='grid-2'>
            <Image src='/images/hero-img-blue.png' width={400} height={150} alt='hero'/>
        </div>
      </div> 

     <div className='hero-facts'>
     <div className='hero-facts-grid'>
        <div className='contents'>
          <p className='icon border-purple bg-purple/10'>
             <FontAwesomeIcon icon={faBusinessTime}  className='text-purple w-7 h-7'/>
          </p>
          <div className='facts'>
            <p>Full Lifetime Access</p>
            <p >Unlock a Lifetime of Learning: Forever Access to Enrichment</p>
          </div>
        </div>

        <div className='contents'>
          <p className='icon border-light-green bg-light-green/10 '>
             <FontAwesomeIcon icon={faJournalWhills}  className='text-light-green w-7 h-7'/>
          </p>
          <div className='facts'>
            <p>400+ Courses Available</p>
            <p>Dive into Diversity: Over 400 Courses to Fuel Your Passion</p>
          </div>
        </div>

        <div className='contents'>
          <p className='icon border-blue bg-blue/10'>
             <FontAwesomeIcon icon={faLayerGroup}  className='text-blue w-7 h-7'/>
          </p>
          <div className='facts'>
            <p>Best Online Courses</p>
            <p>Discover Excellence with Our Best Online Courses</p>
          </div>
        </div>

      </div>
     </div>
      </Container>
        
    <CourseSectionHomePage categories={categories}/>

  <Banner image={'images/banner1.jpg'} link='/courses' title='Need help finding a course?' action='Find Your Programme'
  slogan='Discover your perfect course! Explore our diverse range of offerings and start your learning journey today. Let us guide you to success' /> 
   

    <div className='steps-section'>

      <Container>
      <div className='heading'>
         <h3>How It<span> Works</span></h3>
          <p>Embark on Your Learning Journey, Sign Up for Online Courses Today!</p>
       </div>
       {/**How it works */}
        <div className='wrapper'>
            <StepsImage/>
            <Steps/>
      </div>
   
      </Container>
    </div>

    <Banner action={'Browse Our Courses'} link='/courses' title={'Start your learning journey today'}  image={'images/banner.jpg'}
    slogan={'Start your learning journey with our expert online courses! Dive into a world of knowledge from home and elevate your skills. Join us today!'}/>
   

    <div className='reviews'>
      <Container>
      <div className='heading my-7'>
         <h3>What Our <span>Students</span> Say</h3>
          <p>Unlock firsthand experiences as our students share their transformative journey with our courses</p>
       </div>
        <div className='scroll'>
            <div className='inner' >
              
              <ReviewCard name={'Sarah Williams'} role={'Web Developer'}/>
              <ReviewCard name={'Sarah Williams'} role={'Web Developer'}/>
               <ReviewCard name={'Sarah Williams'} role={'Web Developer'}/>
            </div>

            <div className='inner' >
              
            <ReviewCard name={'Sarah Williams'} role={'Web Developer'}/>
              <ReviewCard name={'Sarah Williams'} role={'Web Developer'}/>
               <ReviewCard name={'Sarah Williams'} role={'Web Developer'}/>
            </div>
        </div>
      </Container>

    </div>

  </>
  )
}

export default Home