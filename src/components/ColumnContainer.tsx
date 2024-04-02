import { useState } from "react";
import { Column, Id } from "../types";
import TrashIcon from "./icons/TrashIcon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
}

const ColumnContainer = (props: Props) => {
  const { column, deleteColumn, updateColumn } = props;
  const [editMode, setEditMode] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-[350px] h-[500px] bg-columBackgroundColor rounded-lg border-2 border-pink-900 flex flex-col p-1"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-[350px] h-[500px] bg-columBackgroundColor rounded-lg flex flex-col p-1"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="w-full h-[55px] bg-mainBackgroundColor flex items-center justify-between cursor-grab rounded-lg rounded-b-none font-bold border-4 border-columBackgroundColor p-3"
      >
        {/* title */}
        <div className="flex gap-2 items-center">
          <span className="px-2 py-1 rounded-full bg-columBackgroundColor">
            0
          </span>
          {!editMode && column.title}
          {editMode && (
            <input
              className="px-2 py-[0.5] bg-columBackgroundColor rounded outline-none focus:outline-rose-500"
              type="text"
              value={column.title}
              autoFocus
              onChange={(e) => updateColumn(column.id, e.target.value)}
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return false;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="stroke-gray-500 hover:stroke-white hover:bg-columBackgroundColor rounded"
        >
          <TrashIcon />
        </button>
      </div>
      <div className="flex flex-grow">Content</div>
      <div>Footer</div>
    </div>
  );
};

export default ColumnContainer;
