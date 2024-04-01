import { useState } from "react";
import { Column, Id } from "../types";
import PlusIcon from "./icons/PlusIcon";
import { generateId } from "../utils";
import ColumnContainer from "./ColumnContainer";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  const deleteColumn = (id: Id) => {
    const filteredColumns = columns.filter((col) => col.id != id);
    setColumns(filteredColumns);
  };

  return (
    <div className="m-auto flex min-h-screen w-full overflow-x-auto overflow-y-hidden px-[40px] items-center">
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map((col) => (
            <ColumnContainer
              key={col.id}
              column={col}
              deleteColumn={deleteColumn}
            />
          ))}
        </div>
        <button
          onClick={createNewColumn}
          className="h-[60px] w-[365px] max-w-[360px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columBackgroundColor p-4 ring-rose-500 hover:ring-2 transition ease-in-out flex gap-2"
        >
          <PlusIcon />
          Add Colum
        </button>
      </div>
    </div>
  );
};

export default KanbanBoard;
