import React from "react";

interface Props {
    title: string;
    message: string;
}

const Heading: React.FC<Props> = ({title, message}) => {
  return (
    <div className="w-full text-center h-auto">
                    <h1 className="text-[1.45rem] font-semibold mb-1">{title}</h1>
                    <p className="text-sm font-normal mb-8">{message}</p>

    </div>
  )
}

export default Heading