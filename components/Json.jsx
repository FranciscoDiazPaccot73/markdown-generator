import { useState, useRef } from 'react';

import { JsonContentString, JsonContentArray } from './JsonContentTypes';
import DownloadButton from './DownloadButton';

import { formatFile } from '../utils';

import styles from '../styles/Home.module.css';

const Json = ({ content, fileName, configHeader, generateNewElem }) => {
  const [localContent, setContent] = useState(content);
  const [loading, setLoading] = useState(false);
  const [shouldDownload, setShouldDownload] = useState(false);
  const contentElemsRef = useRef()

  const handleAdd = () => {
    const newArray = generateNewElem(localContent);
    if (newArray.length) {
      setContent(newArray)
    }
  }

  const handleChange = (values, type, id) => {
    let newContent = localContent;
    newContent.forEach(({ components }) => {
      components.forEach(elem => {
        if (elem.id === id) {
          if (type === 'string') elem.value = values;
          if (type === 'array') elem.child = values;
        }
      })
    })
    setContent(newContent)
  }

  const handleAddChild = (newElem, type, id) => {
    let newContent = localContent;
    newContent.forEach(({ components }) => {
      components.forEach(elem => {
        if (elem.id === id) {
          if (type === 'array') elem.child.push(newElem);
        }
      })
    })
    setContent(newContent)
    forceRender()
  }

  const forceRender = (isDownload = false) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      isDownload && setShouldDownload(true);
    }, 100);
  }

  const handleRemoveCard = (id) => {
    forceRender()
    const newContent = localContent.filter(elem => elem.id !== id)
    setContent(newContent)
  }

  const handleRemove = (values, type, id) => {
    forceRender()
    handleChange(values, type, id)
  }

  const handleStartDownload = () => {
    forceRender(true)
    setTimeout(() => {
      setShouldDownload(false)
    }, 200);
  }

  return (
    <div>
      <div className={styles.jsonContent}>
        <div ref={contentElemsRef} className={styles.jsonContentElems}>
          {!loading && localContent?.length ? localContent.map(({ id, components }) => (
            <div key={id} className={styles.jsonContentInner}>
              <button onClick={() => handleRemoveCard(id)} className={`${styles.closeAction} ${styles.jsonContentInnerAction}`}>X</button>
              {components.map(elem => {
                if (elem.type === 'columns' && contentElemsRef.current) {
                  if (elem.value === 2) {
                    contentElemsRef.current.classList.add(styles.jsonContentElemsMultiple)
                  }
                  if (elem.value === 1) {
                    contentElemsRef.current.classList.add(styles.jsonContentElemsSingle)
                  }
                }
                if (elem.type === 'string') {
                  return <JsonContentString key={elem.id} label={elem.label} value={elem.value} onChange={value => handleChange(value, elem.type, elem.id)} />
                }
                if (elem.type === 'array') {
                  let props = {
                    key: elem.id,
                    others: elem.child,
                    label: elem.label,
                    onRemove: value => handleRemove(value, elem.type, elem.id),
                    onChange: value => handleChange(value, elem.type, elem.id),
                    limit: elem.limit,
                    configHeader,
                    onAdd: value => handleAddChild(value, elem.type, elem.id),
                  }

                  if (elem.subtype === "single") {
                    props = { ...props, subtype: elem.subtype }
                  }

                  return <JsonContentArray key={elem.id} {...props} />
                }
                return null;
              })}
            </div>
          )) : null}
        </div>
        <button className={styles.jsonContentButton} onClick={handleAdd}>Add</button>
      </div>
      <DownloadButton fileN={fileName} startDownloading={handleStartDownload} shouldDownload={shouldDownload} currentText={formatFile(localContent, header)} type="json" />
      {loading ? <span style={{ width: "100%", marginTop: "40px", display: "flex", justifyContent: "center" }}>Loading...</span> : null}
    </div>
  )
}

export default Json;
