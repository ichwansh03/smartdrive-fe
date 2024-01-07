import React, { useState } from 'react'
import ClayButton from '@clayui/button';
import { useNavigate } from 'react-router-dom';
import apiService from '../../api/service_order/apiService';

export default function ServiceOrder() {

  let navigate = useNavigate();

  const onSubmit =()=>{
    apiService.generateService({creqEntityId: 2}).then(result => {
      alert('data successfully generate');
    }).catch(error => console.log(error));

    navigate('/task', {state : {refresh : true}})
  }

  return (
    <div>
      <ClayButton displayType="primary" type='submit' onClick={onSubmit}>
				Create Service Order
			</ClayButton>
    </div>
  )
}
