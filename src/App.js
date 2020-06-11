import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function Filter(props){
    const isActive = (index) =>{
        return `btn ${props.filter.isSelected? 'btn-primary': 'btn-default'}`;
    }
    return(
    <button className={`${isActive(props.filter.index)} p-2`}>
        {props.filter.text}
    </button>
    )
}


function Filters(props) {
    const [filters, setFilters]=useState([
        {
            text: 'All',
            isSelected: true
        },
        {
            text: 'Completed',
            isSelected: false
        },
        {
            text: 'Incompleted',
            isSelected: false
        }
    ])
    return (
        <div className="filters pt-5">
            {filters.map((filter, index)=>{
                <Filter filter={filter} index={index}/>
            })}
        </div>
    )
}


function Todo(props) {
    const [newValue, setNewValue] = useState(props.todo.text);

    const handleSave = e => {
        e.preventDefault();
        if (newValue !== '') {
            props.SaveChanges(props.index, newValue);
        }
    }

    const handleDiscard = e => {
        e.preventDefault();
        props.DiscardChanges(props.index);
        setNewValue(props.todo.text);
    }
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <textarea readonly='readonly' id={`text ${props.index}`} suppressContentEditableWarning={true}
                className={`todo-text ${props.todo.isCompleted ? "active" : ""}`}
                onChange={e => setNewValue(e.target.value)}
                value={newValue} />
            <span className="col-1 fa-lg">
                <i className={`${props.todo.isCompleted ? "fa fa-undo p-1" : "fa fa-check p-1"} ${props.todo.hasChanges === true ? "hidden" : "visible"}`}
                    title={`Mark as ${props.todo.isCompleted? 'incomplete':'done'}`}
                    onClick={() => props.ToggleCompleteTodo(props.index)}></i>
                <i className={`fa fa-pencil p-1 ${props.todo.isCompleted ? "hidden" : "visible"} ${props.todo.hasChanges === true ? "hidden" : "visible"}`}
                    title="Edit"
                    onClick={() => props.ToggleEditTodo(props.index)}></i>
                <i className={`fa fa-trash p-1 ${props.todo.hasChanges === true ? "hidden" : "visible"}`}
                    title="Delete"
                    onClick={() => props.DeleteTodo(props.index)}></i>
                <i className={`fa fa-floppy-o p-2 ${props.todo.hasChanges === true ? "visible" : "hidden"}`}
                    title="Save changes"
                    onClick={handleSave}></i>
                <i className={`fa fa-times p-2 ${props.todo.hasChanges === true ? "visible" : "hidden"}`}
                    title="Discard changes"
                    onClick={handleDiscard}></i>
            </span>
        </li>
    );
}
function TodoForm(props) {
    const [value, setValue] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (value !== '') {
            props.AddTodo(value);
            setValue('');
        }
    }

    return (
        <form className="form-inline pt-5"
            onSubmit={handleSubmit}
        >
            <input placeholder="add todo" className="form-control"
                onChange={e => setValue(e.target.value)}
                value={value} />

            <button type="submit" className="btn btn-success"
            //onClick={props.AddTodo}
            >
                Add
                    </button>
        </form>
    );
}

function App(props) {
    const [todos, setTodos] = useState([
        {
            text: 'Un todo',
            isCompleted: false,
            hasChanges: false
            //todo: add a due date
        },
        {
            text: 'alt todo ceva mai lung sa fdjjh adfih sdf asdifhias df  dah  hfsdauhfias  dhafsi vedem ce se intampla trebuie si mai lung de atat',
            isCompleted: false,
            hasChanges: false
            //todo: add a due date
        }
    ]);



    const AddTodo = text => {
        let newTodos = [...todos, { text, isCompleted: false }];
        SortTodos(newTodos);
        setTodos(newTodos);
    }

    const ToggleCompleteTodo = index => {
        let newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        SortTodos(newTodos);
        setTodos(newTodos);
    }

    const DeleteTodo = index => {
        let newTodos = [...todos];
        newTodos.splice(index, 1);
        SortTodos(newTodos);
        setTodos(newTodos);
    }

    const ToggleEditTodo = index => {
        var el = document.getElementById(`text ${index}`);
        el.toggleAttribute('readonly');
        let newTodos = [...todos];
        newTodos[index].hasChanges = !newTodos[index].hasChanges;
        setTodos(newTodos);
    }

    const SaveChanges = (index, text) => {
        ToggleEditTodo(index);
        let newTodos = [...todos];
        newTodos[index].text = text;
        setTodos(newTodos);
    }

    const DiscardChanges = (index) => {
        ToggleEditTodo(index);
        let newTodos = [...todos];
        setTodos(newTodos);
    }

    const SortTodos = (arr) => {
        arr.sort((a, b) => a.isCompleted ? b.isCompleted ? -1 : 1 : -1);
        return arr;
    }

    return (
        <>
            <div className="title pt-3">
                {props.title}
            </div>
            <div className="menu d-flex justify-content-between">
                <TodoForm AddTodo={AddTodo} />
                <Filter />
            </div>
            <ul className="ceva list-group pt-3">
                {todos.map((todo, index) => (
                    <Todo key={index} index={index} todo={todo} ToggleCompleteTodo={ToggleCompleteTodo} DeleteTodo={DeleteTodo} ToggleEditTodo={ToggleEditTodo} SaveChanges={SaveChanges} DiscardChanges={DiscardChanges} />
                ))}
            </ul>
        </>
    )
}

export default App;
