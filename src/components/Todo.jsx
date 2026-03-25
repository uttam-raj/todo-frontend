import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { useState } from "react";
// import { getLocalStorageDataTodo, setLocalStorageDataTodo } from "./TodoLocalStorage";
import { TodoFrom } from "./Todofrom";
import { TodoList } from "./TodoList";
import { TodoNavbar } from "./TodoNavbar";
import { useEffect } from "react";
import { useAuth } from "../Store/auth";
import './TodoList.css';
import { SortableItem } from "./SortableItem";
// import './Todo.css';

//search and filter
// const  getFilteredTasks = (task, searchTerm, filterCategory)=>{
//      return task.filter((curElem)=>{
//           const hasSearch = searchTerm.trim() != "";   //if someting typed in the search then it will active
//           const hasFilter = filterCategory != "all";   //if filter is not all then it will active

//           const matchSearch = curElem.content.toLowerCase().includes(searchTerm.toLowerCase());   //if the search 
//           let matchesFilter = true;
//           if (hasFilter) {
//             const cat = filterCategory.toLowerCase();
//           if (cat === "completed") {
//             matchesFilter = curElem.checked === true;
//           } else if (cat === "pending") {
//             matchesFilter = curElem.checked === false;
//           } else {
//             matchesFilter = curElem.category.toLowerCase() === cat;
//           }
//           }

//           if(hasSearch && !hasFilter) return matchSearch;
//           if(!hasSearch && hasFilter) return matchesFilter;
//           if(hasSearch && hasFilter) return matchSearch && matchesFilter;

//           return true;
//     })

//   }

export const Todo=()=>{
   const [task, setTask] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [filterCategory, setFilterCategory] = useState("all");
   const [isDarkMode, setIsDarkMode] = useState(false);
   const [resetFormKey, setResetFormKey] = useState(0);
   
   const {token}= useAuth(); 
   // ✅ Fetch tasks from backend
   useEffect(()=>{
    const fetchTodos = async()=>{
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/todo?search=${searchTerm}&filter=${filterCategory}`,{
          headers:{
            Authorization:`Bearer ${token}`,
          },
        });

        const res_data = await response.json();
        if(response.ok){
          setTask(res_data);
        }else{
          console.error(res_data.message);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
   },[searchTerm,filterCategory]);



  //To add data task in DB
  const handleSubmit =async (inputValue) => {
  const { content, checked, dueDate, category } = inputValue;

  if(!content) return; // Avoid adding empty tasks

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todo`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify({content,checked,dueDate,category}),
      });

      const res_data = await response.json();
      if(response.ok){
        setTask((prev)=>[...prev,res_data]);
        setResetFormKey((prev)=>prev + 1);      //reset the form
      }
    } catch (error) {
      console.error("Error adding todo:", err);
    }
};

//step2-To delete task
const handleDeleteClick= async(id)=>{

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todo/${id}`,{
        method:"DELETE",
        headers:{
          Authorization:`Bearer ${token}`,
        },
      });

      if(response.ok){
        setTask((prev)=>prev.filter((curElem)=> curElem._id !== id));
      }else{
        const res_data = await response.json();
        console.error("Deletion failed:", res_data.message);
      }
    } catch (error) {
      console.error("Error deleting todo:",error);
    }

}

//step3-To Checked data in the task
const handleCheckedClick=async(id)=>{
  // const todoToCheck = task.find((curElem) => curElem.content === content);
  // if(!todoToCheck) return;
  // console.log("Sending toggle request for ID:", id);
  // console.log("With token:", token);
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/todo/${id}/toggle`,{
      method:"PATCH",
      headers:{
        Authorization:`Bearer ${token}`,
      },
    });

    const updatedTodo = await response.json();
    // console.log("Updated Todo from backend:", updatedTodo);


    if(response.ok){
      setTask((prev) =>
        prev.map((curElem) =>
          curElem._id === updatedTodo._id ? updatedTodo : curElem
        )
      )}else{
        console.error("Toggle failed:",updatedTodo.message)
      }
  } catch (error) {
    console.error("Error toggling todo",error);
  }
};


const handleDragEnd = (event) => {
  const { active, over } = event;

  if (active.id !== over.id) {
    setTask((prevTasks) => {
      const oldIndex = prevTasks.findIndex(task => task._id === active.id);
      const newIndex = prevTasks.findIndex(task => task._id === over.id);
      const newTaskOrder = arrayMove(prevTasks, oldIndex, newIndex);

      // Send updated order to backend
  const orderedIds = newTaskOrder.map(task => task._id);
  fetch(`${import.meta.env.VITE_API_URL}/todo/update-order`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ orderedIds }),
  }).catch(err => console.error("Error updating order:", err));

  return newTaskOrder;
    });
  }
};


//step4- Call the search anf filter
// const filteredTasks = getFilteredTasks(task, searchTerm, filterCategory);

    return(
    <div className={isDarkMode ? "dark-mode" : ""}>
          <TodoNavbar
        onSearchChange={setSearchTerm}
        onFilterChange={setFilterCategory}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

    < TodoFrom onAddValue={handleSubmit} resetKey={resetFormKey}/>
    <section className="myUnorderedList">
      <DndContext
  collisionDetection={closestCenter}
  sensors={useSensors(useSensor(PointerSensor))}
  onDragEnd={handleDragEnd}
>
  <SortableContext
    items={task.map((t) => t._id)}
    strategy={verticalListSortingStrategy}
  >
        <ul className="todo-list-wrapper">
            {task.map((curElem) => {
  return (
<SortableItem key={curElem._id} id={curElem._id}>
  {({ dragListeners, dragAttributes }) => (
    <TodoList
      // {...dragProps}
      key={curElem._id}
      id={curElem._id}
      data={curElem.content}
      checked={curElem.checked}
      dueDate={curElem.dueDate}
      category={curElem.category}
      onDeleteClick={handleDeleteClick}
      onCheckedClick={handleCheckedClick}
      dragListeners={dragListeners}
      dragAttributes={dragAttributes}
    />
  )}
</SortableItem>
  );
})}

        </ul>
        </SortableContext>
        </DndContext>
    </section>
    </div>
    )
}