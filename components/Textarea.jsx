import { useState, useRef } from 'react'

import styles from '../styles/Home.module.css';

const Textarea = () => {
  const [currentText, setText] = useState('')
  const [column, setColumn] = useState({})
  const codeRef = useRef();
  const textareaRef = useRef();

  const handleChange = event => {
    const newText = event.target.value
    setText(newText)

    if (!newText || newText === '') {
      codeRef.current.innerHTML = null;
    }
  }

  const handleClick = () => {
    const { line, error = 'null' } = column;

    const init = Number(line) - 30;
    const end = Number(line) + 30;
    let newCodeValue = currentText.slice(init, end);
    
    codeRef.current.innerHTML = '<></>';
    
    if (newCodeValue.toLowerCase().includes(error.toLowerCase())) {
      const textLower = newCodeValue.toLocaleLowerCase();
      const indStart = textLower.indexOf(column.error.toLocaleLowerCase());
      const indEnd = textLower.indexOf(column.error.toLocaleLowerCase()) + column.error.length;
      
      const initialPart = newCodeValue.slice(0, indStart);
      const word = newCodeValue.slice(indStart, indEnd);
      const lastPart = newCodeValue.slice(indEnd);
      
      newCodeValue = `${initialPart}<strong>${word}</strong>${lastPart}`
    }
    codeRef.current.innerHTML = newCodeValue;
  }

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setColumn(prevValue => ({...prevValue, [name]: value}));
  }

  const handleDrop = e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    
    const reader = new FileReader();
    reader.onload = function(event) {
      setText(event.target.result);
    };
    reader.readAsText(file, "UTF-8");
  }

  return (
    <>
      <section className={styles.minifiedHeader}>
        <aside className={styles.minifiedHeaderAside}>
          <div className={styles.fileColumn}>
            <div>
              <span>Column: </span>
              <input name='line' className={styles.fileInput} onChange={handleInputChange} value={column.line} />
            </div>
            <div>
              <span>Error: </span>
              <input name='error' className={styles.fileInput} onChange={handleInputChange} value={column.error} />
            </div>
          </div>
          <button onClick={handleClick} className={styles.downloadButton}>
            FIND
          </button>
        </aside>
        <aside>
          <code ref={codeRef} />
        </aside>
      </section>
      <section className={styles.markdownWrapper}>
        <textarea
          onChange={handleChange}
          value={currentText}
          rows='45'
          className={styles.minifiedTextarea}
          onDrop={handleDrop}
          ref={textareaRef}
        />
        {!currentText ? (
          <div className={styles.dropZoneWrapper}>
            <div className={styles.dropZone}>
              Type your minified file or paste it here to find your issue!
            </div>
          </div>
        ) : null}
      </section>
    </>
  )
}

export default Textarea;
