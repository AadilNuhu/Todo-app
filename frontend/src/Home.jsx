import React from 'react'
import { Add } from './Add'
import { useState, useEffect } from 'react'
import axios from 'axios'
const api = import.meta.env.VITE_API_BASE_URL



const Home = () => {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        axios.get(`${api}/get`)
            .then(result => setTodos(result.data))
            .catch(err => console.log(`Error : ${err}`))

    }, [])

    function handleEdit(id) {
        axios.put(`${api}/update/${id}`)
            .then(result => { location.reload() })
            .catch(err => console.log(`Error : ${err}`))
    }

    function handleDel(id) {
        axios.delete(`${api}/delete/${id}`)
            .then(result => { location.reload() })
            .catch(err => console.log(`Error : ${err}`))
    }

    return (
        <div className='flex justify-center mt-10'>
            <div>
                <h1 className='text-4xl text-center font-bold'>Todo App</h1>
                <Add />
                <div className='mt-5 '>
                    {
                        todos.length === 0 ? <h3>No Items Found ...</h3> :
                            todos.map((todo) => (

                                <li key={todo._id}
                                    className={`relative items-center cursor-pointer flex px-4 bg-gray-100 mt-2 py-3 list-none rounded-md" ${todo.done ? "" : "line-through text-red-600"}`}
                                    onClick={() => handleEdit(todo._id)}>{todo.task}
                                    <button onClick={() => handleDel(todo._id)}
                                        className='bg-red-600 text-white p-2 rounded-md absolute right-0 cursor-pointer'>Del</button>
                                </li>
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home