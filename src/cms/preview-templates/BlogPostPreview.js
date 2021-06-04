import React from 'react'
import PropTypes from 'prop-types'
import { BlogPostTemplate } from '../../templates/blog-post'

const BlogPostPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags'])
  const img = entry.getIn(['data', 'secondimage'])
  // let secondImage
  // if (img !== null) {
  //   secondImage = img.childImageSharp.fixed
  // }
  const frases = entry.getIn(['data', 'frases'])

  return (
    <BlogPostTemplate
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      tags={tags && tags.toJS()}
      title={entry.getIn(['data', 'title'])}
      md={widgetFor('markdown')}
      secondImage={img && img}
      frases={frases && frases.toJS()}
    />
  )
}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
}

export default BlogPostPreview
