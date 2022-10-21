import { useState } from "react";

import { HEADER_NAMES, getFormattedDate } from '../utils';

import styles from '../styles/Home.module.css';

const DocumentHeader = ({ header, handleHeader }) => {
  const [isActive, setIsActive] = useState(false)

  const handleCheckbox = (e) => {
    setIsActive(e.target.checked)
    handleHeader({ ...header, active: e.target.checked })
  }

  const handleInput = (value, elem) => {
    const data = { ...header.data }
    data[elem] = value;
    handleHeader({ ...header, data })
  }

  return (
    <section className={`${styles.headerInfo} ${isActive ? styles.active : ''}`}>
      <div className={styles.headerInfoTitle}>
        <p>File Properties</p>
        <label className={styles.switch}>
          <input type="checkbox" onClick={handleCheckbox} />
          <span className={styles.slider} />
        </label>
      </div>
      <div className={styles.headerInfoContent}>
        {['pubDate', 'title', 'image'].map(id => (
          <div key={id}>
            <span>{HEADER_NAMES[id]}</span>
            <input
              onChange={(e) => handleInput(e.target.value, id)}
              readOnly={id === 'pubDate'}
              value={id === 'pubDate' ? getFormattedDate(header.data.pubDate) : header.data[id]}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default DocumentHeader;
