import '../styles/globals.css'
import Router from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/Header";

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
      offset: 10,
		});
	});

  return (
    <>
        <Header />
        <Component {...pageProps} />
    </>
  ) 
}

export default MyApp
