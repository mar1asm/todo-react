import React, { useState } from 'react';

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

export default TodoForm;