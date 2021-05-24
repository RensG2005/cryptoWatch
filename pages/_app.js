import '../styles/globals.css'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()


function MyApp({ Component, pageProps }) {
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
