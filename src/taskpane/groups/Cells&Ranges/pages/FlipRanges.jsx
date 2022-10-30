import React from 'react'
import Horizontally from '../components/FlipRanges/Horizontally'
import Vertically from '../components/FlipRanges/Vertically'

export default function FlipRanges() {
  return (
    <React.Fragment>
      <h4>Flip Ranges: horizontally and vertically</h4>
        <Horizontally/>
        <Vertically/>
    </React.Fragment>
  )
}
