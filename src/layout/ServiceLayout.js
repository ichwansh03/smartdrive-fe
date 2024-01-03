import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import ClayLayout from '@clayui/layout';
import Sidebar from '../component/Sidebar';

export default function ServiceLayout() {
    
    const colStyles = {
        backgroundColor: "#E7E7ED",
        border: "1px solid #CDCED9",
        paddingBottom: ".75rem",
        paddingTop: ".75rem"
      };

    return (
        <ClayLayout.ContainerFluid view>
        <ClayLayout.Row justify="start">
          <ClayLayout.Col size={4} style={colStyles}>
            <Sidebar/>
          </ClayLayout.Col>
          <ClayLayout.Col size={8} style={colStyles}>
            <Outlet />
          </ClayLayout.Col>
        </ClayLayout.Row>
      </ClayLayout.ContainerFluid>
  )
}
