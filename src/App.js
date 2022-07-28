import React, { useState, useEffect } from 'react';
import './App.css';
import Alert from './components/Alert';
import List from './components/List';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(list);
  }
  else {
    return [];
  }
}


function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({show: false, msg: "", type: ""});
  const [editId, setEditId] = useState(null);
  const [isEdeting, setIsEdeting] = useState(false);

  const hundle = (e) => {
    e.preventDefault();
    if(!name) {
      showAlert(true, 'danger', 'value is null');
    }
    else if(name && isEdeting) {
      setList(
        list.map((item) => {
          if (item.id === editId){
            return {...item, title:name};
          }
          return item;
        })
      )
      setName('');
      setEditId(null);
      setIsEdeting(false);
      showAlert(true, 'success', 'value changed');
    }
    else {
      showAlert(true, 'success', 'value changed');
      const inputValue = {id: new Date().getTime().toString(), title: name};
      setList([...list, inputValue]);
      setName("");
    }
  }
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({show, msg, type})
  };

  const deleteItem = (id) => {
    const arr = list.filter((item) => item.id !== id);
      setList(arr);
      showAlert(true, 'danger', 'item removed');
  }
  
  const editItem = (id) => {
    const editArr = list.find((item) => item.id === id);
    setEditId(id);
    setIsEdeting(true);
    setName(editArr.title)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  },[list])

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={hundle}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input 
          value={name}
          type='text' 
          className='grocery' 
          placeholder='e.g,. eggs' 
          onChange={(e) => {
            setName(e.target.value)
          }} 
          />
          <button type='submit' className='submit-btn'>{isEdeting ? "edit" : "submit"}</button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} deleteItem={deleteItem} editItem={editItem} />
          <button className='clear-btn' onClick={() => setList([])}>clear items</button>
        </div>
      )}
    </section>
  );
}

export default App;
