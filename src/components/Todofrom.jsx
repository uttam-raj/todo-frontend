import { useEffect, useState } from "react";
import './TodoFrom.css'
export const TodoFrom = ({onAddValue, resetKey})=>{
const [inputValue, setInputValue] = useState({
    id:"",
    content:"",
    dueDate:"",
    category:"",
    checked:false,
})

const handleInputChange=(e)=>{
const {name, value}= e.target;
setInputValue((prev)=>({
    ...prev,
    id:Date.now(),   //It ensure unique id for each data
    [name]:value}));
}

const handleSubmit = (e)=>{
    e.preventDefault();
    onAddValue(inputValue);
};

    useEffect(()=>{
        setInputValue({
        id:"",
        content:"",
        checked:false,
        dueDate:"",
        category:""
    });
    },[resetKey]);

return(
<form className="Todo-Form" onSubmit={handleSubmit}>
    <input 
    name="content"
    type="text"
    placeholder="Enter a task"
    value={inputValue.content}
    onChange={handleInputChange} />

    <input 
    name="dueDate"
    type="date"
    value={inputValue.dueDate}
    onChange={handleInputChange} />


    <select name="category" value={inputValue.category} onChange={handleInputChange}>
        <option value="all">All</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="urgent">Urgent</option>
        <option value="other">Other</option>
    </select>

    <button type="submit">Add</button>
</form>
)


}