import React, { useEffect, useState } from 'react'
import { Body, Button, Cell, Head, Row, Table, Text } from '@clayui/core';
import PanelPage from '../../component/PanelPage';
import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import { useNavigate, useLocation } from "react-router-dom";
import apiService from '../../api/service_order/apiService';
import ClayIcon from '@clayui/icon';
import { ClayInput } from '@clayui/form';
import ClayManagementToolbar from '@clayui/management-toolbar';
import ClayPaginationBar from '@clayui/pagination-bar';
import { ClayPaginationWithBasicItems } from '@clayui/pagination';

export default function ServiceOrder() {

  let navigate = useNavigate();
  const [order, setOrder] = useState([]);

  const [refresh, setRefresh] = useState(false);
  const { state } = useLocation();

  useEffect(() => {
    apiService.serviceOrders().then(orders => {
      console.log('data : ', orders);
      setOrder(orders);
    });
    setRefresh(false);
  }, [refresh, state])

  const itemColumn = [
    { id: "customerName", name: "Customer Name" },
    { id: "customerEmail", name: "Customer Email" },
    { id: "createdOn", name: "Created On" },
    { id: "seroId", name: "Feasiblity ID" },
    { id: "servStatus", name: "Feasiblity Status" },
    { id: "action", name: "Action" }
  ]

  const onFeasiblity = (id) => {
    navigate('/task', { state: { id: id } })
  }

  const onRequestPolis = (id) => {
    apiService.generateService({creqEntityId: id}).then(result => {
      alert('data successfully generate');
    }).catch(error => console.log(error));

    navigate('/polis', { state: { refresh: true } })
  }

  return (
    <div>
      <PanelPage title={"Customer Request"} />
      <ClayManagementToolbar>
        <ClayManagementToolbar.ItemList>
          <ClayManagementToolbar.Search>
            <ClayInput.Group>
              <ClayInput.GroupItem>
                <ClayInput
                  aria-label="Search"
                  className="form-control input-group-inset input-group-inset-after"
                  placeholder='Customer Name'
                  type="text"
                />
                <ClayInput.GroupInsetItem after tag="span">
                  <ClayButtonWithIcon
                    aria-label="Close search"
                    className="navbar-breakpoint-d-none"
                    displayType="unstyled"
                    symbol="times"
                  />
                  <ClayButtonWithIcon
                    aria-label="Search"
                    displayType="unstyled"
                    symbol="search"
                    type="submit"
                  />
                </ClayInput.GroupInsetItem>
              </ClayInput.GroupItem>
            </ClayInput.Group>
          </ClayManagementToolbar.Search>

          <ClayManagementToolbar.Item>
            <ClayButton
              aria-label="Info"
              className="nav-link nav-link-monospaced"
              displayType="unstyled"
              onClick={() => { }}
            >
              <ClayIcon symbol="info-circle-open" />
            </ClayButton>
          </ClayManagementToolbar.Item>
        </ClayManagementToolbar.ItemList>
      </ClayManagementToolbar>
      <br />
      <Table>
        <Head items={itemColumn}>
          {
            column => (
              <Cell key={column.id}>
                {column.name}
              </Cell>
            )
          }
        </Head>
        <Body defaultItems={order}>
          {
            (order || []).map(
              row => (
                <Row key={row["seroId"]}>
                  <Cell>{row["customerName"]}</Cell>
                  <Cell>{row["customerEmail"]}</Cell>
                  <Cell>{row["createdOn"]}</Cell>
                  <Cell>
                    <div onClick={() => onFeasiblity(row["seroId"])}>
                      {row["seroId"]}
                    </div>
                  </Cell>
                  <Cell>{row["servStatus"]}</Cell>
                  {
                    row["servStatus"] === "INACTIVE" ? (
                      <ClayButton displayType="secondary" type='submit' disabled>Request Polis</ClayButton>
                    ) : (
                      <ClayButton displayType="primary" type='submit' onClick={() => onRequestPolis(row["creqId"])}>Request Polis</ClayButton>
                    )
                  }
                </Row>
              )
            )
          }
        </Body>
      </Table>
      <ClayPaginationBar>
        <ClayPaginationBar.DropDown
          items={[
            {
              label: "10",
              onClick: () => { }
            }
          ]}
          trigger={
            <ClayButton displayType="unstyled">
              {"10 items per page"}

              <ClayIcon symbol="caret-double-l" />
            </ClayButton>
          }
        />

        <ClayPaginationBar.Results>
          {"Showing a handful of items..."}
        </ClayPaginationBar.Results>

        <ClayPaginationWithBasicItems
          defaultActive={1}
          ellipsisProps={{ "aria-label": "More", title: "More" }}
          totalPages={10}
        />
      </ClayPaginationBar>
    </div>
  )
}
