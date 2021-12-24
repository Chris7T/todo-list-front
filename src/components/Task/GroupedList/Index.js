import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listTasks, deleteTasks, getTasks, createTasks, updateTasks }  from '../../../services/task'
import { listProjects }  from '../../../services/project'


const GroupedListTask = ({ groupFilter}) => {
    let navigate = useNavigate();
    const [tasks, setTasks] = useState()
    const [groups , setGroups] = useState([])
    const [waitRender , setWaitRender] = useState(true)
  

  const listItem = async () => {
    try {
        const response = await listTasks({group: groupFilter});
        setTasks(response.data.data);     
    } catch (error) {
       console.log(error);
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

  const setTasksGroups = () => {

    let arrayAux = []
    for (const key in tasks) {
          arrayAux.push(key)
    }
    return arrayAux;
  }

  const deleteItem = async (data) =>{
      try {
        //const response = await deleteProject(data.id);
        listItem();
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

  const updateFieldChanged = (index, group) => e => {

    let newTasksAux = JSON.parse(JSON.stringify(tasks));
    newTasksAux[group][index][e.target.name] = e.target.value 

    setTasks(newTasksAux)
    
  }
  const handleKeyDown = item => e => {
    if(e.key == 'Enter'){
      updateItem(item) 
    }
  }
  useEffect(() => {
    listItem();
    
  }, []);

  useEffect(() => {
    setGroups(setTasksGroups())
    
  }, [tasks]);

  useEffect(() => {
    if(groups.length > 0){
      setWaitRender(false)
    }
    
  }, [groups]);
    return (
      <div>
        {waitRender ? <h4>LOADGING</h4> : 
            <ul>
            
              { 
                groups.map( (group, idxGroup) => {
                  return (
                  
                    <div key={idxGroup}>
                      {
                        <div>
                        {tasks[group] ?  <h2>{group}</h2> : <div>''</div>}
                        
                        {
                          tasks[group]?.map( (item, index) =>{
                            
                            return (
                              <li key={item.id } >
                              <p>
                                 - |
                              <input 
                                value={item.title} 
                                name="title" 
                                onChange={updateFieldChanged(index, group)} 
                                onKeyDown={handleKeyDown(item)}>
                              </input>
                              | - |
  
                              <label>
                                {' ' + item.project_name + ' '}
                              </label>
                              | - |
                              
                              <button onClick={() => updateItem(item)}> Atualizar </button>
                              
                              <button onClick={() => deleteItem(item)}> Apagar </button>
                              </p>
                              - |
                                <input name="description" value={item.description} onChange={updateFieldChanged(index, group)} onKeyDown={handleKeyDown(item)}/>
                              | - |
                                <select name="status" value={item.status} onChange={updateFieldChanged(index, group)}>
                                  <option value="OPEN">OPEN</option>
                                  <option value="IN PROGRESS">IN PROGRESS</option>
                                </select>
                                | - |
                               <input name="deadline" type ="date" value={item.deadline} onChange={updateFieldChanged(index, group)}/>                            
                              </li>
                            )
                            
                          })
                        } </div>
                      }
                    </div>
                  )
                })
              }  
            </ul>
  }
      </div>
    );
};
export default GroupedListTask;