import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

import Footer from '../components/Footer'
import Textarea from '../components/Textarea'

import { INITIAL_DATA, MINIFIED_META_TAGS } from '../utils'

import styles from '../styles/Home.module.css'

export default function Home() {
  const [header, setHeader] = useState(INITIAL_DATA)

  return (
    <div className={styles.container}>
      <Head>
        <title>{MINIFIED_META_TAGS.title}</title>
        <meta name="description" content={MINIFIED_META_TAGS.description} />
        <meta name="title" content="Simple Markdown Generator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={MINIFIED_META_TAGS.title} />
        <meta property="og:description" content={MINIFIED_META_TAGS.description} />
        <meta property="og:site_name" content={MINIFIED_META_TAGS.title} />
        <meta property='og:image' content={MINIFIED_META_TAGS.logoUrl} />
        <meta property='og:url' content={MINIFIED_META_TAGS.url} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:creator" content="@Pancho_xor" />
        <meta property='twitter:image' content={MINIFIED_META_TAGS.logoUrl} />
        <meta property='twitter:url' content={MINIFIED_META_TAGS.url} />
        <meta property="twitter:title" content={MINIFIED_META_TAGS.title} />
        <meta property="twitter:description" content={MINIFIED_META_TAGS.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Image src="/markdown.png" priority width={80} height={80} alt="Markdown generator Logo" />
          <div>
            <strong className={styles.titleBig}>Minified Finder</strong>
          </div>
        </h1>
        <Textarea header={header} />
      </main>
      <Footer />
    </div>
  )
}
