import React from 'react'
import {
  XYPlot,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
} from 'react-vis'

import * as R from 'ramda'

import datar from '../../react-stats.json'

const data = R.pipe(
  R.map(d => d.state),
  R.flatten,
  R.groupBy(d => d.tag),
  R.map(d => d.length),
  R.toPairs,
  R.map(([k, v]) => ({
    x: k,
    y: v,
  })),
  R.sortBy(d => -d.y),
)(datar)

console.log(data)

const propz = R.pipe(
  R.map(d => d.state),
  R.flatten,
  R.groupBy(d => d.tag),
  R.map(
    R.pipe(
      R.map(dd => dd.props),
      R.flatten,
      R.groupBy(dd => dd.name),
      R.map(dd => dd.length),
      R.toPairs,
      R.map(([k, v]) => ({
        x: k,
        y: v,
      })),
    ),
  ),
  // R.toPairs,
  // R.filter(([k, v]) => v.length > 0),
)(datar)

console.log(propz)

const Report = ({}) => (
  <div>
    <div>
      <XYPlot xType="ordinal" height={400} width={600} margin={{ bottom: 100 }}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickLabelAngle={-90} />
        <YAxis />
        <VerticalBarSeries data={data} />
      </XYPlot>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {data.map(d => d.x).map(key => (
        <div key={key}>
          <div style={{ paddingLeft: 40, fontWeight: 'bold' }}>{key}</div>
          {propz[key].length ? (
            <XYPlot
              xType="ordinal"
              height={250}
              width={250}
              margin={{
                bottom: 100,
              }}
            >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis tickLabelAngle={-90} />
              <YAxis />
              <VerticalBarSeries data={propz[key]} />
            </XYPlot>
          ) : (
            <XYPlot
              dontCheckIfEmpty
              xDomain={[0, 1]}
              yDomain={[0, 1]}
              width={250}
              height={250}
              margin={{
                bottom: 100,
              }}
            >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis hideLines hideTicks title="Never Customized" />
              <YAxis hideLines hideTicks />
            </XYPlot>
          )}
        </div>
      ))}
    </div>
  </div>
)

import { compose, pure } from 'recompose'
import { hot } from 'react-hot-loader'

export default compose(
  hot(module),
  pure,
)(Report)
