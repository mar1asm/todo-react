import React from 'react';
import Todo from './todo/Todo'


function TodoList({todos, filter, selectedButton, UpdateTodos}){

    const ToggleCompleteTodo = index => {
        let newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        newTodos.sort(function compare(a, b) { return a.isCompleted ? b.isCompleted ? -1 : 1 : -1; });
        UpdateTodos(newTodos);
    }

    const DeleteTodo = index => {
        let newTodos = [...todos];
        newTodos.splice(index, 1);
        UpdateTodos(newTodos);
    }

    const ToggleEditTodo = index => {
        var textElement = document.getElementById(`text ${index}`);
        var dateElement = document.getElementById(`date ${index}`);
        textElement.toggleAttribute('readOnly');
        dateElement.toggleAttribute('readOnly');

        let newTodos = [...todos];
        newTodos[index].hasChanges = !newTodos[index].hasChanges;
        UpdateTodos(newTodos);
    } 

    const SaveChanges = (index, text, date) => {
        ToggleEditTodo(index);
        let newTodos = [...todos];
        if (text)
        newTodos[index].text = text;
        if (date)
        newTodos[index].dueDate=date;
        UpdateTodos(newTodos);
    }

    const DiscardChanges = (index) => {
        ToggleEditTodo(index);
        let newTodos = [...todos];
        UpdateTodos(newTodos);
    }

    const DisplayTodo = (index) => {
        let displayTodo=true;
        displayTodo=selectedButton==='All' ? true : (selectedButton==='Uncompleted' && todos[index].isCompleted) ? false : (selectedButton==='Completed' && !todos[index].isCompleted) ? false : true;
        displayTodo=displayTodo&&todos[index].text.includes(filter);
        return displayTodo;    
    }

    return (
        <>
        <ul className="list-group pt-3">
                {todos.map((todo, index) => (
                    <Todo key={index}
                        index={index}
                        todo={todo}
                        DisplayTodo={DisplayTodo(index)}
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

export default TodoList;