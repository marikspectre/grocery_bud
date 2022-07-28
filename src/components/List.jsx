import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';

function List({ items, deleteItem, editItem }) {
    return (
        <div className='grocery-list'>
            {items.map((item, index) => {
                return (
                    <article className='grocery-item' key={index}>
                        <p className='title'>{item.title}</p>
                        <div className='btn-container'>
                            <button className='edit-btn'>
                                <FaEdit onClick={() => editItem(item.id)} />
                            </button>
                            <button className='delete-btn'>
                                <FaTrash onClick={() => deleteItem(item.id)} />
                            </button>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}

export default List