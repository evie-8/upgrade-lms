"use client";

import { Chapter } from "@prisma/client"
import { useEffect, useState } from "react";
import {DragDropContext, Draggable, DropResult, Droppable} from "@hello-pangea/dnd"
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
    items: Chapter[];
    onReorder: (updatedData: {id: string; position: number}[]) => void;
    onEdit: (id: string) => void;
}

const ChapterList = ({items, onReorder, onEdit}: Props) => {
   
   const [isMounted, setIsMounted] = useState(false);
   const [chapters, setChapters] = useState(items);

   useEffect(() => {
        setIsMounted(true);
   }, []);

   useEffect(() => {
    setChapters(items);
}, [items]);

const onDragEnd = (result: DropResult) => {
     if (!result.destination) return;

     const items = Array.from(chapters);
     const [reorderedItem] = items.splice(result.source.index, 1);
     items.splice(result.destination.index, 0, reorderedItem);

     const startIndex = Math.min(result.source.index, result.destination.index);
     const endIndex = Math.max(result.source.index, result.destination.index);

     const updatedChapters = items.slice(startIndex, endIndex + 1);
     setChapters(items);

     const bulkUpdateData = updatedChapters.map((chapter) => ({
        id: chapter.id,
        position: items.findIndex((item) => item.id === chapter.id),
     }));
     onReorder(bulkUpdateData);

};

   if (!isMounted) {
        return null;
   };

    return (
   <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="chapters">
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {chapters.map((chapter, index) =>(
                        <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                            {
                                (provided) => (
                                    <div className={cn("flex items-center gap-x-2 bg-white1 border border-grey rounded-md mb-4 text-sm", chapter.isAvailable && "bg-white border-transparent")} 
                                    ref={provided.innerRef} {...provided.draggableProps}>
                                            <span className={cn("px-2 py-3 border-r border-grey rounded-l-md transition")} 
                                            {...provided.dragHandleProps}
                                            >
                                                <Grip className="h-5 w-5"/>
                                            </span>
                                            {chapter.name}
                                            <div className="ml-auto pr-2 flex items-center gap-x-2">
                                                {
                                                    chapter.isFree && (
                                                        <Badge className="pointer-events-none text-purple2 bg-purple2/10">
                                                            free
                                                        </Badge>
                                                    )
                                                }
                                              
                                                <Badge className={cn("pointer-events-none transition" , chapter.isAvailable ? 'bg-success/10 text-success ': 'bg-danger/10 text-danger')}>
                                                    {chapter.isAvailable ? 'published': 'draft'}
                                               
                                                
                                            </Badge>
                                               
                                                <Pencil onClick={() => onEdit(chapter.id)}
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

export default ChapterList