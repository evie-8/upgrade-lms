interface StepsProps {
    children: React.ReactNode;
    title: string;
    description: String;
}

const StepsCard: React.FC<StepsProps> = ({children, title, description}) => {
  return (
    <div className='step-wrapper'>
    <button> 
     {children}
    </button>
    <div className='contents'>
      <p className="title">{title}</p>
      <p className="description">
       {description}
        </p>
    </div>
</div>

  )
}

export default StepsCard