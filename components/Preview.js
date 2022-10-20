import { useState } from 'react';
import Image from 'next/image';
import { marked } from 'marked'

import { getFormattedDate, INITIAL_DATA } from '../utils';

import styles from '../styles/Home.module.css';

const Preview = ({ text }) => {
  const [header, setHeader] = useState(INITIAL_DATA)

  const renderText = text => {
    const __html = marked(text)
    return { __html }
  }

  return (
    <article>
      <header>
        <p className={styles.markdownTime}>
          <time dateTime={header.pubDate}>{getFormattedDate(header.pubDate)}</time>
        </p>
        <h1 className={styles.markdownTitle}>
          {header.title}
        </h1>
        {header.image && (
          <div>
            <Image
              src={header.image}
              className={styles.markdownImage}
              width={500}
              height={180}
            />
          </div>
        )}
      </header>
      <div style={{ marginTop: "32px" }}>
        <div dangerouslySetInnerHTML={renderText(text)} />
      </div>
    </article>
  )
}

export default Preview;
