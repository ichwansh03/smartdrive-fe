import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import ClayForm, { ClayInput } from '@clayui/form';
import ClayPanel from '@clayui/panel';
import ClayButton, {ClayButtonWithIcon} from '@clayui/button'
import apiUser from '../../api/apiUser';

export default function AddUser() {

    let navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        userId: '',
        username: '',
        password: ''
    });

    const handleChange = name => event => {
        setFormValues({ ...formValues, [name]: event.target.value });
    }

    const onSubmit =()=>{
        apiUser.createRow(formValues).then(result => {
            console.log('data successfully added');
        }).catch(error => console.log(error));

        navigate('/user',{state : {refresh : true}})
    }

    return (
    <div>
        <ClayForm onSubmit={onSubmit}>
        <ClayPanel.Group>
          <ClayPanel
            displayTitle="Add User"
            displayType="unstyled"
          >
            <ClayPanel.Body>
              <ClayForm.Group className="form-group-sm">
                <label htmlFor="basicInput">UserName</label>
                <ClayInput
                  placeholder="UserName"
                  type="text" onChange={handleChange("username")}>                    
                </ClayInput>
              </ClayForm.Group>
              <ClayInput
                  placeholder="Password"
                  type="password" onChange={handleChange("password")}>                    
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
