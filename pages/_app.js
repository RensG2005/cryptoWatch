import '../styles/globals.css'
import Router from 'next/router'
import NProgress from 'nprogress'
import { useLayoutEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()


function MyApp({ Component, pageProps }) {
  useLayoutEffect(() => {
    document.documentElement.lang = 'en-us'
    AOS.init({
      delay: 90,
			duration: 400,
      offset: 10,
		});
    AOS.refresh()
	}, []);

  return (
    <>
        <Component {...pageProps} />
    </>
  ) 
}

export default MyApp
