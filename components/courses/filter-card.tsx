"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faStar} from '@fortawesome/free-solid-svg-icons';
import FilterCard from './filter';

interface Props {
      selectedCategory:  string;
      selectedSkillLevel: string;
      selectedPrice: string ;
      selectedRating:  number;
      setSelectedCategory:React.Dispatch<React.SetStateAction<string>>;
      setSelectedSkillLevel: React.Dispatch<React.SetStateAction<string>>;
      setSelectedPrice: React.Dispatch<React.SetStateAction<string>>;
      setSelectedRating: React.Dispatch<React.SetStateAction<number>>;
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
      
      const handleFilterChange = (category: string, value: any) => {
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
      <FilterCard
        title={'Top Categories'}
        data={['All', 'Web Development', 'Programming', 'Data'].map(category => ({ label: category, value: category }))}
        selectedValue={selectedCategory}
        onFilterChange={handleFilterChange}
      />
      <FilterCard
        title={'Skill Level'}
        data={['All', 'Beginner', 'Intermediate', 'Expert'].map(level => ({ label: level, value: level }))}
        selectedValue={selectedSkillLevel}
        onFilterChange={handleFilterChange}
      />
      <FilterCard
        title={'Prices'}
        data={['All', 'Free', 'Paid'].map(price => ({ label: price, value: price }))}
        selectedValue={selectedPrice}
        onFilterChange={handleFilterChange}
      />
      <FilterCard
        title={'Ratings'}
        data={[
          { label: <div className='flex items-center gap-2'>{[...Array(5)].map((_, index) => (<FontAwesomeIcon key={index} icon={faStar} className={`w-3 h-3 ${index < 5 ? 'text-ranking' : 'text-grey'}`} />))}</div>, value: 5 },
          { label: <div className='flex items-center gap-2'>{[...Array(5)].map((_, index) => (<FontAwesomeIcon key={index} icon={faStar} className={`w-3 h-3 ${index < 4 ? 'text-ranking' : 'text-grey'}`} />))}</div>, value: 4 },
          
          { label: <div className='flex items-center gap-2'>{[...Array(5)].map((_, index) => (<FontAwesomeIcon key={index} icon={faStar} className={`w-3 h-3 ${index < 3 ? 'text-ranking' : 'text-grey'}`} />))}</div>, value: 3 },
          { label: <div className='flex items-center gap-2'>{[...Array(5)].map((_, index) => (<FontAwesomeIcon key={index} icon={faStar} className={`w-3 h-3 ${index < 2 ? 'text-ranking' : 'text-grey'}`} />))}</div>, value: 2 },
          { label: <div className='flex items-center gap-2'>{[...Array(5)].map((_, index) => (<FontAwesomeIcon key={index} icon={faStar} className={`w-3 h-3 ${index < 1 ? 'text-ranking' : 'text-grey'}`} />))}</div>, value: 1 },
        ]}
        selectedValue={selectedRating}
        onFilterChange={handleFilterChange}
      />
    </section>
  )
}

export default FilterContainer