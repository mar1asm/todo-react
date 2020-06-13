import React from 'react'

function TodoSearch({SearchTodos}){


    return(
        <div className="pt-5">
        <input
            placeholder="Search"
            type="text"
            onChange={SearchTodos}
            className="form-control"/>
        </div>
    )
}

export default TodoSearch;