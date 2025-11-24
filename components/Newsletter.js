"use client";

import scss from '../styles/mailchimp.module.scss'
import useSWR from 'swr'
import {request} from 'graphql-request'
import {useRouter} from "next/router";
import {useNewsletterModal} from "./NewsletterModalContext";

const fetcher = query => request('https://api-eu-central-1.graphcms.com/v2/cl1aoja8b02gc01xm3r6e8ajy/master', query)

export default function Newsletter() {
    const {pathname} = useRouter();
    const { openNewsletter } = useNewsletterModal();

    const {data, error} = useSWR(`
    query FooterContent {
      footer(where: {footerType: Generel}) {
        overskriftTilNyhedsbrev
        tekstTilNyhedsbrev {
          html
        }
      }
    }`,
        fetcher
    )

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <>
            <section className={scss.newsletter}
                     style={pathname === "/tilmeld-nyhedsbrev" ? {display: 'none'} : undefined}>
                <div className={scss.inner}>
                    <h2>{data.footer.overskriftTilNyhedsbrev}</h2>
                    <div dangerouslySetInnerHTML={{__html: `${data.footer.tekstTilNyhedsbrev.html}`}}></div>
                    <button className={scss.signUpButton} onClick={openNewsletter}>Tilmeld dig her</button>
                </div>
            </section>
        </>
    )
}
