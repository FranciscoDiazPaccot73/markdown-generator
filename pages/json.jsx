import { useState, useRef } from 'react'
import Head from 'next/head'

import Json from '../components/Json'
import DocumentHeader from '../components/DocumentHeader'
import Footer from '../components/Footer'

import { JSON_META_TAGS } from '../utils';

import styles from '../styles/Home.module.css'

export default function Home() {
  const [fileContent, setFileContent] = useState({})
  const FILE_NAME = useRef()
  const STATIC_SCAFFOLDING = useRef()

  const handleHeader = (config, data, fileName) => {
    setFileContent({ config, data })
    FILE_NAME.current = fileName
    STATIC_SCAFFOLDING.current = [...config]
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{JSON_META_TAGS.title}</title>
        <meta name="description" content={JSON_META_TAGS.description} />
        <meta name="title" content="Simple JSON Generator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={JSON_META_TAGS.title} />
        <meta property="og:description" content={JSON_META_TAGS.description} />
        <meta property="og:site_name" content={JSON_META_TAGS.title} />
        <meta property='og:image' content={JSON_META_TAGS.logoUrl} />
        <meta property='og:url' content={JSON_META_TAGS.url} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:creator" content="@Pancho_xor" />
        <meta property='twitter:image' content={JSON_META_TAGS.logoUrl} />
        <meta property='twitter:url' content={JSON_META_TAGS.url} />
        <meta property="twitter:title" content={JSON_META_TAGS.title} />
        <meta property="twitter:description" content={JSON_META_TAGS.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <strong>JSON File Generator</strong>
        </h1>
        <DocumentHeader handleHeader={handleHeader} type='json' />
        <div className={styles.json}>
          {fileContent.config && <Json originalHeader={STATIC_SCAFFOLDING.current} fileName={FILE_NAME.current} content={fileContent.data} header={fileContent.config} />}
        </div>
      </main>
      <Footer />
    </div>
  )
}
