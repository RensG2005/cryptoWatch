import '../styles/globals.css'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from "react";
import AOS from "aos";

import "aos/dist/aos.css";

NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()


function MyApp({ Component, pageProps }) {
  useEffect(() => {
		AOS.init({
			delay: 90,
			duration: 400,
      offset: 30,
		});
	});
  return (
    <>
      <header>
          <Link href="/">
            <h1 className="logo">CryptoWatch</h1>
          </Link>
        <nav>
          <Link href="/exchanges">
            Exchanges
          </Link>
          <Link href="/watchlist">
            Watchlist
          </Link>
          <Link href="/blog">
            Blog
          </Link>
        </nav>
      </header>
      <Component {...pageProps} />
    </>
  ) 
}

export default MyApp
