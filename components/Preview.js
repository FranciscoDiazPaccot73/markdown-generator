import Image from 'next/image';
import { marked } from 'marked'

import { getFormattedDate } from '../utils';

import styles from '../styles/Home.module.css';

const Preview = ({ text, header }) => {
  const renderText = text => {
    const __html = marked(text)
    return { __html }
  }

  return (
    <article>
      {header.active ? (
        <header className={styles.markdownPreviewHeader}>
          <p className={styles.markdownTime}>
            <time dateTime={header.data.pubDate}>{getFormattedDate(header.data.pubDate)}</time>
          </p>
          <h1 className={styles.markdownTitle}>
            {header.data.title}
          </h1>
          {header.data.image && (
            <div className={styles.markdownImage}>
              <Image
                src={header.data.image}
                width={500}
                height={180}
                layout="responsive"
              />
            </div>
          )}
        </header>
      ) : null}
      <div className={styles.markdownPreviewContent}>
        <div dangerouslySetInnerHTML={renderText(text)} />
      </div>
    </article>
  )
}

export default Preview;
