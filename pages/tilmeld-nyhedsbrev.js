import Head from "next/head";
import Hero from "../components/Hero";
import MailchimpForm from "../components/MailchimpForm";

export default function SignupPage() {
    return (
        <>
            <Head>
                <title>Marias Rum | Tilmeld dig mit nyhedsbrev</title>
                <meta name="description" content={"Tilmeld dig mit nyhedsbrev"} key='description'/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Hero
                src={"https://eu-central-1.graphassets.com/ASSn3x3YQQ1WJ6dAOC37Iz/Sk2f68SfQTq83wiAspQQ"}
                title={"Få mine bedste tips til at nulstille dit nervesystem. "}
                smallTitle={"Lær simple teknikker til at opnå mere ro og balance"}
                href={null}
            />
            <div>
                <MailchimpForm/>
            </div>
        </>
    )
}