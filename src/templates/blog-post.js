import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Img from 'gatsby-image'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  secondImage,
  md,
  frases
}) => {
  const PostContent = contentComponent || Content

  console.log(frases)

  return (
    <section className='section'>
      {helmet || ''}
      <div className='container content'>
        <div className='columns'>
          <div className='column is-10 is-offset-1'>
            <h1 className='title is-size-2 has-text-weight-bold is-bold-light'>
              {title}
            </h1>

            {typeof secondImage === 'string' && <img src={secondImage} />}
            {secondImage && <Img fixed={secondImage} />}
            {md && <PostContent content={md} />}
            <p>{description}</p>
            <PostContent content={content} />
            {frases &&
              frases.map((f, i) => {
                return (
                  <div key={i}>
                    <p>{f.author.name}</p>
                    <p>{f.quote}</p>
                  </div>
                )
              })}
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className='taglist'>
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  console.log(post)

  const img =
    post.frontmatter.secondimage !== null
      ? post.frontmatter.secondimage.childImageSharp.fixed
      : null
  const md =
    post.frontmatter.markdown !== null ? post.frontmatter.markdown : null

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        secondImage={img}
        md={md}
        frases={post.frontmatter.frases}
        helmet={
          <Helmet titleTemplate='%s | Blog'>
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name='description'
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        markdown
        frases {
          quote
          author {
            name
          }
        }
        secondimage {
          childImageSharp {
            fixed(width: 300, height: 300) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
