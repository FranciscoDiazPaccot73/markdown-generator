import { useState } from "react"

import { generateRandomID } from "../utils";

import styles from '../styles/Home.module.css';

export const JsonContentString = ({label, onChange, w, value}) => {
  const [text, setText] = useState(value ?? '')

  const handleChange = (e) => {
    const newValue = e.target.value;
    setText(newValue)
    onChange(newValue)
  }

  return (
    <>
      <span className={styles.inputLabelAbsolute}>{label}</span>
      <input style={w ? { width: `${w}%`} : {}} className={styles.jsonContentString} value={text} onChange={handleChange}></input>
    </>
  )
}

export const JsonContentDoubleString = ({label, onChange, others}) => {
  const [inputs, setText] = useState(others)

  const handleChange = (value, id) => {
    const newChilds = []
    inputs.forEach(element => {
      const newObj = element;
      if (id === element.id) {
        newObj.value = value
      }

      newChilds.push(newObj);
    });
    setText(newChilds)
    onChange(newChilds)
  }

  return (
    <>
      <span className={`${styles.inputLabelAbsolute} ${styles.inputLabelAbsoluteSecondary}`}>{label}</span>
      <div className={styles.jsonContentDoubleString} >
        {inputs.length ? inputs.map(ch => <input className={styles.jsonContentDoubleString} key={ch.id} value={ch.value ?? ''} onChange={(e) => handleChange(e.target.value, ch.id)} />) : null}
      </div>
    </>
  )
}

export const JsonContentArray = ({ onChange, others, label, onRemove, limit, subtype, onAdd }) => {
  const [localElems, setElems] = useState(others)
  const [count, setCount] = useState(1)

  const handleChange = (value, id) => {
    const newChilds = []
    localElems.forEach(element => {
      const newObj = element;
      if (id === element.id) {
        newObj.value = value
      }

      newChilds.push(newObj);
    });
    onChange(newChilds)
  }

  const handleAddElem = () => {
    setCount(prevValue => prevValue += 1)
    onAdd({ id: generateRandomID(), label, value: '', type: "string" })
  }

  const handleRemove = (id) => {
    const newChilds = localElems.filter(elem => id !== elem.id)
    onRemove(newChilds)
  }

  return (
    <div className={styles.jsonContentArray} key={generateRandomID()}>
      {localElems?.map(el => {
        if ('string' === el.type) {
          return (
            <div key={el.id} className={styles.jsonContentArrayElem}>
              <JsonContentString w={82} label={el.label} value={el.value} onChange={(val) => handleChange(val, el.id)} />
              <button onClick={() => handleRemove(el.id)} className={`${styles.closeAction} ${styles.closeActionArray}`}>x</button>
            </div>
          )
        }
        if ('double-string' === el.type) {
          return (
            <div key={el.id} className={styles.jsonContentArrayElem} style={{ marginBottom: '16px', marginTop: "16px" }}>
              <JsonContentDoubleString others={el.child} label={el.label} onChange={(val) => handleChange(val, el.id)} />
            </div>
          )
        }

        return null;
      })}
      {subtype !== 'single' && <button disabled={limit && limit === count} onClick={handleAddElem}>{`Agregar ${label}`}</button>}
    </div>
  )
}
