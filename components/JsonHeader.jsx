import { useState } from "react";
import jsonTypes, { SwitchType } from "./JsonHeaderTypes";

import styles from '../styles/Home.module.css';

const defaultIsArray = {
  id: "isArray",
  label: "Is array?",
  value: false
}

const JsonHeader = ({ handleHeader }) => {
  const [isActive, setIsActive] = useState(false)
  const [fileConfig, setFileConfig] = useState(null)
  const chevronClasses = `${styles.chevronDown} ${isActive ? `${styles.chevronActive}` : ''}`

  const handleChevron = (e) => {
    setIsActive(prevValue => !prevValue)
  }

  const onReaderLoad = (event) => {
    var { config, data } = JSON.parse(event.target.result);
    setFileConfig(config)
    handleHeader(config, data)
  }

  const handleFile = (e) => {
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(e.target.files[0]);
  }

  const updateConfigs = (newValue, id) => {
    const newArray = [];
    fileConfig.forEach(conf => {
      if (conf.id === id) {
        newArray.push(newValue)
      } else {
        newArray.push(conf);
      }
    })
    
    setFileConfig(newArray)
  }

  const removeConfig = (id) => {
    const newArray = fileConfig.filter(conf => conf.id !== id)
    
    setFileConfig(newArray)
  }

  return (
    <>
      <section onDrop={handleFile} className={`${styles.headerInfo} ${isActive ? styles.active : ''}`}>
        <div className={styles.headerInfoTitle}>
          <p>File config</p>
          <div className={styles.headerActions}>
            <input
              onChange={handleFile}
              type="file"
              id="jsonfile" name="jsonfile"
              accept="application/JSON"
            />
            {fileConfig ? (
              <div className={chevronClasses} onClick={handleChevron}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="#fff" height="24" viewBox="0 0 10 16">
                  <path
                    fillRule="evenodd"
                    d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"
                  />
                </svg>
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.headerInfoContent}>
          {fileConfig ? fileConfig.map(({ type, id, ...others }) => {
            const Component = jsonTypes(type)
            const props = {
              ...others,
              id,
              type,
              onRemove: removeConfig,
              onAction: (value) => updateConfigs(value, id)
            }

            if (!Component) return null
            
            return <Component key={id} {...props} />
          }) : (
            <SwitchType type="switch" {...defaultIsArray} />
          )}
        </div>
      </section>
      <button onClick={() => handleHeader(fileConfig, null)} >Use config</button>
    </>
  )
}

export default JsonHeader;
