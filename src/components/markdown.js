import React from 'react'
import remark from 'remark'
import remarkRender from 'remark-react'

export default function Markdown (props) {
  return remark().use(remarkRender).process(props.children)
}

Markdown.propTypes = {
  children: React.PropTypes.string.isRequired
}
