import React from "react";

import { useDroppable } from "@dnd-kit/core";

type Props = {
  className?: string;
  sq: string;
  piece?: React.JSX.Element;
  isPossibleMove?: boolean;
};

const Square = ({ className, sq, piece, isPossibleMove }: Props) => {
  const { setNodeRef } = useDroppable({
    id: `droppable-${sq}`,
    data: {
      sq: sq,
    },
  });

  return (
    <button
      type="button"
      ref={setNodeRef}
      className={` ${className} flex cursor-grabbing items-center justify-center`}
    >
      {isPossibleMove && (
        <div className="bg-active-light absolute h-4 w-4 rounded-full" />
      )}
      {piece}
    </button>
  );
};

export default Square;
