import { useState, useRef } from 'react'

import Preview from './Preview';
import ActionsBar from './ActionsBar';
import DownloadButton from './DownloadButton';

import { SAMPLE_TEXT } from '../utils';

import styles from '../styles/Home.module.css';

const Markdown = () => {
  const [currentText, setText] = useState(SAMPLE_TEXT)
  const textAreaRef = useRef();
  const copyTextRef = useRef();

  const handleChange = event => {
    const newText = event.target.value
    setText(newText)
  }
  
  return (
    <div className={styles.markdownWrapper}>
      <section className={styles.markdown48}>
        <ActionsBar copyTextRef={copyTextRef} currentText={currentText} textAreaRef={textAreaRef} />
        <div ref={copyTextRef} className={styles.copied}>Copied to Clipboard</div>
        <textarea
          onChange={handleChange}
          value={currentText}
          rows='45'
          className={styles.markdown100}
          ref={textAreaRef}
        />
        <DownloadButton currentText={currentText} />
      </section>
      <section className={`${styles.markdown48} ${styles.markdownPreview}`}>
        <div satyle={{ position: "relative", width: "100%", height: "100%" }}>
          <span className={styles.markdownPreviewBadge}>LIVE PREVIEW</span>
          <Preview text={currentText} />
        </div>
      </section>
    </div>
  )
}

export default Markdown;
