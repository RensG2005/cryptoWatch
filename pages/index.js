import Head from 'next/head'
import Image from 'next/image'
import CoinGecko from 'coingecko-api'
const CoinGeckoClient = new CoinGecko()
import millify from "millify";
import dateFormat from 'dateformat'
import Link from 'next/link'
import ScrollToTop from 'react-scroll-to-top'
import { Fragment, useState, useEffect } from "react";


export default function Home({data}) { 
  

  const [currentSort0, setCurrentSort0] = useState("default")
  const [currentSort1, setCurrentSort1] = useState("default")
  const [currentSort2, setCurrentSort2] = useState("default")
  const [currentSort3, setCurrentSort3] = useState("default")
  const [currentSort4, setCurrentSort4] = useState("default")
  const [currentSort5, setCurrentSort5] = useState("default")
  const [currentSort6, setCurrentSort6] = useState("default")
  const [currentSort7, setCurrentSort7] = useState("default")

  const onSortChange = (number) => {
    if (window["currentSort" + number] === 'down') window["setCurrentSort" + number]('up')
    else if (window["currentSort" + number] === 'up') window["setCurrentSort" + number]('default')
    else if (window["currentSort" + number] === 'default') window["setCurrentSort" + number]('down')
  };

  const sortTypes = {
    up: {
      class: 'sort-up',
      fn: (a, b) => a.id - b.id
    },
    down: {
      class: 'sort-down',
      fn: (a, b) => b.id - a.id
    },
    default: {
      class: 'sort',
      fn: (a, b) => a
    }
  };

  return (
    <div>
      <Head>
        <title>CryptoWatch | Home</title>
        <meta name="description" content="A crypto tracker app to watch all the prices of the crypto markets" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" 
              integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous"></link>
      </Head>
      <main>
      <ScrollToTop smooth />
        <ul className="responsive-table"> 
          <li className="table-header">
            <div className="col col-1">#
              <button onClick={onSortChange(0)} className="sortBtn">
                <i className={`fas fa-${sortTypes[currentSort0].class}`}></i>
              </button> 
            </div>
            <div className="col col-2">Name
            <button onClick={onSortChange(1)} className="sortBtn">
              <i className={`fas fa-${sortTypes[currentSort1].class}`}></i>
              </button> 
            </div>
            <div className="col col-3">Price 
            <button onClick={onSortChange(2)} className="sortBtn">
              <i className={`fas fa-${sortTypes[currentSort2].class}`}></i>
              </button> 
            </div>
            <div className="col col-4">(24h)% 
            <button onClick={onSortChange(3)} className="sortBtn">
            <i className={`fas fa-${sortTypes[currentSort3].class}`}></i>
            </button> 
            </div>
            <div className="col col-5">(7d) %
            <button onClick={onSortChange(4)} className="sortBtn">
             <i className={`fas fa-${sortTypes[currentSort4].class}`}></i>
             </button> 
             </div>
            <div className="col col-6">Market Cap 
            <button onClick={onSortChange(5)} className="sortBtn">
              <i className={`fas fa-${sortTypes[currentSort5].class}`}></i>
              </button> 
            </div>
            <div className="col col-7">Volume 
            <button onClick={onSortChange(6)} className="sortBtn">
              <i className={`fas fa-${sortTypes[currentSort6].class}`}></i>
              </button> 
            </div>
            <div className="col col-7">Last updated 
              <button onClick={onSortChange(7)} className="sortBtn">
              <i className={`fas fa-${sortTypes[currentSort7].class}`}></i>
              </button> 
            </div>
        </li>
              {[...data].sort(sortTypes[currentSort0].fn).map((coin, index) => {
                return (
                  <Fragment key={coin.id}>
                    <div>Favorite</div>
                    <li className="table-row"  data-aos="fade-up">
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
                    {dateFormat(coin.last_updated,  "mmmm dS, yyyy, h:MM").toString()}
                </div>
                </li>
                </Fragment>
          )}
          )} 
          </ul>
      </main> 

      <footer>
        <p>Made by Rens Gerritsen || <a href="https://github.com/RensG2005/cryptoWatch">Github</a> || I would appreciate it if you would give it a star</p>
      </footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    let data = await CoinGeckoClient.coins.all({
      localization: false,
      per_page: 100,
    });
      return { 
        props: {
          data: data.data
        }
      }
  } catch (err) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }
}