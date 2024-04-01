import { Column, Id } from "../types";
import TrashIcon from "./icons/TrashIcon";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

const ColumnContainer = (props: Props) => {
  const { column, deleteColumn } = props;
  return (
    <div className="w-[350px] h-[500px] bg-columBackgroundColor rounded-lg flex flex-col p-1">
      <div className="w-full h-[55px] bg-mainBackgroundColor flex items-center justify-between cursor-grab rounded-lg rounded-b-none font-bold border-4 border-columBackgroundColor p-3">
        <div className="flex gap-2 items-center">
          <span className="px-2 py-1 rounded-full bg-columBackgroundColor">
            0
          </span>
          {column.title}
        </div>{" "}
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
