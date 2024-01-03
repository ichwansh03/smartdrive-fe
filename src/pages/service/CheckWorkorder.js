import ClayButton from '@clayui/button';
import ClayModal, {useModal} from '@clayui/modal';


const Component = () => {
  const { observer, onOpenChange, open } = useModal();


  return (
    <>
      {open && (
        <ClayModal
          observer={observer}
          size="lg"
          spritemap={spritemap}
          status="info"
        >
          <ClayModal.Header>Documents</ClayModal.Header>
          <ClayModal.Body>
            <p>Do you want to save your documents?</p>
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
                  Save changes
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


export default {
    Component
}

