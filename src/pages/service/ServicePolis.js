import React, { useEffect, useState, useCallback } from 'react'
import { Body, Button, Cell, Head, Row, Table, Text } from '@clayui/core';
import PanelPage from '../../component/PanelPage';
import { useNavigate, useLocation } from "react-router-dom";
import apiService from '../../api/service_order/apiService';
import ClayIcon from '@clayui/icon';
import { ClayInput } from '@clayui/form';
import ClayManagementToolbar from '@clayui/management-toolbar';
import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import ClayPaginationBar from '@clayui/pagination-bar';
import { ClayPaginationWithBasicItems } from '@clayui/pagination';

export default function ServicePolis() {
    
    let navigate = useNavigate();
  const [polis, setPolis] = useState([]);

  const [refresh, setRefresh] = useState(false);
  const { state } = useLocation();

  useEffect(() => {
    apiService.requestPolis().then(orders => {
      console.log('data : ',orders);
      setPolis(orders);
    });
    setRefresh(false);
  }, [refresh, state])

  const onPolis = (id) => {
    navigate('/task', { state: { id: id } })
  }

  const itemColumn = [
    { id: "customerName", name: "Customer Name" },
    { id: "polisNo", name: "Polis Number" },
    { id: "vehicleNo", name: "Vehicle Number" },
    { id: "periode", name: "Periode" },
    { id: "totalPremi", name: "Total Premi" },
    { id: "seroId", name: "Service Order ID" },
    { id: "servType", name: "Service Type" },
    { id: "action", name: "Action" }
  ]

  return (
    <div>
        <PanelPage title={"Service Order Polis"} />
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
        <Body defaultItems={polis}>
          {
            (polis || []).map(
              row => (
                <Row key={row["seroId"]}>
                  <Cell>{row["customerName"]}</Cell>
                  <Cell>{row["polisNo"]}</Cell>
                  <Cell>{row["vehicleNo"]}</Cell>
                  <Cell>{row["periode"]}</Cell>
                  <Cell>{row["totalPremi"]}</Cell>
                  <Cell>
                  <div onClick={() => onPolis(row["seroId"])}>
                      {row["seroId"]}
                    </div>
                  </Cell>
                  <Cell>{row["servType"]}</Cell>
                  {
                    row["servType"] === "POLIS" ? (
                      <ClayButton displayType="primary">Request Claim</ClayButton>
                    ) : (
                      <Text>Claim Processed</Text>
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
            onClick: () => {}
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
