import React from 'react'
import HideAllExceptSelectedRanges from '../HideUnhideRanges/HideAllExceptSelectedRanges'
import HideSelectedRanges from '../HideUnhideRanges/HideSelectedRanges'
import UnhideAll from '../HideUnhideRanges/UnhideAll'

export default function HideUnhideRanges() {
  return (
    <div>
        <h3>Hide and Unhide Ranges</h3>
        <HideSelectedRanges/><br /><br />
        <HideAllExceptSelectedRanges/><br />
        <UnhideAll/>
    </div>
  )
}
