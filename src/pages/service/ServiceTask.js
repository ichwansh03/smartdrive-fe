import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import apiService from '../../api/service_order/apiService';
import { Body, Cell, Head, Row, Table, Text } from '@clayui/core';
import PanelPage from '../../component/PanelPage';
import ClayButton from '@clayui/button';
import ClayManagementToolbar from '@clayui/management-toolbar';
import { ClayInput } from '@clayui/form';
import ClayModal, { ClayModalProvider, useModal } from '@clayui/modal';
import { ClayCheckbox } from '@clayui/form';

export default function ServiceTask() {

  //order
  const [order, setOrders] = useState([]);
  //list task
  const [task, setTasks] = useState([]);
  //get workorder by task id
  const [workorderTaskId, setWorkorderTaskId] = useState(null);
  //get workorder
  const [workorder, setWorkorder] = useState([]);
  //set checked task
  const [checked, isChecked] = useState(false);
  
  const [refresh, setRefresh] = useState(false);
  const [value, setValue] = useState([false]);
  const { observer, onOpenChange, open } = useModal();
  const { state } = useLocation();

  //data order
  useEffect(() => {
    apiService.taskList('FS0001-20231219')
      .then(dataOrder => { 
        setOrders(dataOrder);
     })
     setRefresh(false);
  }, [refresh, state]);

  //data list task 
  useEffect(() => {
    apiService.taskList('FS0001-20231219')
      .then(dataTask => { 
        setTasks(dataTask.soTasksDtoList);
      })
      setRefresh(false);
  }, [refresh, state]);

  //data list workorder
  useEffect(() => {
    if (workorderTaskId) {
      apiService.workorderList(workorderTaskId)
        .then(dataWorkorder => { setWorkorder(dataWorkorder); })
      setRefresh(false);
    }
  }, [workorderTaskId, refresh, state]);

  const taskColumns = [
    { id: "seotId", name: "Task ID" },
    { id: "seotName", name: "Task Name" },
    { id: "seotActualStartdate", name: "Start Date" },
    { id: "seotActualEnddate", name: "End Date" },
    { id: "seotStatus", name: "Status" },
    { id: "action", name: "Action" }
  ]

  const workorderColumns = [
    { id: "sowoName", name: "Workorder" },
    { id: "sowoStatus", name: "Status" }
  ]

  const openModal = (taskId) => {
    setWorkorderTaskId(taskId);
    onOpenChange(true);
  }

  const closeModal = () => {
    setWorkorderTaskId(null);
    onOpenChange(false);
  }

  //handle checkbox task
  const handleTaskStatus = (id) => {
    isChecked(!checked);

    if (!checked) {
      updateStatus('COMPLETED', id);
    } else {
      updateStatus('INPROGRESS', id);
    }
  }

  //update task status
  const updateStatus = (status, id) => {
    apiService.taskUpdate({seotStatus: status}, id).then(result => {
      alert('data successfully completed', result);
    }).catch(error => console.log(error));
  }

  return (
    <div>
      <ClayModalProvider>
        {open && (
          <ClayModal observer={observer} >
            <ClayModal.Header>Update Workorder</ClayModal.Header>
            <ClayModal.Body>
              <Table>
                <Head items={workorderColumns}>
                  {column => (
                    <Cell key={column.id}>
                      {column.name}
                    </Cell>
                  )}
                </Head>
                <Body defaultItems={workorder}>
                  {
                    (workorder || []).map(
                      row => (
                        <Row>
                          <Cell>{row["sowoName"]}</Cell>
                          <Cell>
                            <ClayCheckbox
                              aria-label="Completed"
                              checked={value}
                              label="Completed"
                              onChange={() => setValue(val => val)}
                            />
                          </Cell>
                        </Row>
                      )
                    )
                  }
                </Body>
              </Table>
            </ClayModal.Body>
            <ClayModal.Footer
              last={
                <ClayButton.Group spaced>
                  <ClayButton
                    displayType="secondary"
                    onClick={() => closeModal()}>
                    Cancel
                  </ClayButton>
                  <ClayButton onClick={() => closeModal()}>
                    Save
                  </ClayButton>
                </ClayButton.Group>
              }
            />
          </ClayModal>
        )}
        <PanelPage title={"Customer Request"} />
        <ClayManagementToolbar>
          <ClayManagementToolbar.ItemList>

            <ClayManagementToolbar.Item>
              <ClayInput.Group>
                <ClayInput.GroupItem>
                  <div className='col-3 float-left'>
                    <label>Service Order Name</label>
                    <ClayInput
                      type="text" readOnly={true} value={order.seroId}>
                    </ClayInput>
                  </div>
                  {/* <div className='col-3 float-left'>
                    <label>Created On</label>
                    <ClayInput
                      type="text" readOnly={true} value={order.services.servCreatedOn}>
                    </ClayInput>
                  </div>
                  <div className='col-2 float-left'>
                    <label>Service Type</label>
                    <ClayInput
                      type="text" readOnly={true} value={order.services.servType}>
                    </ClayInput>
                  </div> */}
                  <div className='col-2 float-left'>
                    <label>Status</label>
                    <ClayInput
                      type="text" readOnly={true} value={order.seroStatus}>
                    </ClayInput>
                  </div>
                  <div className='col-2 float-left'>
                    <label>Polis Number</label>
                    <ClayInput
                      type="text" readOnly={true} value={order.servClaimNo}>
                    </ClayInput>
                  </div>
                  {/* <div className='col-md-3'>
                    <label>Customer Name</label>
                    <ClayInput
                      type="text" readOnly={true} value={order.services.userDto.userFullName}>
                    </ClayInput>
                  </div>
                  <div className='col-md-3'>
                    <label>Financial Advisor</label>
                    <ClayInput
                      type="text" readOnly={true} value={order.employees.employees.empName}>
                    </ClayInput>
                  </div> */}
                </ClayInput.GroupItem>
              </ClayInput.Group>
            </ClayManagementToolbar.Item>
          </ClayManagementToolbar.ItemList>
        </ClayManagementToolbar>
        <br />
        <Table>
          <Head items={taskColumns}>
            {column => (
              <Cell key={column.id}>
                {column.name}
              </Cell>
            )}
          </Head>

          <Body defaultItems={task}>
            {
              (task || []).map(
                row => (
                  <Row key={row["seotId"]}>
                    <Cell>
                      <Text size={3} weight="semi-bold">
                        {row["seotId"]}
                      </Text>
                    </Cell>
                    <Cell>{row["seotName"]}</Cell>
                    <Cell>{row["seotActualStartdate"]}</Cell>
                    <Cell>{row["seotActualEnddate"]}</Cell>
                    <Cell>{row["seotStatus"]}</Cell>
                    <Cell>
                      {
                        row["serviceOrderWorkorders"].length === 0 ? (
                          <ClayCheckbox checked={checked} onChange={()=>handleTaskStatus(row["seotId"])}></ClayCheckbox>
                        ) : (
                          <ClayButton displayType="primary" onClick={() => openModal(row["seotId"])}>...</ClayButton>
                        )
                      }
                    </Cell>
                  </Row>
                )
              )
            }
          </Body>
        </Table>
      </ClayModalProvider>
    </div>
  )
}