"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css"

interface Props {
    onChange: (value: string) => void;
    value: string;
}

const Editor = ({onChange, value}: Props) => {
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), {ssr: false}), []);
  return (
    <div className='bg-white'>
        <ReactQuill 
        theme="snow"
        onChange={onChange}
        value={value}/>
    </div>
  )
}

export default Editor