import Head from 'next/head'
import CoinGecko from 'coingecko-api'
const CoinGeckoClient = new CoinGecko()
import ScrollToTop from 'react-scroll-to-top'
import { useEffect, useState } from "react";
import TableRowHomepage from "../components/TableRowHomepage";
import Link from "next/link";


export default function Home({data}) { 
  let [arr, setArr] = useState([]);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setArr(JSON.parse(localStorage.getItem("watchlist")) || [])
    }
  }, [])
     
  return (
    <div>
      <Head>
        <title>CryptoWatch | Home</title>
        <meta name="description" content="A crypto tracker app to watch all the prices of the crypto markets" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" 
              integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossOrigin="anonymous"></link>
      </Head>
      <main>
      <ScrollToTop smooth />
        <ul className="responsive-table"> 
          <li className="table-header">
            <div className="col col-0"></div>
            <div className="col col-1">#
              <button className="sortBtn">
                <i className="fas fa-sort"></i>
              </button> 
            </div>
            <div className="col col-2">Name</div>
            <div className="col col-3">Price </div>
            <div className="col col-4">(24h)%  </div>
            <div className="col col-5">(7d) %</div>
            <div className="col col-6">Market Cap </div>
            <div className="col col-7">Volume </div>
            <div className="col col-7">Last updated </div>
            
        </li>
              {data.map((coin, index) => {
                return (
                  <TableRowHomepage coin={coin} index={index} arr={arr} setArr={setArr} key={coin.id} />
                )}
          )} 
          </ul>
          <section className="pagesCount">
                  <Link href="#">
                    <a className="active">1</a>
                  </Link>
                  <Link href="/page/2">2</Link>
                  <Link href="/page/3">3</Link>
                  <Link href="/page/4">4</Link>
                  <Link href="/page/5">5</Link>
                  <p>...</p>
                  <Link href="/page/77">77</Link>
          </section>
      </main> 

      <footer>
        <p>Made by Rens Gerritsen</p>
          <a target="_blank" href="https://github.com/RensG2005/cryptoWatch">Github</a>
          <p>I would appreciate it if you would give it a star</p>
      </footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    let data = await CoinGeckoClient.coins.all({
      localization: false,
      per_page: 100,
      page: 1
    });


      return { 
        props: {
          data: data.data,
          page: 1
        }
      }
  } catch (err) {
    console.log(err)
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }
}