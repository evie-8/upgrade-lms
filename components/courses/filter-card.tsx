import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faStar} from '@fortawesome/free-solid-svg-icons';
import FilterCard from './filter';

const FilterContainer = () => {
  return (
    <section className="filters-container">
     <FilterCard title={'Top Categories'} data={['All', 'Web Development' ,'Programming', 'Data']} />
    
      <FilterCard title={'Skill Level'} data={['All', 'Beginner', 'Intermediate', 'Expert']}/> 

      <FilterCard title={'Prices'} data={['All', 'Free', 'Paid']}/>
      
      <FilterCard title={'Ratings'} data={[ 
              <div className='flex items-center gap-2' key={'item-1'}>
                    <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-ranking'/>
                    <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-ranking'/>
                    <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-ranking'/>
                    <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-ranking'/>
                    <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-ranking'/>
              </div>,  
              <div  className='flex items-center gap-2' key={'item-2'}>
                   <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-ranking'/>
                    <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-ranking'/>
                    <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-ranking'/>
                    <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-ranking'/>
                    <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-grey'/>
              </div>,
              <div  className='flex items-center gap-2' key={'item-3'}>
                    <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-ranking'/>
                    <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-ranking'/>
                    <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-ranking'/>
                    <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-grey'/>
                    <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-grey'/>
              
              </div>,
            
              <div className='flex items-center gap-2' key={'item-4'}>
              <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-ranking'/>
                    <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-ranking'/>
                    <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-grey'/>
                    <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-grey'/>
                    <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-grey'/>
              
              </div>,
            <div className='flex items-center gap-2' key={'item-5'}>
                  <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-ranking'/>
                  <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-grey'/>
                  <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-grey'/>
                  <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-grey'/>
                  <FontAwesomeIcon icon={faStar} className='w-3 h-3 text-grey'/>
            
            </div> ]}/>,
  
       
    </section>
  )
}

export default FilterContainer