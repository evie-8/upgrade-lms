interface MetaProps {
    title: string;
    description: string;
    keywords: string;
}
const MetaData: React.FC<MetaProps> = (
    {
        title,
        description,
        keywords
}) => {
  return (
   <>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta  name="keywords" content={keywords}/>
   </>
  )
}

export default MetaData