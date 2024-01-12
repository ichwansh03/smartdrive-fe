import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import UserLayout from '../layout/UserLayout'
import MasterLayout from '../layout/MasterLayout'
import Category from '../pages/master/Category'
import User from '../pages/users/User'
import City from '../pages/master/City'
import ServiceLayout from '../layout/ServiceLayout'
import ServiceTask from '../pages/service/ServiceTask'
import MainLayout from '../layout/MasterLayout'
import AddCategory from '../pages/master/AddCategory'
import EditCategory from '../pages/master/EditCategory'
import ServiceOrder from '../pages/service/ServiceOrder'
import ServicePolis from '../pages/service/ServicePolis'
import AddUser from '../pages/users/AddUser'
import EditUser from '../pages/users/EditUser'

export default function Routes() {
  return useRoutes([
    {
        path : '/',
        element : <MainLayout/>,
        children : [
            {path : 'category', element : <Category/>},
            {path : 'category/add', element : <AddCategory/>},
            {path : 'category/edit', element : <EditCategory/>},
            {path : 'user', element : <User/>},
            {path : 'user/add', element : <AddUser/>},
            {path : 'user/edit', element : <EditUser/>},
            {path : 'order', element : <ServiceOrder/>},
            {path : 'polis', element : <ServicePolis/>},
            {path : 'task', element : <ServiceTask/>}
        ]
    }

  ])
}
