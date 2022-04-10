import '../styles/globals.css'
import Head from 'next/head';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
    return(
        <div>
            <Head>
                <title>Simple Notes</title>
                <style>
                    @import url(https://fonts.googleapis.com/css2?family=Varela+Round&display=swap);
                </style>
            </Head>
            <Component {...pageProps} />
            <Script src='https://kit.fontawesome.com/aef06a57f1.js' crossorigin='anonymous' />
        </div>
    );
}

export default MyApp
