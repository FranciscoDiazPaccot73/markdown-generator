
import { useState, useRef, useEffect } from 'react';

import { getExtension, getHeader, INITIAL_FILE_NAME, INITIAL_FILE_NAME_JSON, generateRandomID } from '../utils';

import styles from '../styles/Home.module.css';

const getFileNameJSON = (name) => {
  return name ?? INITIAL_FILE_NAME_JSON;
};

const DownloadButton = ({ currentText, header, type, fileN, startDownloading, shouldDownload }) => {
  const INITIAL_NAME = useRef(type === 'json' ? getFileNameJSON(fileN) : INITIAL_FILE_NAME)
  const EXTENSION_COMPARE = useRef(type === 'json' ? '.json' : '.md')
  const [fileName, setFileName] = useState(type === 'json' ? getFileNameJSON(fileN) : INITIAL_FILE_NAME);
  const [filenameToShow, setNameToShow] = useState(fileN ? fileN.substr(0, fileN.lastIndexOf('.')) || fileN : 'markdown-generator');

  useEffect(() => {
    if (shouldDownload) download()
  }, [shouldDownload])

  const startDownload = () => {
    return type === 'json' ? startDownloading() : download()
  }

  const download = () => {
    const filename = fileName === EXTENSION_COMPARE.current ? INITIAL_NAME.current : fileName;
    let text = currentText;

    if (header?.active) {
      const headerText = getHeader(header.data);

      text = headerText + text;
    }

    const file = new File([text], filename, {
      type: type === 'json' ? 'application/json' : 'text/plain',
    });
    const link = document.createElement('a')
    link.id = generateRandomID()
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
    const newFilename = getExtension(value, type);

    if (!newFilename || newFilename === EXTENSION_COMPARE.current) {
      setNameToShow('')
      setFileName(INITIAL_NAME.current)
    } else {
      setNameToShow(newFilename.substr(0, newFilename.lastIndexOf('.')) || newFilename)
      setFileName(newFilename);
    }
  }

  return (
    <div className={styles.downloadButtonWrapper} id="preview">
      <div className={`${styles.fileName} ${type ? styles.downloadInputJson : styles.downloadInputMd}`}>
        <span>File name</span>
        <input value={filenameToShow} placeholder={filenameToShow} onChange={handleChange} />
      </div>
      <button onClick={startDownload} className={styles.downloadButton}>
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
        DOWNLOAD
      </button>
    </div>
  )
}

export default DownloadButton;
