import Link from 'next/link';

import styles from '../styles/Home.module.css';

const Footer = ({ type }) => (
  <footer className={styles.footer}>
    <div className={styles.footerWrapper}>
    <div className={styles.footerContent}>
      <div className={styles.footerColumn}>
        <div className={styles.footerTitle} id="documentation">Documentation</div>
        {type && type === 'json' ? (
          <ul>
            <li>
              <a target="_blank" rel="noreferrer noopener" href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON#:~:text=JavaScript%20Object%20Notation%20(JSON)%20is,page%2C%20or%20vice%20versa).">JSON Basic Syntax</a>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <a target="_blank" rel="noreferrer noopener" href="https://www.markdownguide.org/basic-syntax/">Markdown Basic Syntax</a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer noopener" href="https://help.start.gg/en/articles/1987102-customizing-text-with-markdown">Custom Markdowns with HTML</a>
            </li>
          </ul>
        )}
      </div>
      <div className={styles.footerColumn}>
        <div className={styles.footerTitle} id="documentation">Other Formats</div>
        <ul>
          <li>
            <Link href="/"> Markdown </Link>
          </li>
          <li>
            <Link href="/json"> JSON </Link>
          </li>
        </ul>
      </div>
    </div>
    <div className={styles.footerDev}>
      <div>
        <>Made with <span> &#9829; </span> by</>
        <a href="https://www.franciscodiazpaccot.dev/"> Francisco Diaz Paccot</a>
        <span className={styles.copyright}>
          <svg viewBox="0 0 1024 1024" height={14} width={14} fill="#fff">
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm5.6-532.7c53 0 89 33.8 93 83.4.3 4.2 3.8 7.4 8 7.4h56.7c2.6 0 4.7-2.1 4.7-4.7 0-86.7-68.4-147.4-162.7-147.4C407.4 290 344 364.2 344 486.8v52.3C344 660.8 407.4 734 517.3 734c94 0 162.7-58.8 162.7-141.4 0-2.6-2.1-4.7-4.7-4.7h-56.8c-4.2 0-7.6 3.2-8 7.3-4.2 46.1-40.1 77.8-93 77.8-65.3 0-102.1-47.9-102.1-133.6v-52.6c.1-87 37-135.5 102.2-135.5z"
            />
          </svg>
          <span className="ml-0.5">{`2022 - ${new Date().getFullYear()}`}</span>
        </span>
      </div>
    </div>
    </div>
  </footer>
)

export default Footer;
