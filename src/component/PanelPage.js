import React from 'react'
import ClayPanel from '@clayui/panel';

export default function PanelPage(props) {
  return (
    <ClayPanel.Group>
        <ClayPanel
            displayTitle={props.title}
            displayType="unstyled">
        </ClayPanel>
    </ClayPanel.Group>
  )
}
