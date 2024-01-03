import React, { useEffect, useState } from 'react'
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
                <th>Sero ID</th>
                <th>Sero Status</th>
            </thead>
            <tbody>
                {
                    (task || []).map(item => (
                        <tr>
                            <td>{item.seroId}</td>
                            <td>{item.seroStatus}</td>
                        </tr>
                    ))    
                }
                </tbody>
        </table>
    </div>
  )
}
