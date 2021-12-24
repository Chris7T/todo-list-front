import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/auth';
import List from '../../components/Project/List/Index'

import { useNavigate } from 'react-router-dom';
import ListTask from '../../components/Task/List/Index';
import ListProject from '../../components/Project/List/Index';
import TaskLists from '../../components/Task/Index';


const Dashboard = () => {
    let navigate = useNavigate();
    const { logout, token } = useContext(AuthContext);
    const [ showP, setShowP] = useState(false)
    const [ showTasks, setShowTaks ] = useState(false)

    const doLogout = async () => {
        await logout();
    }

    const goToProject = async () => {
        setShowP(false)
        setShowTaks(true)
    }
    
    const goToTasks = async () => {
        setShowP(true)
        setShowTaks(false)
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>
            <button onClick={() => doLogout()}>Logout</button>
            </p>
            <div>
            <button onClick={() => goToProject()}>Projects</button>
            <button onClick={() => goToTasks()}>Tasks</button>
            </div>
            {
                showTasks
                ?
                <ListProject/> 
                :
                <TaskLists/>
                
            }
                    
               
        </div>
    )
}
export default Dashboard;
