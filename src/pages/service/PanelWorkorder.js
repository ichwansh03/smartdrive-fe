import ClayButton from '@clayui/button';
import ClayModal, { useModal } from '@clayui/modal';
import { ClayCheckbox } from '@clayui/form';
import { useEffect, useState } from 'react';
import apiService from '../../api/service_order/apiService';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PanelWorkorder() {

  let navigate = useNavigate();

  const { observer, onOpenChange, open } = useModal();
  const [workorder, setWorkorder] = useState(false);

  const { state } = useLocation();

  const [value, setValues] = useState({
    sowoName: '',
    sowoStatus: ''
  });

  useEffect(() => {
    apiService.workorderList(state.id)
      .then(data => {
        setValues({
          sowoStatus: data.sowoStatus
        });
      });
  }, [state])

  const handleChange = status => event => {
    setValues({ ...value, [status]: event.target.value })
  }

  return (
    <>
      {open && (
        <ClayModal
          observer={observer}
          size="lg"
          status="info"
        >
          <ClayModal.Header>Complete Task and Workorder</ClayModal.Header>
          <ClayModal.Body>
            <ClayCheckbox
              aria-label="Option 1"
              checked={value}
              onChange={() => setValue(val => !val)}
              label="Option 1"
            />
          </ClayModal.Body>
          <ClayModal.Footer
            last={
              <ClayButton.Group spaced>
                <ClayButton
                  displayType="secondary"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </ClayButton>
                <ClayButton onClick={() => onOpenChange(false)}>
                  Save
                </ClayButton>
              </ClayButton.Group>
            }
          />
        </ClayModal>
      )}
      <ClayButton onClick={() => onOpenChange(true)}>Open modal</ClayButton>
    </>
  );
};



