import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ClayForm, { ClayInput } from '@clayui/form';
import ClayPanel from '@clayui/panel';
import ClayButton from '@clayui/button'
import apiCategory from '../../api/apiCategory';

export default function EditCategory() {

    let navigate = useNavigate();

    let {state} = useLocation();

    const [formValues, setFormValues] = useState({
        cateName: ''
    });

    const [active, isActive] = useState(false);

    useEffect(() => {
      apiCategory.findRow(state.id)
        .then(data => {
            setFormValues({
              cateName : data.cateName
            });
        });
    },[state])

    const handleChange = name => event => {
        setFormValues({ ...formValues, [name]: event.target.value });
    }

    const onSubmit =()=>{
        apiCategory.updateRow(formValues,state.id).then(result => {
            console.log('data successfully added');
        }).catch(error => console.log(error));

        navigate('/category',{state : {refresh : true}})
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
                <label htmlFor="basicInput">Name</label>
                <ClayInput
                  placeholder="Category Name"
                  type="text" 
                  value={formValues.cateName}
                  onChange={handleChange("cateName")}>                    
                </ClayInput>
              </ClayForm.Group>
              {/* <ClayForm.Group className="form-group-sm">
                <label htmlFor="basicInput">Description</label>
                <textarea className="form-control" placeholder="Description"></textarea>
              </ClayForm.Group> */}
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
