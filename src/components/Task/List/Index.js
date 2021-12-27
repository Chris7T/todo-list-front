import React, { useState, useEffect } from 'react';
import { listTasks, deleteTasks, createTasks, updateTasks  }  from '../../../services/task'
import { listProjects , getProject}  from '../../../services/project'


const ListTask = (parameters) => {

    const [tasks, setTasks] = useState([]);
    const [formTask, setFormTask] = useState(false);
    const [projectFilter, setProjectFilter] = useState(parameters.projectId);
    const [projectId, setProjectId] = useState(parameters.projectId);
    const [projectName, setProjectName] = useState();
    const [title, setTitle] = useState('Task Name');
    const [description, setDescription] = useState(null);
    const [status, setStatus] = useState(null);
    const [deadline, setDeadline] = useState(null);
    const [listOfProjects, setListOfProjects] = useState([])
    
    const listItem = async () => {
        try {
            const response = await listTasks({project_id : projectId});
            setTasks(response.data.data);
        } catch (error) {
            console.log(error);
        
      };
    }
    useEffect(() => {
      listItem();
    }, []); 
    const allProjects = async () => {
        try {
          if(projectId){
            const response = await getProject(projectId);
            setProjectName([response.data.data.title]);
          }
          else {
            const response = await listProjects();
            setListOfProjects(response.data.data);
          }
            
        } catch (error) {
            console.log(error);
      };
    }
    const updateItem = async (data) =>{
      data = removeNull(data)
      try {
        const response = await updateTasks(data.id, data);
        listItem();
      } catch (error) {
          console.log(error);
      
      };
      
    }
    const deleteItem = async (data) =>{
        try {
          const response = await deleteTasks(data.id);
          listItem();
        } catch (error) {
            console.log(error);
        };
    }
    const updateFieldChanged = index => e => {
      let newArr = [...tasks]; 
      newArr[index][e.target.name] = e.target.value
      
      setTasks(newArr)
    }
    const handleKeyDown = item => e => {
      if(e.key == 'Enter'){
        updateItem(item) 
      }
    }
    const removeNull = (data) => {
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          if(data[key] == null){
            delete data[key]; 
          }
          
        }
      }
      return data
    }
    const newItem = async () => {
      setFormTask(true)
      await allProjects()
      
    }
    const createItem = async () =>{
      try {
        const response = await createTasks(removeNull(buildTaskObject()));
        listItem();
      } catch (error) {
          console.log(error);
      };
      setFormTask(false)
      setTitle(null)
      setDeadline(null)
      setDescription(null)
      setProjectId(null)
      setStatus(null)
    }
    const buildTaskObject = () =>{
      return {
        title:title,
        description:description,
        status:status,
        deadline:deadline,
        project_id:projectId
      }
    }
   
    return (
      <div>
            <h3>Tasks :</h3>
            <p>
              <button onClick={() => newItem()} >ADD +</button>
            </p>
      
            {
              formTask ? 
              
              <ul >

              <li >
                    <p>
                        - |
                    <input name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    | - |
                    {
                      projectFilter ?
                      <label>{projectName}</label>
                      :
                      <select name="status" onChange={(e) => setProjectId(e.target.value)}>
                      <option >Chose Project</option>
                      {
                        listOfProjects.map( (item)=>{
                          return (<option key={item.id} value={item.id}>{item.title}</option>)
                        })
                      }
                      </select>
                    }
                    | - |
                    <button onClick={() => createItem()}>
                      Save
                    </button>
      
                    </p>
                    - |
                      <input name="description" onChange={(e) => setDescription(e.target.value)}/>
                    | - |
                      <select name="status" onChange={(e) => setStatus(e.target.value)}>
                        <option value="OPEN">OPEN</option>
                        <option value="IN PROGRESS">IN PROGRESS</option>
                      </select>
                      | - |
                      <input name="deadline" type ="date"  onChange={(e) => setDeadline(e.target.value)}/>                            
                </li>
          </ul>  
              : <div></div>
            }
          <ul>
            {
                tasks.map((item, index) => 
                    {
                        return (
                          <li key={item.id } >
                            <p >
                               - |
                            <input 
                              value={item.title} 
                              name="title" 
                              onChange={updateFieldChanged(index)} 
                              onKeyDown={handleKeyDown(item)}>
                            </input>
                            | - |

                            <label>
                              {' ' + item.project_name + ' '}
                            </label>
                            | - |
                            
                            <button onClick={() => updateItem(item)}> Update </button>
                            
                            <button onClick={() => deleteItem(item)}> Delete </button>
                            </p>
                            - |
                              <input name="description" value={item.description} onChange={updateFieldChanged(index)} onKeyDown={handleKeyDown(item)}/>
                            | - |
                              <select name="status" value={item.status} onChange={updateFieldChanged(index)}>
                                <option value="OPEN">OPEN</option>
                                <option value="IN PROGRESS">IN PROGRESS</option>
                              </select>
                              | - |
                             <input name="deadline" type ="date" value={item.deadline} onChange={updateFieldChanged(index)}/>                            
                          </li>
                        )
                    }
                )
            }
          </ul>
      </div>
    );
};
export default ListTask;