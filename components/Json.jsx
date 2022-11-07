import { useState, useRef } from 'react';

import { JsonContentString, JsonContentArray } from './JsonContentTypes';

import styles from '../styles/Home.module.css';

const isArrayCheck = (arr) => {
  const { value } = arr.find(item => item.id === 'isArray')

  return value;
}

const generateContentScaffolding = config => {
  const scaffolding = [];
  const newConfig = config.filter(c => c.type !== 'switch');

  newConfig.forEach(conf => {
    const randomId = Math.random().toString(16).slice(2);
    const newObj = {...conf, id: randomId}

    scaffolding.push(newObj);
  })

  return scaffolding;
}

const formatFile = (content, isArray) => {

}

const Json = ({ content, header }) => {
  const isArray = useRef(isArrayCheck(header))
  const contentScaffolding = useRef(generateContentScaffolding(header))
  const [localContent, setContent] = useState(content);
  const [file, setFile] = useState(null);

  const handleAdd = () => setContent([...localContent, contentScaffolding.current])

  return (
    <>
      <div>
        {localContent?.length ? localContent.map(item => (
          <div>
            {item.map(elem => {
              if (elem.type === 'string') {
                return <JsonContentString label={elem.label} onChange={()=>{}} />
              }
              if (elem.type === 'array') {
                return <JsonContentArray others={elem.child} label={elem.label} onChange={()=>{}} />
              }
              return null;
            })}
          </div>
        )) : null}
      </div>
      <button onClick={handleAdd}>Add</button>
    </>
  )
}

export default Json;
