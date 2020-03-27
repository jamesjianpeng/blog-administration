import React from 'react'
import { IPropsBase as IProps } from 'src/interface'
import ProjectList from 'src/views/Project/ProjectList'


const FEList = (props: IProps): React.ComponentElement<any, any> => (<ProjectList {...props} name={'blog-server'} />)

export default FEList
