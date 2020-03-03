import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";

export class Area extends React.Component<{ data: any }, any> {
  public render() {
    const cols = {
      value: {
        min: 10
      },
      year: {
        range: [0, 1]
      }
    };
    return (
      <div>
        <Chart
          background={{}}
          plotBackground={{}}
          height={20}
          data={this.props.data}
          scale={cols}
          forceFit={ true }
          padding="0"
          animate={ true }
        >
          <Axis
            name="year"
            line={{ strokeOpacity: 0 }}
            grid={{
              lineStyle: {
                strokeOpacity: 0
              }
            }}
          />
          <Axis
            name="value"
            line={{ strokeOpacity: 0 }}
            grid={{
              lineStyle: {
                strokeOpacity: 0
              }
            }}
            label={{
              formatter: (val: any) => {
                return (val / 10000).toFixed(1) + "k";
              }
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="area"
            position="year*value"
            shape="smooth"
            color={'#5600DC'}
          />
        </Chart>
      </div>
    );
  }
}
