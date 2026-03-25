import { GiCrossedBones } from "react-icons/gi";
import { TiTick } from "react-icons/ti";

export const TodoList = ({
  id,
  data,
  checked,
  category,
  dueDate,
  onCheckedClick,
  onDeleteClick,
  dragListeners,
  dragAttributes,
//   dragRef
}) => {
  return (
    <div className={`todo-list ${checked ? "completed" : ""}`} >
      <div className="todo-card-container" {...dragListeners} {...dragAttributes}>
        <div className="todo_details">
          <p className="todo-details"><big>{data}</big></p>
          {dueDate && <p className="todo-date">Due: {new Date(dueDate).toLocaleDateString('en-IN')}</p>}
          {category && <p className="todo-category">Category: {category}</p>}
        </div>
       </div>
       <div className="todo-buttons">
        <button
          className={`tick-btn ${checked ? "checked" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onCheckedClick(id);
          }}
          aria-label="Mark as complete"
        >
          <TiTick />
        </button>

        <button
          className="dlt-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDeleteClick(id);
          }}
        >
          <GiCrossedBones />
        </button>
      </div>
    </div>
  );
};
