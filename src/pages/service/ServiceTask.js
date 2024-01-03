import React, { useEffect, useState } from 'react'
import ClayButton from '@clayui/button';
import ClayModal, {useModal} from '@clayui/modal';
import apiService from '../../api/service_order/apiService'

export default function ServiceTask() {

    const [task, setTasks] = useState([]);

    useEffect(() => {
        apiService.taskList().then(data => {
            setTasks(data);
        })
    },[]);

  return (
    <div>
        <h1>Service Task</h1>
        <table>
            <thead>
                <th>Task ID</th>
                <th>Task Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
            </thead>
            <tbody>
                {
                    (task || []).map(item => (
                        <tr>
                            <td>{item.seotId}</td>
                            <td>{item.seotName}</td>
                            <td>{item.seotActualStartdate}</td>
                            <td>{item.seotActualEnddate}</td>
                            <td>{item.seotStatus}</td>
                            <ClayButton displayType="primary">...</ClayButton>
                        </tr>
                    ))    
                }
                </tbody>
        </table>
    </div>
  )
}
