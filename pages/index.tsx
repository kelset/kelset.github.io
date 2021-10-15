import Head from 'next/head'

import Layout, { siteTitle } from '../components/layout'

import utilStyles from '../styles/utils.module.css'

const kindsOfTalks = [
  'Keynotes',
  'Talks',
  'Panels',
  'Moderation',
  'Podcasts',
  'Q&A',
  'Posts',
  'Video series'
]

const websitesWithAccounts = [
  { website: 'Twitter', url: 'https://twitter.com/Kelset' },
  { website: 'Medium', url: 'https://medium.com/@Kelset' },
  { website: 'Dev.To', url: 'https://dev.to/kelset' },
  { website: 'GitHub', url: 'https://github.com/kelset' },
  { website: 'LinkedIn', url: 'https://www.linkedin.com/in/lorenzo-sciandra/' },
  { website: 'SpeakerDeck', url: 'https://speakerdeck.com/kelset' },
  { website: 'Calendly', url: 'https://calendly.com/kelset' },
  { website: 'HashNode', url: 'https://hashnode.com/@kelset' },
  { website: 'ProductHunt', url: 'https://www.producthunt.com/@kelset' },
  { website: 'Sessionize', url: 'https://sessionize.com/kelset/' },
  { website: 'GitLab', url: 'https://gitlab.com/kelset' },
  {
    website: 'Mastodon',
    url: 'https://mastodon.technology/web/accounts/327655'
  }
]

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <ul className={utilStyles.websitesList}>
          {websitesWithAccounts.map(websiteType => (
            <li
              className={utilStyles.websitesListItem}
              key={websiteType.website}
            >
              <a href={websiteType.url}> {websiteType.website}</a>
            </li>
          ))}
        </ul>
      </section>
      <cite className={utilStyles.citingText}>
        Lorenzo is a Senior Software Engineer at Microsoft. A few years ago he
        decided to use React Native for a project, and he hasn’t stopped since:
        he became an Open Source maintainer and releaser for the core project in
        2018. He also cares a lot about OSS and mental health, so he tries to be
        an advocate for sustainability & balance.
      </cite>
      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Speaking at things</h2>
        <p>
          Over the last few years I have spoken to multiple events all around the
          world and even a few remote ones. I have also been a guest on a couple
          podcasts.
        </p>
        <p>
          I am available for any of these:
          <ul className={utilStyles.eventsList}>
            {kindsOfTalks.map(eventType => (
              <li className={utilStyles.eventsListItem} key={eventType}>
                {eventType}
              </li>
            ))}
          </ul>
          on the topics of React Native, being a Software Engineer, dealing with
          Mental Health and Open Source (and any intersection of these).
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>I write stuff, sometimes</h2>
        <p>
          Sometimes - but I have mostly stopped - I write articles and blog posts.
          You can find some examples over at
          <a href="https://medium.com/@Kelset"> Medium </a>
          and
          <a href="https://dev.to/kelset"> Dev.To</a>.
        </p>
      </section>
      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Want to reach out?</h2>
        <p>You can pick either one:</p>
        <ul>
          <li key={'twitter'}>
            <a href="https://twitter.com/Kelset">DMs on Twitter</a>
          </li>
          <li key={'email'}>
            <a href="mailto: notkelset@kelset.dev">An old-school email</a>
          </li>
        </ul>
      </section>
    </Layout>
  )
}
