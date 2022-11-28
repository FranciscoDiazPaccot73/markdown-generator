import { useState, useRef } from "react";

import jsonTypes, { SwitchType } from "./JsonHeaderTypes";
import FileConfig from "./FileConfig";

import styles from '../styles/Home.module.css';

const defaultIsArray = {
  id: "isArray",
  label: "Is array?",
  value: false
}

const JsonHeader = ({ handleHeader }) => {
  const [isActive, setIsActive] = useState(false)
  const [fileConfig, setFileConfig] = useState(null)
  const [configOpened, setConfigOpened] = useState(false)
  const FILE_NAME = useRef()
  const fileInput = useRef()
  const chevronClasses = `${styles.chevronDown} ${isActive ? `${styles.chevronActive}` : ''}`

  const handleChevron = (e) => {
    setIsActive(prevValue => !prevValue)
  }

  const onReaderLoad = (event) => {
    var { config, data } = JSON.parse(event.target.result);
    setFileConfig(config)
    handleHeader(config, data, FILE_NAME.current)
  }

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(file);
    FILE_NAME.current = file.name
  }

  const onChangeFile = e => {
    e.preventDefault()
    handleFile(e.target.files[0])
  }

  const handleDrop = e => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0])
  }

  const updateConfigs = (newValue, id) => {
    const newArray = [];
    if (!fileConfig) {
      newArray.push(newValue)
    }

    fileConfig?.forEach(conf => {
      if (conf.id === id) {
        newArray.push(newValue)
      } else {
        newArray.push(conf);
      }
    })
    
    setFileConfig(newArray)
  }

  const removeFile = () => {
    fileInput.current.value  = null;
    FILE_NAME.current = null;
    setFileConfig([])
    handleHeader([], [])
  }

  return (
    <div className={styles.headerInfoWrapper}>
      <button onClick={() => setConfigOpened(prev => !prev)} className={styles.headerInfoWrapperButton}>{configOpened ? "Cancelar" : "Nueva Estructura"}</button>
      <section onDrop={handleDrop} className={`${styles.headerInfo} ${isActive ? styles.active : ''}`}>
        <div className={styles.headerInfoTitle}>
          <p>File config</p>
          <div className={styles.headerActions}>
            <input
              onChange={onChangeFile}
              type="file"
              id="jsonfile" name="jsonfile"
              accept="application/JSON"
              ref={fileInput}
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
        <div className={`${styles.headerInfoContent} ${styles.headerInfoContentJson}`}>
          {fileConfig ? fileConfig.map(({ type, id, ...others }) => {
            const Component = jsonTypes(type)
            const props = {
              ...others,
              id,
              type,
              onAction: (value) => updateConfigs(value, id)
            }

            if (!Component) return null
            
            return <Component key={id} {...props} />
          }) : (
            <SwitchType type="switch" {...defaultIsArray} />
          )}
        </div>
      </section>
      <FileConfig updateConfigs={updateConfigs} configOpened={configOpened} />
      <div className={`${styles.jsonNewFile} ${fileInput.current?.value || FILE_NAME.current ? `${styles.jsonNewFileButton}` : `${styles.jsonNewFileButtonHidden}`}`}>
        <button onClick={removeFile}>Clear</button>
      </div>
    </div>
  )
}

export default JsonHeader;
