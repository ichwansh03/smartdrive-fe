import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import apiService from '../../api/service_order/apiService';
import { Body, Cell, Head, Row, Table, Text } from '@clayui/core';
import ClayButton from '@clayui/button';
import ClayModal, { ClayModalProvider, useModal } from '@clayui/modal';
import { ClayCheckbox } from '@clayui/form';

export default function ServiceWorkorder() {

    const [workorder, setWorkorder] = useState([]);
    const [value, setValue] = useState([]);
    const { state } = useLocation();

    const workorderColumns = [
        { id: "sowoName", name: "Workorder" },
        { id: "sowoStatus", name: "Status" }
    ]

    useEffect(() => {
        if (state.taskId) {
          apiService.workorderList(state.taskId)
          .then(dataWorkorder => { setWorkorder(dataWorkorder); })
          setRefresh(false); 
        }
      }, [state.taskId, refresh, state]);    

    const closeModal = () => {
        setSelectedTaskId(null);
        onOpenChange(false);
    }
    
  return (
    <div>
        <ClayModal.Header>Update Workorder</ClayModal.Header>
            <ClayModal.Body>
              <Table>
                <Head items={workorderColumns}>
                  {column => (
                    <Cell key={column.id} sortable>
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
                              onChange={() => setValue(val => !val)}
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
    </div>
  )
}
