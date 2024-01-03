import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import ClayForm, { ClayInput } from '@clayui/form';
import ClayPanel from '@clayui/panel';
import ClayButton, {ClayButtonWithIcon} from '@clayui/button'
import apiCategory from '../../api/apiCategory';

export default function AddCategory() {

    let navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        cateId: '',
        cateName: ''
    });

    const [active, isActive] = useState(false);

    const handleChange = name => event => {
        setFormValues({ ...formValues, [name]: event.target.value });
    }

    const onSubmit =()=>{
        apiCategory.createRow(formValues).then(result => {
            console.log('data successfully added');
        }).catch(error => console.log(error));

        navigate('/category',{state : {refresh : true}})
    }

    return (
        <div>
            <ClayForm onSubmit={onSubmit}>
        <ClayPanel.Group>
          <ClayPanel
            displayTitle="Add Category"
            displayType="unstyled"
          >
            <ClayPanel.Body>
              <ClayForm.Group className="form-group-sm">
                <label htmlFor="basicInput">Name</label>
                <ClayInput
                  placeholder="Category Name"
                  type="text" onChange={handleChange("cateName")}>                    
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
