import Container from '@/components/ui/container'
import Image from 'next/image'
import Link from 'next/link'
import logo from "../public/logo.svg"

const Footer = () => {
  return (
    <div className='footer-wrapper'>
        <Container>
            
            <div className='footer'>
               
                <div>
                        <h3 className='title'>Our Courses</h3>
                        <div className='items'>
                            <p>Web Development</p>
                            <p>Programming</p>
                            <p>Business</p>
                            <p>Data</p>
                            <p>LifeStlye</p>
                            <p>Fashion</p>
                        </div>
                </div>

                <div>
                        <h3 className='title'>Quick Links</h3>
                        <div className='items'>
                            <p>About Us</p>
                            <p>Our Courses</p>
                            <p>Contact Us</p>
                            <p>Blogs</p>
                        </div>
                </div>
                <div>
                        <h3 className='title'>Our Articles</h3>
                        <div className='items'>
                            <p>Career</p>
                            <p>Business</p>
                            <p>Data</p>
                            <p>Help</p>
                        </div>
                </div>

                <div>

                     
                     <Link href={"/"} className="flex sm:items-start sm:justify-start items-center justify-center  gap-2 flex-nowrap">
                            <Image alt="logo" width={30} height={30} src={logo}/>
                            <p className={`font-bold !text-2xl `}>up<span className="text-primary">grade</span></p>
                    </Link>
                   

                    <h3>Join Us!</h3>
                    <p>Join the Journey: Explore, Learn, and Grow with Us</p>
                   
                    <button className='hidden'>Apply Now !</button>  
                </div>
              
            </div>
        </Container>
        <h6 className='copyright'>© 2024 –   
        <span className='font-extrabold'>up<span className='text-primary'>grade</span></span>. All Rights Reserved.</h6> 
         
   </div>
  )
}

export default Footer