import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';



function Filter(props) {
    const isActive = () => {
        return `btn ${props.filter.isSelected ? 'btn-primary' : 'btn-default'}`;
    }
    return (
        <button className={`${isActive()} mx-1`}
            onClick={() => props.ChangeFilters(props.index)}
        >
            {props.filter.text}
        </button>
    )
}


function Todo(props) {
    const [editedValue, setEditedValue] = useState(props.todo.text);
    const [editedDate, setEditedDate]=useState(props.todo.dueDate);

    const handleSave = e => {
        e.preventDefault();
        if (editedValue !== '') {
            props.SaveChanges(props.index, editedValue, editedDate);
        }
    }

    const handleDiscard = e => {
        e.preventDefault();
        props.DiscardChanges(props.index);
        setEditedValue(props.todo.text);
        setEditedDate(props.todo.dueDate);
    }

    const formatDate=()=>{
        if (editedDate===null)
            return '-';
        let year=editedDate.getFullYear();
        let month=editedDate.getMonth()+1;
        let day=editedDate.getDate();

        month=month>9? month.toString(): `0${month.toString()}`;
        day=day>9? day.toString(): `0${day.toString()}`;

        return `${year}-${month}-${day}`;
    }

    if (!props.displayTodo)
        return null;
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="w-100">
                <textarea readOnly='readonly' 
                    id={`text ${props.index}`} suppressContentEditableWarning={true}
                    className={`todo-text ${props.todo.isCompleted ? "active" : ""}`}
                    onChange={e => setEditedValue(e.target.value)}
                    value={editedValue} />
                 <div className={props.todo.isCompleted?'hidden':'visible'}>
                 <span>Due date: </span>
                 <input type="date" 
                    id={`date ${props.index}`}
                    readOnly='readonly'
                    className="form-control w-50"
                    onChange={e=>setEditedDate(new Date(e.target.value))} 
                    value={formatDate()}
                    />  
                </div>   
            </div>
            <span className="col-1 fa-lg">
                <i className={`${props.todo.isCompleted ? "fa fa-undo p-1" : "fa fa-check p-1"} ${props.todo.hasChanges === true ? "hidden" : "visible"}`}
                    title={`Mark as ${props.todo.isCompleted ? 'incomplete' : 'done'}`}
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
    const [date, setDate]=useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (value !== '' && date!=='') {
            props.AddTodo(value, date);
            setValue('');
            setDate('');
        }
    }

    return (
        <form className="form-inline pt-5"
            onSubmit={handleSubmit}
        >
            <input placeholder="add todo" className="form-control mx-2"
                onChange={e => setValue(e.target.value)}
                value={value} />
            
            <input type="date" 
                className="form-control input-lg mx-2"
                onChange={e=> setDate(e.target.value)}
                value={date}/>
            

            <button type="submit" className="btn btn-success"
            >
                Add
                    </button>
        </form>
    );
}

function App() {
    const [todos, setTodos] = useState([
        {
            text: 'Un todo',
            isCompleted: false,
            hasChanges: false,
            dueDate: new Date('2021-08-01')
            //todo: add a due date
        },
        {
            text: 'alt todo ceva mai lung sa fdjjh adfih sdf asdifhias df  dah  hfsdauhfias  dhafsi vedem ce se intampla trebuie si mai lung de atat',
            isCompleted: false,
            hasChanges: false,
            dueDate: new Date('2021-08-02')
            //todo: add a due date
        }
    ]);

    const [filters, setFilters] = useState([
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
    ]);

    const ChangeFilters = index => {
        let newFilters = [...filters];
        newFilters.forEach((newFilter, i) => {
            i === index ? newFilter.isSelected = true : newFilter.isSelected = false;
        });
        setFilters(newFilters);
    }

    const AddTodo = (text, date) => {
        let newTodos = [...todos, { text, isCompleted: false, dueDate: new Date(date) }];
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
        var textElement = document.getElementById(`text ${index}`);
        var dateElement = document.getElementById(`date ${index}`);
        textElement.toggleAttribute('readOnly');
        dateElement.toggleAttribute('readOnly');

        let newTodos = [...todos];
        newTodos[index].hasChanges = !newTodos[index].hasChanges;
        setTodos(newTodos);
    }

    const SaveChanges = (index, text, date) => {
        ToggleEditTodo(index);
        let newTodos = [...todos];
        newTodos[index].text = text;
        newTodos[index].dueDate=date;
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

    const DisplayTodo = (index) => {
        return filters[0].isSelected ? true : (filters[2].isSelected && todos[index].isCompleted) ? false : (filters[1].isSelected && !todos[index].isCompleted) ? false : true;
    }

    return (
        <>
            <div className="title pt-3">
                To-do List
            </div>
            <div className="menu d-flex justify-content-between">
                <TodoForm AddTodo={AddTodo} />
                <div className="filters pt-5">
                    {filters.map((filter, index) => (
                        <Filter key={index}
                            index={index}
                            filter={filter}
                            ChangeFilters={ChangeFilters} />
                    ))}
                </div>
            </div>
            <ul className="list-group pt-3">
                {todos.map((todo, index) => (
                    <Todo key={index}
                        index={index}
                        todo={todo}
                        displayTodo={DisplayTodo(index)}
                        ToggleCompleteTodo={ToggleCompleteTodo}
                        DeleteTodo={DeleteTodo}
                        ToggleEditTodo={ToggleEditTodo}
                        SaveChanges={SaveChanges}
                        DiscardChanges={DiscardChanges} />
                ))}
            </ul>
        </>
    )
}

export default App;
