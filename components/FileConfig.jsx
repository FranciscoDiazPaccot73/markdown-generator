import { useState, useEffect } from "react";

import { SwitchType } from "./JsonHeaderTypes";

import styles from '../styles/Home.module.css';

const defaultIsArray = {
  id: "isArray",
  label: "Is array?",
  value: false
}

const FileConfig = ({ updateConfigs, configOpened }) => {
  const [configs, setConfigs] = useState([])
  const [isArray, setIsArray] = useState(false)

  useEffect(() => {
    if (!configOpened) {
      setIsArray(false)
      setConfigs([])
    }
  }, [configOpened])

  const addConfig = (value, isArrayParam = false) => {
    setConfigs([...configs, value])
    if (isArrayParam) {
      setIsArray(prevValue => !prevValue)
    }
  }

  return (
    <div className={`${styles.headerInfoWrapperStructure} ${configOpened ? `${styles.open}` : ''}`}>
      <div style={{ display: "flex" }}>
        <SwitchType type="switch" onAction={(value) => addConfig(value, true)} value={isArray} label={defaultIsArray.label} />
      </div>
      <div className={styles.headerInfoWrapperStructureActions}>
        <button disabled className={styles.headerInfoWrapperStructureAction}>Agregar propiedad</button>
        <button disabled className={styles.headerInfoWrapperStructureAction}>Aplicar</button>
      </div>
    </div>
  )
}

export default FileConfig;
