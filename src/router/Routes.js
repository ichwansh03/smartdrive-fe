import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import UserLayout from '../layout/UserLayout'
import MasterLayout from '../layout/MasterLayout'
import Category from '../pages/master/Category'
import City from '../pages/master/City'
import Profile from '../pages/user/Profile'
import ServiceLayout from '../layout/ServiceLayout'
import ServiceTask from '../pages/service/ServiceTask'
import MainLayout from '../layout/MasterLayout'

export default function Routes() {
  return useRoutes([
    {
        path : '/',
        element : <MainLayout/>,
        children : [
            {path : 'category', element : <Category/>},
            {path : 'city', element : <City/>},
            {path : 'task', element : <ServiceTask/>}
        ]
    },
    {
        path : '/user',
        element : <UserLayout/>,
        children : [
            {path : 'profile', element : <Profile/>}
        ]
    }

  ])
}
