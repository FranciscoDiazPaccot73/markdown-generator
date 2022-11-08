import { useState } from 'react';

import { JsonContentString, JsonContentArray } from './JsonContentTypes';
import DownloadButton from './DownloadButton';

import { formatFile, generateContentScaffolding } from '../utils';

import styles from '../styles/Home.module.css';

const Json = ({ content, header, fileName, originalHeader }) => {
  const [localContent, setContent] = useState(content);
  const [loading, setLoading] = useState(false);
  const [shouldDownload, setShouldDownload] = useState(false);

  const handleAdd = () => {
    if (originalHeader.length) {
      const scaffolding = generateContentScaffolding(originalHeader);
      const newArray = [...localContent, scaffolding];
      setContent(newArray)
    }
  }

  const handleChange = (values, type, id) => {
    let newContent = localContent;
    newContent.forEach(({ components }) => {
      components.forEach(elem => {
        if (elem.id === id) {
          if (type === 'string') elem.label = values;
          if (type === 'array') elem.child = values;
        }
      })
    })
    setContent(newContent)
  }

  const forceRender = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
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
    setShouldDownload(true)
    setTimeout(() => {
      setLoading(false)
      setShouldDownload(false)
    }, 150);
  }

  return (
    <div>
      {!loading ? (
        <>
          <div className={styles.jsonContent}>
            <div className={styles.jsonContentElems}>
              {localContent?.length ? localContent.map(({ id, components }) => (
                <div key={id} className={styles.jsonContentInner}>
                  <button onClick={() => handleRemoveCard(id)} className={`${styles.closeAction} ${styles.jsonContentInnerAction}`}>X</button>
                  {components.map(elem => {
                    if (elem.type === 'string') {
                      return <JsonContentString key={elem.id} label={elem.label} onChange={value => handleChange(value, elem.type, elem.id)} />
                    }
                    if (elem.type === 'array') {
                      return <JsonContentArray key={elem.id} others={elem.child} label={elem.label} onRemove={value => handleRemove(value, elem.type, elem.id)} onChange={value => handleChange(value, elem.type, elem.id)} />
                    }
                    return null;
                  })}
                </div>
              )) : null}
            </div>
            <button className={styles.jsonContentButton} onClick={handleAdd}>Add</button>
          </div>
          <DownloadButton fileN={fileName} startDownloading={handleStartDownload} shouldDownload={shouldDownload} currentText={formatFile(localContent, header)} type="json" />
        </>
      ) : (
        <span style={{ width: "100%", marginTop: "40px", display: "flex", justifyContent: "center" }}>Loading...</span>
      )}
    </div>
  )
}

export default Json;
