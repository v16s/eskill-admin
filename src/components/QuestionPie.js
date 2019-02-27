import { ResponsivePie, PieDatum } from '@nivo/pie'
import { history } from 'components'
import '@nivo/legends'
import React from 'react'
let qarr = []
Array.from(new Array(100), (k, x) => {
  qarr.push({
    id: `${x + 1}`,
    label: `Question ${x + 1}`,
    value: 1,
    color: '#ff0000'
  })
})
export default () => (
  <ResponsivePie
    data={qarr.length > 0 ? qarr : []}
    margin={{
      top: 40,
      right: 80,
      bottom: 80,
      left: 80
    }}
    innerRadius={0.8}
    padAngle={0}
    cornerRadius={3}
    colors='nivo'
    colorBy={d => d.color}
    borderWidth={1}
    borderColor='#ffffff'
    enableRadialLabels={false}
    enableSlicesLabels={false}
    isInteractive
    tooltip={d => (
      <div key={d.id} style={{ color: d.color }}>
        <strong>{d.label}</strong>
      </div>
    )}
    onClick={d => {
      history.push(`/${coursename}/${d.id}`)
    }}
  />
)
