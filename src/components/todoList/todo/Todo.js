import React, { useState } from 'react';

function Todo({ index, todo, DisplayTodo, ToggleCompleteTodo, DeleteTodo, ToggleEditTodo, SaveChanges, DiscardChanges }) {
    const [editedValue, setEditedValue] = useState('');
    const [editedDate, setEditedDate] = useState('');

    const handleSave = e => {
        e.preventDefault();
        SaveChanges(index, editedValue, editedDate);
    }

    const handleDiscard = e => {
        e.preventDefault();
        DiscardChanges(index);
        setEditedValue(todo.text);
        setEditedDate(todo.dueDate);
    }

    const formatDate = (date) => {
        if (date === '')
            return '-';
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = month > 9 ? month.toString() : `0${month.toString()}`;
        day = day > 9 ? day.toString() : `0${day.toString()}`;

        return `${year}-${month}-${day}`;
    }

    if (!DisplayTodo)
        return null;
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="w-100">
                <textarea readOnly='readonly'
                    id={`text ${index}`} suppressContentEditableWarning={true}
                    className={`todo-text ${todo.isCompleted ? "active" : ""}`}
                    onChange={e => setEditedValue(e.target.value)}
                    value={todo.hasChanges && editedValue != '' ? editedValue : todo.text} />
                <div className={todo.isCompleted ? 'hidden' : 'visible'}>
                    <span>Due date: </span>
                    <input type="date"
                        id={`date ${index}`}
                        readOnly='readonly'
                        className="form-control w-50"
                        onChange={e => setEditedDate(new Date(e.target.value))}
                        value={todo.hasChanges && editedDate != '' ? formatDate(editedDate) : formatDate(todo.dueDate)}
                    />
                </div>
            </div>
            <span className="col-1 fa-lg">
                <i className={`${todo.isCompleted ? "fa fa-undo p-1" : "fa fa-check p-1"} ${todo.hasChanges === true ? "hidden" : "visible"}`}
                    title={`Mark as ${todo.isCompleted ? 'incompleted' : 'done'}`}
                    onClick={() => { ToggleCompleteTodo(index) }}></i>
                <i className={`fa fa-pencil p-1 ${todo.isCompleted ? "hidden" : "visible"} ${todo.hasChanges === true ? "hidden" : "visible"}`}
                    title="Edit"
                    onClick={() => { ToggleEditTodo(index) }}></i>
                <i className={`fa fa-trash p-1 ${todo.hasChanges === true ? "hidden" : "visible"}`}
                    title="Delete"
                    onClick={() => { setEditedValue(''); DeleteTodo(index) }}></i>
                <i className={`fa fa-floppy-o p-2 ${todo.hasChanges === true ? "visible" : "hidden"}`}
                    title="Save changes"
                    onClick={handleSave}></i>
                <i className={`fa fa-times p-2 ${todo.hasChanges === true ? "visible" : "hidden"}`}
                    title="Discard changes"
                    onClick={handleDiscard}></i>
            </span>
        </li>
    );
}

export default Todo;