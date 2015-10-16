import React from 'react'
import mdast from 'mdast'
import mdastRender from 'mdast-react'

export default function Markdown (props) {
  return mdast().use(mdastRender).process(props.children)
}

Markdown.propTypes = {
  children: React.PropTypes.string.isRequired
}
