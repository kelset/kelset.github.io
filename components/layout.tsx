import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import styles from './layout.module.css'

import utilStyles from '../styles/utils.module.css'

const name = '@kelset'
export const siteTitle = "Kelset's"

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Kelset's personal website" />
        <meta property="og:image" content={`/public/favicon.ico`} />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              src="/images/profile.png"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
              width={150}
              height={150}
            />
            <h1 className={utilStyles.headingLg}>{name}</h1>
            <h1 className={utilStyles.headingMd}>a.k.a. Lorenzo Sciandra</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  src="/images/profile.png"
                  className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                  alt={name}
                  width={150}
                  height={150}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <footer className={utilStyles.footer}>
        <Link href="https://github.com/kelset/kelset.github.io">
          <a>Repo on Github</a>
        </Link>
      </footer>
    </div>
  )
}
