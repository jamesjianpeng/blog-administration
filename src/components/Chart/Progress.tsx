import React, { FunctionComponent } from 'react'
import './Progress.css'

export interface IProps {
    ratio: string
    standard?: string
}


export const Progress: FunctionComponent<IProps> = (props) => {
    const styles = {
        background: '#12c2c2',
        width: props.ratio
    }

    const standardStyles = {
      left: props.standard || '80%',
    }
    return (
      <div className="progress-contianer">
          <div className="progress">
              <div className="progress-inner" style={ styles }>''</div>
          </div>
          <div className="standard" style={ standardStyles }>''</div>
      </div>
    )
}

