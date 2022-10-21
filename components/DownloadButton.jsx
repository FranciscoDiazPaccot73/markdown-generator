
import { useState } from 'react';

import { getExtension, getHeader, INITIAL_FILE_NAME } from '../utils';

import styles from '../styles/Home.module.css';

const DownloadButton = ({ currentText, header }) => {
  const [fileName, setFileName] = useState(INITIAL_FILE_NAME);
  const [filenameToShow, setNameToShow] = useState('markdown-generator');

  const download = () => {
    const filename = fileName === '.md' ? INITIAL_FILE_NAME : fileName;
    let text = currentText;

    if (header.active) {
      const headerText = getHeader(header.data);

      text = headerText + text;
    }

    const file = new File([text], filename, {
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

  const handleChange = (e) => {
    const { value } = e.target;
    const newFilename = getExtension(value);

    if (!newFilename || newFilename === '.md') {
      setNameToShow('')
      setFileName(INITIAL_FILE_NAME)
    } else {
      setNameToShow(newFilename.substr(0, newFilename.lastIndexOf('.')) || newFilename)
      setFileName(newFilename);
    }
  }

  return (
    <div className={styles.downloadButtonWrapper} id="preview">
      <div className={styles.fileName}>
        <span>File name</span>
        <input value={filenameToShow} placeholder={filenameToShow} onChange={handleChange} />
      </div>
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
        Download
      </button>
    </div>
  )
}

export default DownloadButton;
