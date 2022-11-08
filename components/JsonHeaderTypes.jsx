import styles from '../styles/Home.module.css';

export const SwitchType = ({ type, ...others }) => {
  const { label, value, onAction, id } = others;
  const handleAction = (e) => {
    const newObj = { type, id, value: e.target.checked, label }
    onAction(newObj, type)
  }

  return (
    <div>
      <span>{label}</span>
      <label className={styles.switch}>
        <input type="checkbox" checked={value} onChange={handleAction} />
        <span className={styles.slider} />
      </label>
    </div>
  )
}

const StringType = ({ label, type, onRemove, id }) => (
  <span className={styles.stringType}>
    {`${label} / ${type}`}
    {onRemove ?
      <span
        onClick={() => onRemove(id)}
        style={{ position: "absolute", right: '6px', top:'2px', fontSize:'12px', cursor: "pointer", padding: "2px" }}
      >X</span>
    : null}
  </span>
)

const ArrayType = ({ label, type, onRemove, id, child }) => {
  let text = `${label} / ${type}`;
  child.forEach(element => {
    text = text + `: ${element.label} / ${element.type}, `
  });

  return (
    <span className={styles.stringType}>
      {text}
      {onRemove ?
        <span
          onClick={() => onRemove(id)}
          style={{ position: "absolute", right: '6px', top:'2px', fontSize:'12px', cursor: "pointer", padding: "2px" }}
        >X</span>
      : null}
    </span>
  )
}

const JsonTypes = (type = "string") => {
  const components = {
    switch: SwitchType,
    string: StringType,
    array: ArrayType,
  }

  return components[type];
}

export default JsonTypes;
