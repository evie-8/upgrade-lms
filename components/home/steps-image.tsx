import Image from "next/image";

const StepsImage = () => {
  return (
    <div className="border-2 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] md:w-[350px] md:h-[350px] border-primary border-dashed rounded-[30%] p-3">
      <div className="grid grid-cols-2 grid-rows-2  h-full">
        <div className="relative bg-primary rounded-tl-[58%] rounded-br-[50%] overflow-hidden">
          <Image
            src={"/images/img1.png"}
            width={150}
            height={150}
            alt="image"
            className="object-cover w-full h-full absolute inset-0"
          />
        </div>
        <div className="relative bg-primary/20 rounded-tr-[58%] rounded-bl-[50%] overflow-hidden">
          <Image
            src={"/images/img3.png"}
            width={150}
            height={150}
            alt="image"
            className="object-cover w-full h-full absolute inset-0"
          />
        </div>
        <div className="relative bg-primary/20 rounded-bl-[58%] rounded-tr-[50%] overflow-hidden">
          <Image
            src={"/images/img4.png"}
            width={150}
            height={150}
            alt="image"
            className="object-cover w-full h-full absolute inset-0"
          />
        </div>
        <div className="relative bg-primary rounded-br-[58%] rounded-tl-[50%] overflow-hidden">
          <Image
            src={"/images/img2.png"}
            width={150}
            height={150}
            alt="image"
            className="object-cover w-full h-full absolute inset-0"
          />
        </div>
      </div>
    </div>
  );
};

export default StepsImage;
