import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";

import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";

import { getSortedPostsData } from "../lib/posts";

import utilStyles from "../styles/utils.module.css";

const kindsOfTalks = [
  "Keynotes",
  "Talks",
  "Panels",
  "Moderation",
  "Podcasts",
  "Q&A",
  "Posts",
  "Video series",
];

const websitesWithAccounts = [
  { website: "Twitter", url: "https://twitter.com/Kelset" },
  { website: "Medium", url: "https://medium.com/@Kelset" },
  { website: "Dev.To", url: "https://dev.to/kelset" },
  { website: "GitHub", url: "https://github.com/kelset" },
  { website: "LinkedIn", url: "https://www.linkedin.com/in/lorenzo-sciandra/" },
  { website: "SpeakerDeck", url: "https://speakerdeck.com/kelset" },
  { website: "Calendly", url: "https://calendly.com/kelset" },
  { website: "HashNode", url: "https://hashnode.com/@kelset" },
  { website: "ProductHunt", url: "https://www.producthunt.com/@kelset" },
  { website: "Sessionize", url: "https://sessionize.com/kelset/" },
  { website: "GitLab", url: "https://gitlab.com/kelset" },
  {
    website: "Mastodon",
    url: "https://mastodon.technology/web/accounts/327655",
  },
];

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <ul className={utilStyles.websitesList}>
          {websitesWithAccounts.map((websiteType) => (
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
        Lorenzo is a Senior Software Engineer at Microsoft — a few years ago he
        decided to use React Native for a project. He hasn’t stopped since: he
        became an Open Source maintainer for the core project, helping the
        Facebook team. He also cares a lot about mental health, so he decided to
        help his local OSS community with a dedicated meetup, ProvidedAsIs
        (currently paused indefinitely 'cause Covid).
      </cite>
      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Speaking at things</h2>
        <p>
          Over the last few years I've spoken to multiple events all around the
          world and even a few remote ones. I've also been a guest on a couple
          podcasts.
        </p>
        <p>
          I'm available for any of these:
          <ul className={utilStyles.eventsList}>
            {kindsOfTalks.map((eventType) => (
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
          Sometimes - but I've mostly stopped - I write articles and blog posts.
          You can find some examples over at
          <a href="https://medium.com/@Kelset"> Medium </a>
          and
          <a href="https://dev.to/kelset"> Dev.To</a>.
        </p>
        <p>Probably I'll starting working more here, you can check this out:</p>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Want to reach out?</h2>
        <p>You can pick either one:</p>
        <ul>
          <li key={"twitter"}>
            <a href="https://twitter.com/Kelset">DMs on Twitter</a>
          </li>
          <li key={"email"}>
            <a href="mailto: notkelset@kelset.dev">An old-school email</a>
          </li>
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
