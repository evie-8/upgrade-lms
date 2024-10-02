interface Props {
  name: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}
const CourseViewButton: React.FC<Props> = ({ name, selected, setSelected }) => {
  return (
    <button
      className={`rounded-md border border-transparent py-3 text-[15px] font-semibold transition-all duration-[0.3s] ${
        selected === name ? "bg-primary text-white" : "bg-white"
      }`}
      onClick={() => setSelected(name)}
    >
      {name}
    </button>
  );
};

export default CourseViewButton;
