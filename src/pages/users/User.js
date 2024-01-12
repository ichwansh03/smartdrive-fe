import React, { useEffect, useState, useCallback } from 'react'
import { Body, Cell, Head, Row, Table, Text } from '@clayui/core';
import PanelPage from '../../component/PanelPage';
import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import ClayIcon from '@clayui/icon';
import { ClayInput } from '@clayui/form';
import ClayManagementToolbar from '@clayui/management-toolbar';
import { useNavigate, useLocation } from "react-router-dom";
import apiUser from '../../api/apiUser';
import DropDown from '@clayui/drop-down';

export default function User() {

    let navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [refresh, setRefresh] = useState(false);
  
    //untuk mengambil nilai dari class lain (export data)
    const { state } = useLocation();
  
    //phase componentDidMount hanya di execute sekali pada saat component/function
    //category pertama kali di call oleh menu di sidebar
    useEffect(() => {
      apiUser.list().then(data => {
        setUser(data);
      })
  
      setRefresh(false);
    }, [refresh, state]); //use empty array agar dapat diexecute sekali
    
    const itemColumn = [{
      id: "userId",
      name: "ID"
    },
    {
      id: "username",
      name: "UserName"
    },
    {
      id: "action",
      name: "Action"
    }]
  

    const onEdit =(id)=>{
      navigate('edit', {state : {id : id}})
    }
  
    const onDelete =(id)=>{
      apiUser.deleteRow(id).then(result => {
        console.log('data successfully has been removed')
      }).catch(error => console.log(error));
  
      setRefresh(true);
    }
  

  return (
    <div>
        <PanelPage title={"User Page"} />
      <ClayManagementToolbar>
        <ClayManagementToolbar.ItemList>
          <ClayManagementToolbar.Search>
            <ClayInput.Group>
              <ClayInput.GroupItem>
                <ClayInput
                  aria-label="Search"
                  className="form-control input-group-inset input-group-inset-after"
                  placeholder='e.g: Extend'
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

          <ClayManagementToolbar.Item>
            <ClayButtonWithIcon
              aria-label="Add"
              className="nav-btn nav-btn-monospaced"
              symbol="plus"
              onClick={() => navigate('add')}
            />
          </ClayManagementToolbar.Item>
        </ClayManagementToolbar.ItemList>
      </ClayManagementToolbar>
      <Table >
        <Head
          items={itemColumn}
        >
          {column => (
            <Cell key={column.id}>
              {column.name}
            </Cell>
          )}
        </Head>

        <Body defaultItems={user}>
          {
            (user || []).map(
              row => (
                <Row key={row["userId"]}>
                  <Cell>
                    <Text size={3} weight="semi-bold">
                      {row["userId"]}
                    </Text>
                  </Cell>
                  <Cell>{row["username"]}</Cell>
                  <Cell>
                    <DropDown trigger={<ClayIcon
                      className="inline-item inline-item-after"
                      symbol="ellipsis-v"
                    />}>
                      <DropDown.ItemList>
                        <DropDown.Item onClick={() => onEdit(row['userId'])}>
                          Edit
                        </DropDown.Item>
                        <DropDown.Item
                          onClick={() => onDelete(row['userId'])}>
                          Delete
                        </DropDown.Item>
                      </DropDown.ItemList>
                    </DropDown>
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
