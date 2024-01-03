import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import ClayLayout from '@clayui/layout';
import Sidebar from '../component/Sidebar';

export default function MainLayout() {
    
    const colStyles = {
        backgroundColor: "#E7E7ED",
        border: "1px solid #CDCED9",
        paddingBottom: ".75rem",
        paddingTop: ".75rem"
      };

    return (
        <ClayLayout.ContainerFluid view>
        <ClayLayout.Row justify="start">
          <ClayLayout.Col size={3}>
            <Sidebar/>
          </ClayLayout.Col>
          <ClayLayout.Col size={9}>
            <Outlet />
          </ClayLayout.Col>
        </ClayLayout.Row>
      </ClayLayout.ContainerFluid>
  )
}
