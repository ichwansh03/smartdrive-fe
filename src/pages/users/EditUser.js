import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ClayForm, { ClayInput } from '@clayui/form';
import ClayPanel from '@clayui/panel';
import ClayButton from '@clayui/button'
import apiUser from '../../api/apiUser';

export default function EditUser() {

    let navigate = useNavigate();

    let {state} = useLocation();

    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    });

    const [active, isActive] = useState(false);

    useEffect(() => {
      apiUser.findRow(state.id)
        .then(data => {
            setFormValues({
              username : data.username,
              password : data.password
            });
        });
    },[state])

    const handleChange = name => event => {
        setFormValues({ ...formValues, [name]: event.target.value });
    }

    const onSubmit =()=>{
        apiUser.updateRow(formValues,state.id).then(result => {
            console.log('data successfully added');
        }).catch(error => console.log(error));

        navigate('/user',{state : {refresh : true}})
    }

  return (
    <div>
        <ClayForm onSubmit={onSubmit}>
        <ClayPanel.Group>
          <ClayPanel
            displayTitle="Edit Category"
            displayType="unstyled"
          >
            <ClayPanel.Body>
              <ClayForm.Group className="form-group-sm">
              <ClayInput
                  type="text" readOnly={true} value={state.id}>                    
                </ClayInput>
                <label htmlFor="basicInput">UserName</label>
                <ClayInput
                  placeholder="UserName"
                  type="text" 
                  value={formValues.username}
                  onChange={handleChange("username")}>                    
                </ClayInput>
              </ClayForm.Group>
              <ClayInput
                  placeholder="Password"
                  type="password" 
                  value={formValues.password}
                  onChange={handleChange("password")}>                    
                </ClayInput>
            </ClayPanel.Body>
          </ClayPanel>
        </ClayPanel.Group>
        <div className="sheet-footer">
        <ClayButton.Group>
          <div className="btn-group-item">
            <ClayButton type="submit" >
              Submit
            </ClayButton>
          </div>
          <div className="btn-group-item">
            <ClayButton displayType="secondary" onClick={() => navigate(-1)}>
              Cancel
            </ClayButton>
          </div>
        </ClayButton.Group>
      </div>
      </ClayForm>
    </div>
  )
}
