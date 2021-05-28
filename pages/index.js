import Head from 'next/head'
import Image from 'next/image'
import CoinGecko from 'coingecko-api'
const CoinGeckoClient = new CoinGecko()
import millify from "millify";
import dateFormat from 'dateformat'
import Link from 'next/link'
import ScrollToTop from 'react-scroll-to-top'
import Aos from 'aos'
import "aos/dist/aos.css"
import { useEffect } from "react"
import useWindowDimensions from "../hooks/useWindowsDimensions"

export default function Home({data}) {

  if (typeof window !== 'undefined') {
    // detect window screen width function
      const { height, width } = useWindowDimensions();
      console.log(height, width)
  }

  useEffect(() => {
    Aos.init({
      duration: 350,
      offset: 10,
      disable: 'mobile'
    })
  }, [])

  return (
    <div>
      <Head>
        <title>CryptoWatch | Home</title>
        <meta name="description" content="A crypto tracker app to watch all the prices of the crypto markets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <ScrollToTop smooth />
        <ul className="responsive-table"> 
          <li className="table-header">
            <div className="col col-1">#</div>
            <div className="col col-2">Name</div>
            <div className="col col-3">Price</div>
            <div className="col col-4">(24h)%</div>
            <div className="col col-5">(7d) %</div>
            <div className="col col-6">Market Cap</div>
            <div className="col col-7">Volume</div>
            <div className="col col-7">Last updated</div>
        </li>
              {data.map((coin, index) => {
                return (
                    <li className="table-row" key={coin.id} data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}>
                        <div className="col col-1" data-label="Index">{index+1}</div>
                        <div className="col col-2" data-label="Crypto Name">       
                          <Link href={`coin/${coin.id}`}>
                            <div className="coinlink" >
                              <Image src={coin.image.thumb} width={30} height={30} alt={coin.id} />
                              <h5>{coin.name}<span>{coin.symbol.toUpperCase()}</span></h5>
                            </div>
                          </Link> 
                        </div>
                  <div className="col col-3" data-label="Price: ">
                    ${coin.market_data.current_price.usd}
                  </div>
                  <div className={coin.market_data.price_change_percentage_24h >= 0 ? "col col-4 green" : "col col-4 red"} data-label="24h %: ">
                    {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                  </div>

                <div className={coin.market_data.price_change_percentage_7d >= 0 ? "col col-5 green" : "col col-5 red"} data-label="Payment Status">
                    {coin.market_data.price_change_percentage_7d.toFixed(2)}%
                </div>
                <div className="col col-6" data-label="Market Cap">
                    ${millify(coin.market_data.market_cap.usd, {
                      precision: 3
                    })}
                </div>
                <div className="col col-7" data-label="Total Volume">
                  {millify(coin.market_data.total_volume.usd, {
                    precision: 3
                  })}
                </div>
                <div className="col col-8" data-label="Last Updated">
                    {dateFormat(coin.last_updated,  "mmmm dS, yyyy, h:MM:ss TT").toString()}
                </div>
                </li>
          )}
          )} 
          </ul>
      </main> 

      <footer>
        <p>Made by Rens Gerritsen || <a href="https://github.com/RensG2005/cryptoWatch">Github</a></p>
      </footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    let data = await CoinGeckoClient.coins.all({
      localization: false,
      per_page: 150,
    });
      return {
        props: {
          data: data.data
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