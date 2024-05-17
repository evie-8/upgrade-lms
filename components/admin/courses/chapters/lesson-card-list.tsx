"use client";

import { Lesson } from "@prisma/client"
import { useEffect, useState } from "react";
import {DragDropContext, Draggable, DropResult, Droppable} from "@hello-pangea/dnd"
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";


interface Props {
    items: Lesson[];
    onReorder: (updatedData: {id: string; position: number}[]) => void;
    onEdit: (id: string) => void;
}


const ChapterLessonsList = ({items, onReorder, onEdit}: Props) => {
   
   const [isMounted, setIsMounted] = useState(false);
   const [lessons, setLessons] = useState(items);

   useEffect(() => {
        setIsMounted(true);
   }, []);

   useEffect(() => {
    setLessons(items);
}, [items]);

const onDragEnd = (result: DropResult) => {
     if (!result.destination) return;

     const items = Array.from(lessons);
     const [reorderedItem] = items.splice(result.source.index, 1);
     items.splice(result.destination.index, 0, reorderedItem);

     const startIndex = Math.min(result.source.index, result.destination.index);
     const endIndex = Math.max(result.source.index, result.destination.index);

     const updatedLessons = items.slice(startIndex, endIndex + 1);
     setLessons(items);

     const bulkUpdateData = updatedLessons.map((lesson) => ({
        id: lesson.id,
        position: items.findIndex((item) => item.id === lesson.id),
     }));
     onReorder(bulkUpdateData);

};

   if (!isMounted) {
        return null;
   };

    return (
   <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lessons">
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {lessons.map((lesson, index) =>(
                        <Draggable key={lesson.id} draggableId={lesson.id} index={index}>
                            {
                                (provided) => (
                                    <div className={cn("flex items-center gap-x-2 bg-white1 border border-grey rounded-md mb-4 text-sm", !lesson.isDraft && "bg-white border-transparent")} 
                                    ref={provided.innerRef} {...provided.draggableProps}>
                                            <span className={cn("px-2 py-3 border-r border-grey  rounded-l-md transition")} 
                                            {...provided.dragHandleProps}
                                            >
                                                <Grip className="h-5 w-5"/>
                                            </span>
                                            {lesson.name}
                                            <div className="ml-auto pr-2 flex items-center gap-x-2">
                                            <Badge className={cn("text-white cursor-pointer transition" , !lesson.isDraft ? 'bg-success hover:bg-success/60': 'bg-danger hover:bg-danger/60')}>
                                                    {lesson.isDraft?  'draft':'published'}
                                               
                                                
                                            </Badge>
                                               
                                                <Pencil onClick={() => onEdit(lesson.id)}
                                                className="w-4 h-4 cursor-pointer hover:opacity-50 transition"/>
                                            </div>
                                    </div>
                                )
                            }
                        </Draggable>

                    ))}
                    {provided.placeholder}
                </div>
            )

            }
        </Droppable>
   </DragDropContext>
  )
}

export default ChapterLessonsList