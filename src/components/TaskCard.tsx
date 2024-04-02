import { useState } from "react";
import { Task } from "../types";
import TrashIcon from "./icons/TrashIcon";

interface Props {
  task: Task;
}

const TaskCard = (props: Props) => {
  const { task } = props;
  const [mouseIsOver, setMouseIsOver] = useState(false);
  return (
    <div
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      className="h-[100px] w-full p-2 bg-mainBackgroundColor rounded-lg flex items-center hover:ring-2 hover:ring-inset hover:ring-rose-500 relative"
    >
      {task.content}
      {mouseIsOver && (
        <button className="stroke-white absolute right-4 rounded-lg p-2 bg-columBackgroundColor hover:stroke-gray-400">
          <TrashIcon />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
