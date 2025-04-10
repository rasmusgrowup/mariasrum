import Image from "next/image"
import scss from '../../styles/articles.module.scss'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React from 'react'

import ErrorPage from 'next/error'
import { GraphQLClient } from 'graphql-request';
const graphcms = new GraphQLClient(
  'https://eu-central-1.cdn.hygraph.com/content/cl1aoja8b02gc01xm3r6e8ajy/master'
)

export async function getStaticProps({ params }) {
  const { artikel } = await graphcms.request(`
    query ArtikelQuery($slug: String!) {
      artikel(where: { slug: $slug}) {
        createdAt
        dato
        forfatter
        slug
        tags
        links {
          html
        }
        seo {
          metaTitel
          metaBeskrivelse
          metaTags
        }
        indhold {
          html
          text
        }
        titel
        underoverskrift
        billede {
          url
        }
      }
    }
  `,
    {
      slug: params.slug
    }
  );

  return {
    props: {
      artikel
    }
  }
}

export async function getStaticPaths() {
  const { artikler } = await graphcms.request(`
    {
      artikler {
        slug
      }
    }
  `);

  return {
    paths: artikler.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  }
}

function Artikel({ artikel }) {
  const router = useRouter()

  if (!router.isFallback && !artikel?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      { artikel.seo &&
        <Head>
          <title>Marias Rum | {artikel.seo.metaTitel}</title>
          <meta name="description" content={artikel.seo.metaBeskrivelse} key='description'/>
          <meta name="keywords" content={artikel.seo.metaTags} key='keywords' />
        </Head>
      }
      <section className={scss.hero}>
        <div className={scss.articleImageWrapper}>
          <div className={scss.articleImageContainer}>
            <Image src={artikel.billede.url} layout='fill' quality='100' objectFit='cover' objectPosition='center' priority='true' />
          </div>
        </div>
        <div className={scss.content}>
          <h1 className={scss.title}>{artikel.titel}</h1>
        </div>
      </section>
      <section className={scss.indhold}>
        { artikel.dato === null ?
          <div className={scss.date}>Dato: {new Date(`${artikel.createdAt}`).toLocaleDateString()}</div>
        :
          <div className={scss.date}>Dato: {artikel.dato}</div>
        }
        <div className={scss.author}>Forfatter: {artikel.forfatter}</div>
        <h2 className={scss.articleTitel}>{artikel.titel}</h2>
        <h3 className={scss.articleSubTitel}>{artikel.underoverskrift[0]}</h3>
        <div dangerouslySetInnerHTML={{ __html: artikel.indhold.html }}></div>
      </section>
      <section className={scss.links}>
        { artikel.links.html !== null &&
        <div className={scss.linksInner}>
          { artikel.links.map((link, i) => (
            <div key={i} className={`articleLink ${scss.linksLink}`} dangerouslySetInnerHTML={{ __html: link.html }}></div>
          ))}
        </div>
      }
      </section>
    </>
  )
}

Artikel.defaultProps = {
  title: 'Marias Rum | Et Kropsterapeutisk Univers',
  keywords: 'Kropsterapi, angst, traume, stress, sorg, behandling',
  description: 'Traumer er en del af livet. Vi kommer alle ud for situationer, som vi ikke er forberedte på. Situationer, hvor kroppen bliver bange og trækker sig sammen. Noget indeni går i stå, og åndedrættet bliver tilbageholdt.'
}

export default Artikel
