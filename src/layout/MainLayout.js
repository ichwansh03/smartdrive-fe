import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ClayLayout from '@clayui/layout';

export default function MasterLayout() {
    return (
        <>
        <div>
            <h1>MasterLayout</h1>
        </div>

        <ul>
            <Link to="category">Category</Link>
            <Link to="city">City</Link>
            <Link to="task">ServiceTask</Link>
        </ul>

        <div>
            <Outlet/>
        </div>
        </>
    )
}
