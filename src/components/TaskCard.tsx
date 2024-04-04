import { useState } from "react";
import { Id, Task } from "../types";
import TrashIcon from "./icons/TrashIcon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const TaskCard = (props: Props) => {
  const { task, deleteTask, updateTask } = props;
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="h-[100px] w-full p-2 bg-mainBackgroundColor rounded-lg flex items-center border-2 border-rose-500 opacity-30 relative cursor-grab"
      ></div>
    );
  }

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={toggleEditMode}
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
        className="h-[100px] w-full p-2 bg-mainBackgroundColor rounded-lg flex items-center hover:ring-2 hover:ring-inset hover:ring-rose-500 relative"
      >
        <textarea
          className="bg-transparent focus:outline-none h-[90%] w-full resize-none "
          placeholder="Task content here"
          autoFocus
          value={task.content}
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        ></textarea>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      className="h-[100px] w-full p-2 bg-mainBackgroundColor rounded-lg flex items-center hover:ring-2 hover:ring-inset hover:ring-rose-500 relative cursor-grab"
    >
      <p className="h-[95%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap task">
        {task.content}
      </p>
      {mouseIsOver && (
        <button
          onClick={() => deleteTask(task.id)}
          className="stroke-white absolute right-4 rounded-lg p-2 bg-columBackgroundColor hover:stroke-gray-400"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
