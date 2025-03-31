import { Circle, PencilLine, RectangleHorizontal } from "lucide-react";

const ShapeBar = () => {
  return (
<div className=" flex gap-5 absolute top-5 left-5 text-white px-2 py-1 border">
        <Circle className=" hover:bg-neutral-700 hover:cursor-pointer"/>
        <RectangleHorizontal className=" hover:bg-neutral-700 hover:cursor-pointer"/>
        <PencilLine className=" hover:bg-neutral-700 hover:cursor-pointer"/>
      </div>
  )
}

export default ShapeBar