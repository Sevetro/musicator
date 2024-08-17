import { forwardRef } from "react";

import { DefaultWrapperProps } from "@/models/default-props";

type cutTile = "start" | "end";

interface DragAndDropTileProps extends DefaultWrapperProps {
  isDragging?: boolean;
  active?: boolean;
  isOver?: boolean;
  small?: boolean;
  deletionDropZone?: boolean;
  width?: string;
  cutTile?: cutTile; //TODO: do it
}

export const DragAndDropTile = forwardRef<HTMLDivElement, DragAndDropTileProps>(
  (
    {
      children,
      width,
      small,
      deletionDropZone,
      active,
      isDragging,
      isOver,
      ...props
    },
    ref,
  ) => {
    const finalWidth = small ? "30px" : width === undefined ? "50px" : width;
    console.log(finalWidth);
    const height = small ? "23px" : "32px";
    const bg = deletionDropZone
      ? "bg-red-700"
      : active
        ? "bg-stone-100"
        : "bg-green-500";

    const opacity = isDragging || isOver ? 70 : 100;
    const cursor = deletionDropZone ? "default" : "pointer";
    const hover = deletionDropZone ? "bg-red-700" : "bg-blue-500";

    return (
      <div
        className={`w-[${finalWidth}] w-[${height}] ${bg} ${opacity} cursor-${cursor} flex items-center justify-center rounded-md border border-solid border-gray-400 hover:${hover}`}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DragAndDropTile.displayName = "DragAndDropTile";
