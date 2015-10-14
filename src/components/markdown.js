import React from 'react'
import mdast from 'mdast'
import mdastRender from 'mdast-react'

export default class Markdown extends React.Component {
  static propTypes = {
    children: React.PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
  }

  render () {
    return mdast().use(mdastRender).process(this.props.children)
  }
}
