import Header from '../components/Header'

// Components
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'
import Meta from '../components/Meta'
import scss from '../styles/layout.module.scss'
import NewsletterPopup from "../components/NewsletterPopup";
import {NewsletterModalProvider} from "../components/NewsletterModalContext";

export default function Layout({children}) {
    return (
        <>
            <Meta/>
            <Header/>
            <main className={scss.main}>
                {children}
            </main>
            <NewsletterModalProvider>
                <NewsletterPopup/>
                <Newsletter/>
            </NewsletterModalProvider>
            <Footer/>
        </>
    )
}
