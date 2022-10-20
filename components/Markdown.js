import { useState, useRef } from 'react'

import Preview from './Preview';
import { addTextFormat, SAMPLE_TEXT } from '../utils';

import styles from '../styles/Home.module.css';

const Markdown = () => {
  const [currentText, setText] = useState(SAMPLE_TEXT)
  const textAreaRef = useRef();
  const copyTextRef = useRef();

  const handleChange = event => {
    const newText = event.target.value
    setText(newText)
  }
  
  const download = () => {
    const file = new File([currentText], 'markdown-generator.md', {
      type: 'text/plain',
    });
    const link = document.createElement('a')
    const url = URL.createObjectURL(file)
  
    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
  
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const handleText = (e) => {
    addTextFormat(textAreaRef.current, e.target.id)
  }

  const handleCopy = () => {
		if (currentText.length > 0) {
			navigator.clipboard.writeText(currentText)
      copyTextRef.current.style.display = 'inline-block'
      setTimeout(() => {
        copyTextRef.current.style.display = 'none'
      }, 2000);
		}
	}

  return (
    <div className={styles.markdownWrapper}>
      <div className={styles.markdown48}>
        <div className={styles.markdownActions}>
          <div onClick={handleText}><i id="h1" className='h1' /></div>
          <div onClick={handleText}><i id="h2" className='h2' /></div>
          <div onClick={handleText}><i id="bold" className='bold' /></div>
          <div onClick={handleText}><i id="italic" className='italic' /></div>
          <div onClick={handleText}><i id="list-ul" className='list-ul' /></div>
          <div onClick={handleText}><i id="link" className='link' /></div>
          <div style={{marginLeft: "auto" }} onClick={handleCopy}><i className='copy' /></div>
          <a href="/#footer"><i className='question' /></a>
        </div>
        <div ref={copyTextRef} className={styles.copied}>Copied to Clipboard</div>
        <textarea
          onChange={handleChange}
          value={currentText}
          rows='45'
          className={styles.markdown100}
          ref={textAreaRef}
        />
        <button onClick={download} className={styles.downloadButton}>
          <span>
            <svg fill="none" viewBox="0 0 24 24" height="16" width="16" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </span>
          Descargar File
        </button>
      </div>
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
