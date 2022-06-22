import ReactMarkdown from 'react-markdown';
import Image from 'next/image'; 

import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter';
import  atomDark  from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

import classes from './post-content.module.css';
import PostHeader from './post-header.js';

SyntaxHighlighter.registerLanguage('js',js);
SyntaxHighlighter.registerLanguage('css', css);



function PostContent(props) {
  const { post } = props;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  // const customRenderers = {
  //   image(image) {
  //     return (
  //     <Image 
  //       src={`/images/posts/${post.slug}/${image.src}`} 
  //       alt={image.alt} 
        
  //       />
  //     );
  //   }
  // }

  return <article className={classes.content}>
    <PostHeader title={post.title} image={imagePath}/>
    <ReactMarkdown 
      //children={post.content}
      components = {{
        img: ({node}) => {
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${node.properties.src}`} 
              alt={node.properties.alt} 
              width={600} 
              height={300}
            />
          </div>)
        },
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              //children={String(children).replace(/\n$/, '')}
              style={atomDark}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        }
      }}
    >
      {post.content}
    </ReactMarkdown>
  </article> 
}

export default PostContent;