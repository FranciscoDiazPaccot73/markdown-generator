import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import Markdown from '../components/Markdown'
import DocumentHeader from '../components/DocumentHeader'
import Footer from '../components/Footer'

import { INITIAL_DATA, META_TAGS } from '../utils';

import styles from '../styles/Home.module.css'

export default function Home() {
  const [header, setHeader] = useState(INITIAL_DATA)

  return (
    <div className={styles.container}>
      <Head>
        <title>{META_TAGS.title}</title>
        <meta name="description" content={META_TAGS.description} />
        <meta name="title" content="Simple Markdown Generator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={META_TAGS.title} />
        <meta property="og:description" content={META_TAGS.description} />
        <meta property="og:site_name" content={META_TAGS.title} />
        <meta property='og:image' content={META_TAGS.logoUrl} />
        <meta property='og:url' content={META_TAGS.url} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:creator" content="@Pancho_xor" />
        <meta property='twitter:image' content={META_TAGS.logoUrl} />
        <meta property='twitter:url' content={META_TAGS.url} />
        <meta property="twitter:title" content={META_TAGS.title} />
        <meta property="twitter:description" content={META_TAGS.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Image src="/markdown.png" priority width={80} height={80} />
          <strong>Markdown File Generator</strong>
        </h1>
        <DocumentHeader handleHeader={setHeader} header={header} />
        <Markdown header={header} />
      </main>
      <Footer />
    </div>
  )
}
