import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";

interface IProps {
  data: any[]
  hiddenAxis?: boolean
  xAxis: string
  yAxis: string
  height?: number
  padding?: string
  forceFit?: boolean
  Axis?: {
    line?: {
      strokeOpacity: number
    }
    grid?: {
      lineStyle: {
        strokeOpacity: number
      }
    }
  }
  cols?: {
    sales: {
      tickInterval: number
    }
  }
}

const axis: any = {
  line: {},
  grid: {}
}

export class Histogram extends React.Component<IProps, any> {
  public render() {
    const cols = this.props.cols || {}
    const data = this.props.data
    return (
      <div>
        <Chart
          background={{}}
          plotBackground={{}}
          height={this.props.height || 400}
          data={data}
          scale={cols}
          forceFit={ this.props.forceFit }
          padding={ this.props.padding }>
          <Axis
            name={ this.props.xAxis }
            grid={ this.props.Axis ? this.props.Axis.grid : axis.grid }
            line={ this.props.Axis ? this.props.Axis.line : axis.line }
          />
          <Axis
            name={ this.props.yAxis }
            grid={ this.props.Axis ? this.props.Axis.grid : axis.grid }
            line={ this.props.Axis ? this.props.Axis.line : axis.line }
          />
          <Tooltip
            crosshairs={{
              type: "rect"
            }}
          />
          <Geom type="interval" position={`${this.props.xAxis}*${this.props.yAxis}`}/>
        </Chart>
      </div>
    );
  }
}
