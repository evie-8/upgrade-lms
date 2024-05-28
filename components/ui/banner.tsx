import Container from "@/components/ui/container"
import Link from "next/link";

interface BannerProps {
    title: String;
    slogan: String;
    action: String;
    image: String;
    link: string;
}

const Banner: React.FC<BannerProps> = ({title, slogan, action, image, link}) => {
  return (
    
    <div  style={{width:'100%', height: '100%', backgroundRepeat:'no-repeat', backgroundSize:'cover',  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image})`, backgroundPosition: 'center'}}>
    <Container>
     <div className='banner-container '>
     <div className='banner-wrapper'>
       <h3>{title}</h3>
       <p>{slogan}</p>
       <button><Link href={link}>{action}</Link></button>

     </div>
     </div>
    </Container>
 </div>
  )
}

export default Banner