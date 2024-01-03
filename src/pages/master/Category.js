import React, { useEffect, useState, useCallback } from 'react'
import apiCategory from '../../api/apiCategory';
import { Body, Cell, Head, Row, Table, Text } from '@clayui/core';
import PanelPage from '../../component/PanelPage';
import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import ClayIcon from '@clayui/icon';
import { ClayInput } from '@clayui/form';
import ClayManagementToolbar from '@clayui/management-toolbar';
import { useNavigate, useLocation } from "react-router-dom";
import DropDown from '@clayui/drop-down';

export default function Category() {

  let navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [searchMobile, setSearchMobile] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [sort, setSort] = useState(null);
  const [keyValue, setKeyValue] = useState({ search: '' });

  //untuk mengambil nilai dari class lain (export data)
  const { state } = useLocation();

  //phase componentDidMount hanya di execute sekali pada saat component/function
  //category pertama kali di call oleh menu di sidebar
  useEffect(() => {
    apiCategory.list().then(data => {
      setCategory(data);
    })

    setRefresh(false);
  }, [refresh, state]); //use empty array agar dapat diexecute sekali

  const onSortChange = useCallback(sort => {
    if (sort) {
      setCategory(items =>
        items.sort((a, b) => {
          let cmp = new Intl.Collator("en", { numeric: true }).compare(
            a[sort.column],
            b[sort.column]
          );

          if (sort.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        })
      );
    }

    setSort(sort);
  }, []);

  const itemColumn = [{
    id: "cateId",
    name: "ID"
  },
  {
    id: "cateName",
    name: "Category Name"
  },
  {
    id: "action",
    name: "Action"
  }]

  const onSearch = (e) => {
    e.preventDefault();

    if (keyValue.search.length === 0) {
      setRefresh(true)
    }

    setCategory([...category.filter(el => el.cateName
      .toLowerCase().includes(keyValue.search.toLowerCase()))])
  }

  const onEdit =(id)=>{
    navigate('edit', {state : {id : id}})
  }

  const onDelete =(id)=>{
    apiCategory.deleteRow(id).then(result => {
      console.log('data successfully has been removed')
    }).catch(error => console.log(error));

    setRefresh(true);
  }

  return (
    <div>
      <PanelPage title={"Category Page"} />
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
                  onChange={(event) => {
                    setKeyValue({ ...keyValue, search: event.target.value })
                    console.log(keyValue.search);
                  }}
                />
                <ClayInput.GroupInsetItem after tag="span">
                  <ClayButtonWithIcon
                    aria-label="Close search"
                    className="navbar-breakpoint-d-none"
                    displayType="unstyled"
                    onClick={() => setSearchMobile(false)}
                    symbol="times"
                  />
                  <ClayButtonWithIcon
                    aria-label="Search"
                    displayType="unstyled"
                    symbol="search"
                    type="submit"
                    onClick={(e) => onSearch(e)}
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
      <Table onSortChange={onSortChange} sort={sort}>
        <Head
          items={itemColumn}
        >
          {column => (
            <Cell key={column.id} sortable>
              {column.name}
            </Cell>
          )}
        </Head>

        <Body defaultItems={category}>
          {
            (category || []).map(
              row => (
                <Row key={row["cateId"]}>
                  <Cell>
                    <Text size={3} weight="semi-bold">
                      {row["cateId"]}
                    </Text>
                  </Cell>
                  <Cell>{row["cateName"]}</Cell>
                  <Cell>
                    <DropDown trigger={<ClayIcon
                      className="inline-item inline-item-after"
                      symbol="ellipsis-v"
                    />}>
                      <DropDown.ItemList>
                        <DropDown.Item onClick={() => onEdit(row['cateId'])}>
                          Edit
                        </DropDown.Item>
                        <DropDown.Item
                          onClick={() => onDelete(row['cateId'])}>
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
