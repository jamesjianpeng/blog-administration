import React from 'react'
import watermark from 'src/images/watermark.png'
interface IProps {
  url?: string
}

export default class ArticleList extends React.Component<IProps, any> {
  public render() {
    const style: any = {
      'position': 'absolute',
      'top': 0,
      'left': 0,
      'width': '100%',
      'height': '100%',
      'zIndex': 99999,
      'pointerEvents': 'none',
      'backgroundImage': `url(${watermark})`,
      'opacity': 0.08
    }
    return (
      <div style={ style }> ArticleList </div>
    );
  }
}
