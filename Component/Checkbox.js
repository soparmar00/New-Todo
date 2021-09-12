import React, { useState, useEffect}  from 'react'
import { Button,  Modal, Form,} from 'react-bootstrap';
import { useDispatch, useSelector} from "react-redux";
import { addTodo, completeTodo, deleteTodo, editTodo, selectTodo, setTask } from '../Redux/action';
import cuid from 'cuid'

const Check = () => {

  const [show, setShow] = useState(false);
  const [model, setModel] = useState("Submit")
  const [select, setSelect] = useState()

  const result = useSelector((state) => state.todos.todoData)
  const data = useSelector((state) => state.todos.tasks)
  const sel = useSelector((state) => state.todos.select)
  const complete = useSelector((state) => state.todos.complete)
  
  const dispatch = useDispatch();

  useEffect(() => {
    setSelect(
      result.map((data) => {
        return{
          set : false,
          title: data.title,
          id: data.id
        }
     })
    );
  }, [result])

  useEffect(() => {
    dispatch(selectTodo(select))
  }, [select])

  useEffect(() => {
    if(localStorage.getItem('Created At')!==null){
     var create = JSON.parse(localStorage.getItem('Created At')) 
    }

    if(localStorage.getItem('Edited At')!==null) {
     var edit = JSON.parse(localStorage.getItem('Edited At')) 
    }
  }, [result])

  const handleClose = () => {
    setShow(false)
  }

  const handleShow = () => {
    setShow(true)
  };

  const handleButton = () => {
    setModel("Add Todo")
    handleShow()
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target)
    dispatch(setTask({ ...data, [name]: value}));
  }
    

  const handleSubmit = (e) => {
    e.preventDefault()
    if(data.id){
      dispatch(editTodo({...data, edit: new Date().toLocaleString() + ""}))
    }
    else{
      dispatch(addTodo({ ...data, id: cuid() , create: new Date().toLocaleString() + "" }))
    }
    handleClose()
  }

  const handleEdit = (fields) => {
    console.log(fields)
      dispatch(setTask(fields))
      setModel("Edit")
      handleShow()
    }

const handleDelete = (sel) => {
  let id = []
  sel.map((del) => {
    if(del.set) {
        id.push({id: del.id})
    }
    return del
  })  
  dispatch(deleteTodo(id))
   
} 

const handleComplete = (sel) => {
  let completeData = []
  sel.map((del) => {
    if(del.set) {
        completeData.push(del)
      }
      return del
    })  
    dispatch(completeTodo({comD: completeData, complete: new Date().toLocaleString() + ""}))
}

  return (
    <div>
      <h1>Todo App</h1>
      <br />
        <Button variant="primary" type="submit" onClick={() => handleButton()}> Add Todo</Button>
          <div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header >
                <Modal.Title>{model}</Modal.Title>
              </Modal.Header>
              <Modal.Body>

                {data ? 
                <Form onSubmit={handleSubmit} >
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name='title' defaultValue={data.title} placeholder="Enter Title" onChange={handleChange}/>
                  </Form.Group>
   
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} defaultValue={data.dis} name='dis'onChange={handleChange}/>
                  </Form.Group>
    
                  <center>
                    <Button variant="primary" type="submit">Submit</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                  </center>

                </Form> : ''}

              </Modal.Body>
            </Modal>
          </div>

          <br />
            <span>
              <div style={{float: 'left', paddingLeft: 70}} >
                <form>
                  <h3>Todo List</h3>
                    <div> 
                      <br />
                        <ul style={{listStyle: "none"}}>
                          {result.map((fields) => 
                            <div className="dropdown">
                              <input type="checkbox" onChange={event => {
                               let checked = event.target.checked;
                               setSelect(
                               select.map(data => {
                                if (fields.id === data.id) {
                                    data.set = checked
                                  }
                                return data;
                              })
                              );
                             }}></input>

                              <li>
                              <span  onClick={() =>handleEdit(fields)}><h6>{fields.title}</h6></span>
                              </li>

                            </div>
                            )}
                        </ul>
                        <br />
                    </div>
                  </form>    
                  <br />
                  <Button variant="danger" onClick={() => handleDelete(sel)}>Delete</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant="success" onClick={() => handleComplete(sel)}>Complete</Button>
              </div>

            <div style={{float: 'right', paddingRight: 200}} >
             <h3>Compelte Todo</h3>
              {complete.map((fields) => 
              <h6>{fields.title}</h6>
              )}
            </div>
    </span>
    </div>
    )
}


export default Check