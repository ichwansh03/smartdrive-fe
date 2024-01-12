import React from 'react'
import {ClayVerticalNav} from '@clayui/nav'
import { Link } from 'react-router-dom'

export default function Sidebar() {

    const menus = [
        {
          id: "1",
          items: [],
          label: "Home"
        },
        {
          id: "3",
          href: "category",
          label: "Category"
        },
        {
          id: "4",
          href: "user",
          label: "User"
        },
        {
          id: "5",
          items: [
            {
              id: "7",
              href: "order",
              label: "Request Feasiblity"
            },
            {
              id: "8",
              href: "polis",
              label: "Request Polis & Claim"
            },
            {
              id: "6",
              href: "task",
              label: "Service Task"
            }
          ],
          label: "Service Module"
        },
        {
          id: "9",
          href: "#7",
          label: "Seven"
        }
      ]

  return (
    <ClayVerticalNav
      active="6"
      defaultExpandedKeys={new Set(["6"])}
      items={menus}
      large={false}
      spritemap={false}
    >
      {item => (
        <ClayVerticalNav.Item href={item.href} items={item.items} key={item.id}>
          <Link to={item.href}>{item.label}</Link>
        </ClayVerticalNav.Item>
      )}
    </ClayVerticalNav>
  )
}
