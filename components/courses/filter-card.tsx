"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faStar} from '@fortawesome/free-solid-svg-icons';
import FilterCard from './filter';

interface Props {
      selectedCategory: string;
      selectedSkillLevel: string;
      selectedPrice: string;
      selectedRating: string;
      setSelectedCategory:React.Dispatch<React.SetStateAction<string>>;
      setSelectedSkillLevel: React.Dispatch<React.SetStateAction<string>>;
      setSelectedPrice: React.Dispatch<React.SetStateAction<string>>;
      setSelectedRating: React.Dispatch<React.SetStateAction<string>>;
}

const FilterContainer = ({
      selectedCategory,
       selectedPrice,
        selectedSkillLevel,
         selectedRating,
         setSelectedCategory,
         setSelectedSkillLevel,
         setSelectedPrice,
         setSelectedRating
      
}: Props) => {
      
      const handleFilterChange = (category: string, value: string) => {
            switch (category) {
                case 'Top Categories':
                    setSelectedCategory(value);
                    break;
                case 'Skill Level':
                    setSelectedSkillLevel(value);
                    break;
                case 'Prices':
                    setSelectedPrice(value);
                    break;
                case 'Ratings':
                    setSelectedRating(value);
                    break;
                default:
                    break;
            }
        };
  return (
    <section className="filters-container">
     <FilterCard title={'Top Categories'} data={['All', 'Web Development' ,'Programming', 'Data']} 
      selectedValue={selectedCategory}
      onFilterChange={handleFilterChange}
     />
    
      <FilterCard title={'Skill Level'} data={['All', 'Beginner', 'Intermediate', 'Expert']}
            selectedValue={selectedSkillLevel}
            onFilterChange={handleFilterChange}
      /> 

      <FilterCard title={'Prices'} data={['All', 'Free', 'Paid']}
      selectedValue={selectedPrice}
      onFilterChange={handleFilterChange}
      />
      {/** do later after building users page*/}
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
            
            </div> ]}
            selectedValue={selectedRating}
            onFilterChange={handleFilterChange}/>
  
       
    </section>
  )
}

export default FilterContainer