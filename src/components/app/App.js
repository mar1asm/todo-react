import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import TodoList from '../todoList/TodoList'
import TodoForm from '../todoForm/TodoForm'
import Menu from '../menu/Menu'
import TodoSearch from '../todoSearch/TodoSearch'

//test 2
function App() {

    const [todos, setTodos] = useState([
        {
            text: 'Learn React',
            isCompleted: false,
            hasChanges: false,
            dueDate: new Date('')
        },
        {
            text: "Learn how to test a React application with Jest",
            isCompleted: false,
            hasChanges: false,
            dueDate: new Date('2020-07-01')
        },
        {
            text: 'Build a todo app',
            isCompleted: true,
            hasChanges: false,
            dueDate: new Date('2020-06-12')
        },
        {
            text: 'Send the github link',
            isCompleted: true,
            hasChanges: false,
            dueDate: new Date('2020-06-12')
        }
    ]);

    const [selectedButton, setSelectedButton] = useState('All');
    const [filter, setFilter] = useState('');

    const UpdateTodos = (newTodos) => {
        setTodos(newTodos);
    }

    const UpdateSelectedButton = (newSelectedButton) => {
        setSelectedButton(newSelectedButton);
    }

    const AddTodo = (text, date) => {
        let newTodos = [...todos, { text, isCompleted: false, dueDate: new Date(date) }];
        newTodos.sort(function compare(a, b) { return a.isCompleted ? b.isCompleted ? -1 : 1 : -1; });
        setTodos(newTodos);
    }

    const SearchTodos = (e) => {
        setFilter(e.target.value);
    }


    const buttons = ["All", "Completed", "Uncompleted"];

    return (
        <>
            <div className="title pt-3">
                ToDo List
            </div>
            <div className="menu d-flex justify-content-between">
                <TodoForm AddTodo={AddTodo} />
                <TodoSearch SearchTodos={SearchTodos} />
                <div className="buttons pt-5">
                    {
                        buttons.map((button, index) => (
                            <Menu key={index}
                                index={index}
                                currentButton={button}
                                selectedButton={selectedButton}
                                UpdateSelectedButton={UpdateSelectedButton}
                            />
                        ))
                    }
                </div>
            </div>
            <TodoList todos={todos}
                selectedButton={selectedButton}
                filter={filter}
                UpdateTodos={UpdateTodos} />
        </>
    )
}

export default App;
