import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import apiService from '../../api/service_order/apiService';
import { Body, Cell, Head, Row, Table, Text } from '@clayui/core';
import PanelPage from '../../component/PanelPage';
import ClayButton from '@clayui/button';
import ClayManagementToolbar from '@clayui/management-toolbar';
import { ClayInput } from '@clayui/form';
import ClayModal, {useModal} from '@clayui/modal';

export default function ServiceTask() {

  //let navigate = useNavigate();
  const [task, setTasks] = useState([]);
  const [order, setOrders] = useState([]);

  const [refresh, setRefresh] = useState(false);
  const { observer, onOpenChange, open } = useModal();
  const { state } = useLocation();

  useEffect(() => {
    apiService.taskList('FS0001-20231221')
      .then(dataTask => { setTasks(dataTask.soTasksDtoList); })
  }, []);

  useEffect(() => {
    apiService.taskList('FS0001-20231221')
      .then(dataOrder => { setOrders(dataOrder); })
  }, []);

  const itemColumns = [
    { id: "seotId", name: "Task ID" },
    { id: "seotName", name: "Task Name" },
    { id: "seotActualStartdate", name: "Start Date" },
    { id: "seotActualEnddate", name: "End Date" },
    { id: "seotStatus", name: "Status" },
    { id: "action", name: "Action" }
  ]

  const onChecklist = (id) => {
    alert("{seotId}")
  }

  return (
    <div>
      {open && (
				<ClayModal observer={observer}>
					<ClayModal.Header>Update Workorder</ClayModal.Header>
					<ClayModal.Body>
            <Table>
              <Head>
                <Cell>Workorder</Cell>
                <Cell>Status</Cell>
              </Head>
            </Table>      
          </ClayModal.Body>
					<ClayModal.Footer
            last={
              <ClayButton.Group spaced>
                <ClayButton
                  displayType="secondary"
                  onClick={() => onOpenChange(false)}>
                  Cancel
                </ClayButton>
                <ClayButton onClick={() => onOpenChange(false)}>
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
                <label>Service Order Name</label>
                <ClayInput
                  type="text" readOnly={true} value={order.seroId}>
                </ClayInput>
                {/* <label>Created On</label>
                <ClayInput
                  type="text" readOnly={true} value={order.services.servCreatedOn}>
                </ClayInput>
                <label>Service Type</label>
                <ClayInput
                  type="text" readOnly={true} value={order.services.servType}>
                </ClayInput> */}
                <label>Status</label>
                <ClayInput
                  type="text" readOnly={true} value={order.seroStatus}>
                </ClayInput>
                <label>Polis Number</label>
                <ClayInput
                  type="text" readOnly={true} value={order.servClaimNo}>
                </ClayInput>
                {/* <label>Customer Name</label>
                <ClayInput
                  type="text" readOnly={true} value={order.services.userDto.userFullName}>
                </ClayInput> */}
                {/* <label>Financial Advisor</label>
                <ClayInput
                  type="text" readOnly={true} value={order.employees.employees.empName}>
                </ClayInput> */}
              </ClayInput.GroupItem>
            </ClayInput.Group>
          </ClayManagementToolbar.Item>
        </ClayManagementToolbar.ItemList>
      </ClayManagementToolbar>
      <Table>
        <Head items={itemColumns}>
          {column => (
            <Cell key={column.id} sortable>
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
                    <ClayButton displayType="primary" onClick={() => onOpenChange(true)}>...</ClayButton>
                  </Cell>
                </Row>
              )
            )
          }
        </Body>
      </Table>
    </div>
  )
}
