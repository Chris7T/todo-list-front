import React, { useContext, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import ListTask from '../../components/Task/List/Index';
import GroupedListTask from './GroupedList/Index';

const TaskLists = () => {
    let navigate = useNavigate();
    const [ group, setGroup ] = useState('Nenhum')
  

    return (
        <div>
            <h1>
                Agrupar
            </h1>
            <select name="group" onChange={(e) => setGroup(e.target.value)}>
                <option value='Nenhum'>Nenhum</option>
                <option value='Status'>Status</option>
                <option value='Prazo'>Prazo</option>
            </select>
            {group == 'Nenhum' ? <ListTask/> :<></> }
            {group == 'Status' ? <GroupedListTask groupFilter={'status'}/> :<></> }
            {group == 'Prazo' ? <GroupedListTask groupFilter={'deadline'}/> :<></> }
            {/* <GroupedListTask group="status"/> */}
        </div>
    )
}
export default TaskLists;
