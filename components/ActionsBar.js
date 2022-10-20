import { addTextFormat } from '../utils';

import styles from '../styles/Home.module.css';

const ActionsBar = ({ currentText, copyTextRef, textAreaRef }) => {
  const handleText = (e) => {
    addTextFormat(textAreaRef.current, e.target.id)
  }

  const handleCopy = () => {
		if (currentText.length > 0) {
			navigator.clipboard.writeText(currentText)
      copyTextRef.current.style.display = 'inline-block'
      setTimeout(() => {
        copyTextRef.current.style.display = 'none'
      }, 2000);
		}
	}

  return (
    <div className={styles.markdownActions}>
      <div onClick={handleText}><i id="h1" className='h1' /></div>
      <div onClick={handleText}><i id="h2" className='h2' /></div>
      <div onClick={handleText}><i id="bold" className='bold' /></div>
      <div onClick={handleText}><i id="italic" className='italic' /></div>
      <div onClick={handleText}><i id="list-ul" className='list-ul' /></div>
      <div onClick={handleText}><i id="link" className='link' /></div>
      <div style={{marginLeft: "auto" }} onClick={handleCopy}><i className='copy' /></div>
      <a href="/#footer"><i className='question' /></a>
    </div>
  )
}

export default ActionsBar;
