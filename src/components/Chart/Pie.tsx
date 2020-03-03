import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  // Label,
  Legend,
  Guide
} from "bizcharts";
import DataSet from "@antv/data-set";
import "./Pie.css"
export interface IData {
  item: string,
  count: number
  color?: string
  select?: boolean
}
interface IProps {
  data: IData[]
}
interface IStates {
  data: IData[]
  total: number
}

const colorObj: any = {
  "待开始": '#5AD2D1',
  "正在使用中": '#FD5F61',
  "暂时离开": '#FEAD79',
  "预约迟到": '#F9D860',
  "非开发时间": '#BEBEBE'
}

export class Pie extends React.Component<IProps, IStates> {
  public render() {
    const { DataView } = DataSet;
    const { Html } = Guide;
    const data: IData[] = this.props.data.map((item: IData) => {
      item.select = true
      return item
    });
    const total: number = data.reduce((x: IData | number, y: IData, _z: number): number => {
      if (typeof x === 'number') {
        x += y.count
        return x
      } else {
        return x.count + y.count
      }
    }, 0) as number
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    // this.setState({
    //   data,
    //   total
    // })
    const cols = {
      percent: {
        formatter: (val: any) => {
          val = val * 100 + "%";
          return val;
        }
      }
    };
    return (
      <div>
        <Chart
          height={200}
          data={dv}
          scale={cols}
          padding={[40, 100, 20, 40]}
          forceFit={ true }
          onGetG2Instance={(chart) => {
            const gemos: any = chart.getAllGeoms()[0];
            console.log(gemos)
            console.log(gemos.getShapes()[2])
            gemos.setShapeSelected(gemos.getShapes()[2], true);
         }}
         onPlotClick={ (ev: any) => {
            console.log(ev)
         } }
        >
          <Coord type={"theta"} radius={1} innerRadius={0.75} />
          <Axis name="percent" />
          <Legend
            position="right"
            offsetY={-6}
            offsetX={-20}
            useHtml={ true }
            itemTpl={ (value?: string, _color?: string, checked?: boolean, index?: number): string => {
              const it: IData = this.props.data[index || 0]
              const style="white-space: nowrap;"
              const styleTitle="width: 60px;display: inline-block"
              const styleValue="display: inline-block"
              const styleDot = `display: inline-block; width: 8px; height: 8px;background: ${colorObj[it.item]}; border-radius: 50%;`
              return `<li style="${style}">
                        <span class="g2-legend-marker" style="color: ${_color}"></span>
                        <span style="${styleDot}"></span>
                        <span style="${styleTitle}">${value}</span>:
                        <span style="${styleValue}">${it ? it.count : ''} 间</span>
                      </li>`
            }}
            // itemTpl={"<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>"+
            //     "{name}: {value}" +
            //     "</li>"}
//             var CONTAINER_CLASS = 'g2-tooltip';
// var TITLE_CLASS = 'g2-tooltip-title';
// var LIST_CLASS = 'g2-tooltip-list';
// var MARKER_CLASS = 'g2-tooltip-marker';
// var VALUE_CLASS = 'g2-tooltip-value';
// var LIST_ITEM_CLASS = 'g2-tooltip-list-item';
          />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"

          />
          <Guide>
            <Html
              position={["50%", "50%"]}
              html={`
                <div style="color:#8c8c8c;font-size:14px;text-align: center;width: auto;">
                  <div>预约订单总数</div>
                  <div style="color:#262626;font-size: 14px;text-align: center;">${ total }人</div>
                </div>`
              }
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color={['item', (item: any)=>{
              return colorObj[item]
            }]}
            select={[true, {
              mode: 'single', // 选中模式，单选、多选
              style: { }, // 选中后 shape 的样式
              cancelable: true, // 选中之后是否允许取消选中，默认允许取消选中
              animate: true // 选中是否执行动画，默认执行动画
            }]}
            tooltip={[
              "item*percent",
              (item, percent) => {
                const itObj: IData = (this.props.data.find((it: IData) => it.item === item) || {}) as IData
                percent = percent.toFixed(2) * 100 + "%";
                return {
                  name: item,
                  value: `${percent} (${itObj.count} 间)`
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            {/* <Label
              content="percent"
              textStyle={{
                fontSize: '12px'
              }}
              formatter={(val: string, item) => {
                return item.point.item + ": " + Number(val.replace(/%/, '')).toFixed(1) + '%';
              }}
            /> */}
          </Geom>
        </Chart>
      </div>
    );
  }
}
