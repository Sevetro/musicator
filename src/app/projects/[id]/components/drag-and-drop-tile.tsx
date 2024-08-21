import { forwardRef } from "react";

import { DefaultWrapperProps } from "@/models/default-props";

type cutTile = "start" | "end";

interface DragAndDropTileProps extends DefaultWrapperProps {
  isDragging?: boolean;
  active?: boolean;
  isOver?: boolean;
  small?: boolean;
  deletionDropZone?: boolean;
  width?: number;
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
      className,
      ...props
    },
    ref,
  ) => {
    const finalWidth = small ? 30 : width === undefined ? 50 : `${width}`;
    const height = small ? "24px" : "32px";
    const bg = deletionDropZone
      ? "bg-red-700"
      : active
        ? "bg-green-500"
        : "bg-stone-300";

    const opacity = isDragging || isOver ? 70 : 100;
    const cursor = deletionDropZone ? "cursor-default" : "cursor-pointer";
    const hover = deletionDropZone ? "bg-red-700" : "bg-blue-500";

    return (
      <div
        style={{ width: `${finalWidth}px`, height }}
        className={`${bg} ${opacity} ${cursor} flex items-center justify-center rounded-md border border-solid border-gray-400 hover:${hover} ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DragAndDropTile.displayName = "DragAndDropTile";
