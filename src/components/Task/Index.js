import React, { useState } from 'react';

import ListTask from '../../components/Task/List/Index';
import GroupedListTask from './GroupedList/Index';

const TaskLists = () => {
    const [ group, setGroup ] = useState('None')
  

    return (
        <div>
            <h1>
                Group
            </h1>
            <select name="group" onChange={(e) => setGroup(e.target.value)}>
                <option value='None'>None</option>
                <option value='Status'>Status</option>
                <option value='Deadline'>Deadline</option>
            </select>
            {group == 'None' ? <ListTask/> :<></> }
            {group == 'Status' ? <GroupedListTask groupFilter={'status'}/> :<></> }
            {group == 'Deadline' ? <GroupedListTask groupFilter={'deadline'}/> :<></> }
        </div>
    )
}
export default TaskLists;
