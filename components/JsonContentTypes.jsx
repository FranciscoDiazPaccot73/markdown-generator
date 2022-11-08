import { useState } from "react"

import { generateRandomID } from "../utils";

import styles from '../styles/Home.module.css';

export const JsonContentString = ({label, onChange, w}) => {
  const [text, setText] = useState(label)

  const handleChange = (e) => {
    const newValue = e.target.value;
    setText(newValue)
    onChange(newValue)
  }

  return (
    <input style={w ? { width: `${w}%`} : {}} className={styles.jsonContentString} value={text} onChange={handleChange}></input>
  )
}

export const JsonContentArray = ({ onChange, others, label, onRemove }) => {
  const [localElems, setElems] = useState(others)

  const handleChange = (value, id) => {
    const newChilds = []
    localElems.forEach(element => {
      const newObj = element;
      if (id === element.id) {
        newObj.label = value
      }

      newChilds.push(newObj);
    });
    onChange(newChilds)
  }

  const handleAddElem = () => {
    setElems([...localElems, { id: generateRandomID(), label: '', type: "string" }])
  }

  const handleRemove = (id) => {
    const newChilds = localElems.filter(elem => id !== elem.id)
    onRemove(newChilds)
  }

  return (
    <div className={styles.jsonContentArray} key={others.id}>
      {localElems?.map(el => {
        if ('string' === el.type) {
          return (
            <div key={el.id} className={styles.jsonContentArrayElem}>
              <JsonContentString w={90} label={el.label} onChange={(val) => handleChange(val, el.id)} />
              <button onClick={() => handleRemove(el.id)} className={`${styles.closeAction} ${styles.closeActionArray}`}>x</button>
            </div>
          )
        }

        return null;
      })}
      <button onClick={handleAddElem}>{`Agregar ${label}`}</button>
    </div>
  )
}