import React, { useEffect, useState } from 'react'
import apiCategory from '../../api/apiCategory';

export default function Category() {

    const [category, setCategory] = useState([]);

    //phase componentDidMount hanya di execute sekali pada saat component/function
    //category pertama kali di call oleh menu di sidebar
    useEffect(() =>{
        apiCategory.list().then(data => {
            setCategory(data);
        })
    },[]); //use empty array agar dapat diexecute sekali

  return (
    <div>
        <h1>Category</h1>
        <table>
            <thead>
                <th>Category ID</th>
                <th>Category Name</th>
            </thead>
            <tbody>
                {
                    (category || []).map(item =>(
                        <tr>
                            <td>{item.cateId}</td>
                            <td>{item.cateName}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}
