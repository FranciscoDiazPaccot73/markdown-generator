import { useState } from "react"

export const JsonContentString = ({label, onChange}) => {
  const [text, setText] = useState(label)

  const handleChange = (e) => {
    const newValue = e.target.value;
    setText(newValue)
    onChange(newValue)
  }

  return (
    <input value={text} onChange={handleChange}></input>
  )
}

export const JsonContentArray = ({onChange, others, label}) => {
  const [localElems, setElems] = useState(others)

  const handleChange = (value, id) => {
    const newChilds = []
    others.forEach(element => {
      const newObj = element;
      if (id === element.id) {
        newObj.label = value
      }

      newChilds.push(newObj);
    });
    onChange(newChilds)
  }

  const handleAddElem = () => {
    setElems([...localElems, { id: 'random', label: '', type: "string" }])
  }

  return (
    <div>
      {localElems?.map(el => {
        if ('string' === el.type) return <JsonContentString label={el.label} onChange={(val) => handleChange(val, el.id)} />

        return null;
      })}
      <button onClick={handleAddElem}>{`Agregar ${label}`}</button>
    </div>
  )
}