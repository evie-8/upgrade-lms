"use client";
import { CircleHelp, Lock, Video } from 'lucide-react'
import React, { useState } from 'react'

interface Props {
    view: number;
    setView: React.Dispatch<React.SetStateAction<number>>;
    title: string;
    index: number;
}

const CurriculumDetails: React.FC<Props> = ({view, setView, title, index}) => {
   
  return (
    <div className="p-5 rounded-md border border-grey">
                      <div className="flex justify-between items-center gap-4 ">
                        <p className="text-sm font-poppins font-semibold capitalize">{title}</p>
                          <p className="w-4 h-4 ml-auto relative"  onClick={() =>  setView(prevView => prevView === index ? 0 : index)}>
                            <span className=" h-[2px] w-full bg-gray rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[0.3s] ease-in"/>
                            <span className={`h-[2px] w-full bg-gray rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[0.3s] ease-in ${index === view ? '': 'rotate-90'}`}/>
                          </p>
                      </div>

                      {/* lessons */}
                      <div className={`mt-4 ml-2 flex-col gap-4 ${index === view ? 'flex' : 'hidden'}`}>
                        <div className="flex items-center justify-between gap-2 border-b border-grey pb-3">
                          <p className="flex items-center justify-center gap-2">
                            <Video size={18} className="text-primary"/>
                            <span className="text-sm">Syntax Rules</span>
                          </p>
                          <p className="flex max-sm:flex-col items-center max-sm:items-end gap-3">
                            <button className="py-1  px-2 bg-grey2 rounded-md  text-white text-sm">10 mins</button>
                            <button className="py-1  px-2 bg-blue1 rounded-md text-white text-sm">Preview</button>

                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 border-b border-grey pb-3">
                          <p className="flex items-center gap-2">
                            <Video size={18} className="text-primary"/>
                            <span className="text-sm">Variables</span>
                          </p>
                          <p className="flex max-sm:flex-col items-center max-sm:items-end gap-3">
                            <button className="py-1  px-2 bg-grey2 rounded-md  text-white text-sm">10 mins</button>
                            <button className="py-1  px-2 bg-blue1 rounded-md text-white text-sm">Preview</button>

                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 ">
                          <p className="flex items-center gap-2">
                            <CircleHelp size={18} className="text-primary"/>
                            <span className="text-sm">Quiz</span>
                          </p>
                          <p className="flex max-sm:flex-col items-center max-sm:items-end gap-3">
                            <button className="py-1  px-2 bg-purple2 rounded-md  text-white text-sm">4 Questions</button>
                            <button className="py-1  px-2 bg-grey2 rounded-md text-white text-sm">15 mins</button>
                            <Lock size={18} className="text-danger"/>

                          </p>
                        </div>
                      </div>

                  </div>

  )
}

export default CurriculumDetails