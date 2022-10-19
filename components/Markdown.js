import { useState, useRef, useEffect } from 'react'
import { marked } from 'marked'
import Image from 'next/image';

import { getFormattedDate } from '../utils';

import styles from '../styles/Home.module.css';

const sampleText = '# Title\n## Sub-Title \n### Deeper title \n \n Paragraphs are separated\n by an empty line.\n\n Leave two spaces at the end of a line\n to go to the line.\n\n Attributs: *italic*, **bold**, \n`monospace`, ~~striped~~.\n\n List:\n\n * apples\n * oranges\n * pears\n\n Numbered list:\n\n 1. tofu\n 2. mushrooms\n 3. bread\n\n Link with placeholder text: *[Medium](https://www.medium.com)* \n\n Simple link: https://www.medium.com/ \n\n Code: ```\n console.log("Hello folks! I hoped you enjoyed this quick tutorial. Thanks for reading."); \n``` '

const initialData = {
  pubDate: "Aug 08 2022",
  title: "AstroWind template in depth",
  description: "Description.",
  image: "/steps.jpg",
  category: "Tutorials",
  tags: ['astro', 'tailwind css', 'front-end'],
}

const Markdown = () => {
  const [currentText, setText] = useState(sampleText)
  const [header, setHeader] = useState(initialData)
  const fileRef = useRef();
  const textAreaRef = useRef();

  useEffect(() => {
    fileRef.current = new File([currentText], 'markdown-generator.md', {
      type: 'text/plain',
    })
  }, [])

  const handleChange = event => {
    const newText = event.target.value
    setText(newText)

    console.log(textAreaRef.current.selectionStart)
  }

  const renderText = text => {
    const __html = marked(text)
    return { __html }
  }
  
  const download = () => {
    const file = fileRef.current;
    const link = document.createElement('a')
    const url = URL.createObjectURL(file)
  
    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
  
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const handleText = () => {    
    const x = textAreaRef.current.value;
    const curPos = textAreaRef.current.selectionStart;
    const bold = "****"

    textAreaRef.current.value = x.slice(0, curPos) + bold + x.slice(curPos)

    textAreaRef.current.focus();
    textAreaRef.current.setSelectionRange(curPos + 2, curPos + 2);;
  }

  return (
    <div>
      <div className={styles.markdownWrapper}>
        <div className={styles.markdown48}>
          <div className={styles.markdownActions}>
            <div onClick={handleText}><i className='h1' /></div>
            <div onClick={handleText}><i className='h2' /></div>
            <div onClick={handleText}><i className='bold' /></div>
            <div onClick={handleText}><i className='italic' /></div>
            <div onClick={handleText}><i className='underline' /></div>
            <div onClick={handleText}><i className='list-ul' /></div>
            <div onClick={handleText}><i className='link' /></div>
          </div>
          <textarea
            onChange={handleChange}
            value={currentText}
            rows='45'
            className={styles.markdown100}
            ref={textAreaRef}
          />
        </div>
        <div className={styles.markdown48}>
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
            <div dangerouslySetInnerHTML={renderText(currentText)} />
            </div>
          </article>
        </div>
      </div>
      <button onClick={download}>HOLA</button>
    </div>
  )
}

export default Markdown;
