import Head from 'next/head'
import Hero from '../../components/Hero'
import VideoHero from '../../components/VideoHero'
import Image from "next/image"
import Link from "next/link"
import scss from '../../styles/articles.module.scss'
import { GraphQLClient } from 'graphql-request';

import Chevron from '../../public/chevron_right.svg'
import SectionRenderer from "../../components/SectionRenderer";

const graphcms = new GraphQLClient(
  'https://eu-central-1.cdn.hygraph.com/content/cl1aoja8b02gc01xm3r6e8ajy/master'
)

export async function getServerSideProps() {
  const { hovedside, artikler } = await graphcms.request(
    `
      query ArtiklerQuery {
        artikler(orderBy: createdAt_DESC) {
          id
          slug
          billede {
            mimeType
            url
            width
            height
          }
          titel
          underoverskrift
        }
        hovedside(where: {sidetype: Artikler}) {
          heroBillede {
            url
          }
          ctaLink
          ctaTekst
          overskrift
          seo {
            metaBeskrivelse
            metaTags
            metaTitel
          }
          blokke {
            __typename
            ... on Tekst {
              id
              overskrift
              tekst {
                html
              }
            }
          }
        }
      }
    `
  );

  return {
    props: {
      hovedside,
      artikler
    }
  }
}

export default function Artikler({ hovedside, artikler }) {

  return (
    <>
      {
        hovedside.seo &&
        <Head>
          <title>Marias Rum | {hovedside.seo.metaTitel}</title>
          <meta name="description" content={hovedside.seo.metaBeskrivelse} key='description'/>
          <meta name="keywords" content={hovedside.seo.metaTags} key='keywords' />
        </Head>
      }
      { hovedside.heroBillede.mimeType !== 'video/mp4' ?
      <Hero
        src={hovedside.heroBillede.url}
        title={hovedside.overskrift}
        buttonText={hovedside.ctaTekst}
        href={hovedside.ctaLink}
      /> :
      <VideoHero
      url={hovedside.heroBillede.url}
      title={hovedside.overskrift}
      text={hovedside.underoverskrift}
      href={hovedside.ctaLink}
      buttonText={hovedside.ctaTekst}
      />}
      <SectionRenderer sections={hovedside.blokke} />
      <section className={scss.wrapper}>
        <h2>Seneste artikler</h2>
        <div className={scss.artikler}>
          { artikler.map(({ id, billede, slug, titel, underoverskrift }) => (
            <Link href={`/artikler/${slug}`} key={id}><a>
              <div className={scss.artikel}>
                <div className={scss.imageWrapper}><Image src={billede.url} objectFit='cover' width='400' height='400'/></div>
                <div className={scss.artikelTekst}>
                  <h2>{titel}</h2>
                  <p>{underoverskrift[0]}</p>
                  <div className={scss.artikelLink}>
                    <span>Læs artikel</span>
                    <Image src={Chevron} width='9' height='9'/>
                  </div>
                </div>
              </div>
            </a></Link>
          ))}
        </div>
      </section>
    </>
  )
}
