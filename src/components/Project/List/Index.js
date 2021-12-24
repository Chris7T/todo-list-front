import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  listProjects, 
  deleteProject, 
  createProject, 
  updateProject, 
  shareProject ,
  linkProject,
  unlinkProject
}  from '../../../services/project'
import ListTask from '../../Task/List/Index';


const ListProject = (parameters) => {
    let navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [shared, setShared] = useState(null);
    const [clickCount, setClickCount] = useState(0);
    const [singleClickTimer, setSingleClickTimer] = useState('');
    const [projectId, setProjectId] = useState(null)
    const [projectName, setProjectName] = useState(null)
    const [title, setTitle] = useState('New Project')
    const [formProject, setFormProject] = useState(false)
    const [showLinkProject , setShowLinkProject ] = useState(false)
    const [linkCode, setLinkCode] = useState(null)
    
    const listItem = async () => {
        try {
            const response = await listProjects();
            
            setProjects(JSON.parse(JSON.stringify(response.data.data)));
        } catch (error) {
            console.log(error);
        
      };
    }
    
    useEffect(() => {
      listItem();
    }, []);
      
    const openItem = (data) =>{
      
        setProjectId(data.id)
        setProjectName(data.title)
    }

    const closeItem = (data) =>{
      setProjectId(null)
      setProjectName(null)
    }
  
    const updateItem = async (data) =>{
      try {
        const response = await updateProject(data.id, data);
        listItem();
      } catch (error) {
          console.log(error);
      
      };
      
    }

    const deleteItem = async (data) =>{
        try {
          const response = await deleteProject(data.id);
          listItem();
        } catch (error) {
            console.log(error);
        
        };
    }

    const shareItem = async (data) =>{
        try {
          const response = await shareProject(data.id);
          data.link = response.data.message
          setShared(data)
        } catch (error) {
            console.log(error);
        
        };
    }

    const updateFieldChanged = index => e => {
      
      let newArr = [...projects]; 
      newArr[index]['title'] = e.target.value
      setProjects(newArr)
    }
    const handleKeyDown = item => e => {
      if(e.key == 'Enter'){
        updateItem(item) 
      }
    }
    const newItem = () =>{
      setShowLinkProject(false)
      setFormProject(true)
    }
    const linkNewItem = () =>{
      setShowLinkProject(true)
      setFormProject(false)
      
    }
    const linkItem = async () =>{
      setShowLinkProject(false)
      try {
        const response = await linkProject(linkCode);
        setLinkCode(null)
        listItem();
      } catch (error) {   
          console.log(error);
      };
    }
    const createItem = async ()=>{
      try {
        const response = await createProject({ title: title});
        
        listItem();
        setTitle('New Project')
      } catch (error) {
          
          console.log(error);
      };
      setFormProject(false)
    }
    const unkLinkItem = async (item)=>{
      try {
        const response = await unlinkProject(item.id);
        listItem();
      } catch (error) {   
          console.log(error);
      };
    }
    return (
      <div>
        <h3>Projects :</h3>
        <h3>Tasks :</h3>
            <p>
              <button onClick={() => newItem()} >Create new </button>
              <button onClick={() => linkNewItem()} >Link new</button>
            </p>
            {
              showLinkProject ? 
              <ul >
                <li>
                  <p>
                    ## - |
                  <input value={linkCode} name = "title" onChange={(e) => setLinkCode(e.target.value)} ></input>
                   | - |
                  <button onClick = {() => linkItem()}> Link Now </button>
                  </p>
                </li>
              </ul>
              : <div></div>
            }
            {
              formProject ? 
              <ul >
                <li>
                  <p>
                    ## - |
                  <input value={title} name = "title" onChange={(e) => setTitle(e.target.value)} ></input>
                   | - |
                  <button onClick = {() => createItem()}> Salvar </button>
                  </p>
                </li>
              </ul>
              : <div></div>
            }
          <ul></ul>
        { !projectId ? 
          <ul>
            
            {
                projects.map((item, index) => {
                    {
                        return (
                          <li key = {item.id } >
                            <p onDoubleClick = {() => openItem(item)}>
                              {item.id.toString().padStart(4, '0')} - |
                            <input value={item.title} name = "title" onChange={updateFieldChanged(index)} onKeyDown = {handleKeyDown(item)}></input>
                            <label > {item.owner}</label>
                             - |
                            <button onClick = {() => openItem(item)}> Abrir </button>
                            <button onClick = {() => updateItem(item)}> Atualizar </button>
                            <button onClick = {() => unkLinkItem(item)}> Desvicular </button>
                            <button onClick = {() => deleteItem(item)}> Apagar </button>
                            <button onClick = {() => shareItem(item)}> Compartilhar </button>
                            </p>
                            <p>
                              {item.id == shared?.id ? <div>Code : </div>  : <div></div>}
                              {item.id == shared?.id ? shared.link  : ''}
                              {item.id == shared?.id ? (<button onClick={() => setShared(null)}>Close</button>)  : ''}
                            </p>
                          </li>
                        )
                    }
                })
            }
          </ul>
       : <div><h3>{projectName}</h3>
       <button onClick={() =>closeItem()}> Voltar </button>
       <ListTask projectId={projectId}/>
       </div>}
      </div>
    );
};
export default ListProject;