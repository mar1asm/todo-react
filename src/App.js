import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function Todo(props) {
    return (
        <div className="listItem card">
            <div className="col-7">
            {props.index + 1}.
            {props.todo.text}
            </div>
            <div className="buttons">
                <i className="fa fa-check p-1"></i>
                <i className="fa fa-pencil-square-o p-1"></i>
                <i className="fa fa-trash p-1"></i>
            </div>
        </div>
    )
}

function App(props) {
    const [todos, setTodos] = useState([
        {
            text: 'Un todo',
            isCompleted: false,
            isInProgress: false,
            //todo: add a due date
        },
        {
            text: 'alt todo ceva mai lung sa vedem ce se intampla',
            isCompleted: false,
            isInProgress: true,
            //todo: add a due date
        }
    ]);
    return (
        <>
            <div className="title pt-3">
                {props.title}
            </div>
            <form className="form-inline pt-5">
                    <input placeholder="add todo" className="form-control"
                            //onChange={this.handleInput}
                    />

                    <button type="button" className="btn btn-success"
                            //onClick={this.onAddTodo}
                    >
                        Add
                    </button>
                </form>
            <div className="todoList flex-column pt-3">
                {todos.map((todo, index) => (
                    <Todo key={index} index={index} todo={todo} />
                ))}
            </div>
        </>
    )
}

export default App;
