import CoinGecko from 'coingecko-api'
import { Fragment, useEffect, useState } from "react";
const CoinGeckoClient = new CoinGecko()
import Link from 'next/link'
import Image from 'next/image'
import millify from "millify";
import dateFormat from 'dateformat'
import Head from "next/head";

export default function watchlist() {

    const [data, setData] = useState([])
    const [noData, setNoData] = useState(false)
    const [arr, setArr] = useState(false)

    let getData;

    if (typeof window !== 'undefined') {
        let tickers = JSON.parse(localStorage.getItem("watchlist")) || []

        getData = async () => {
            if(tickers.length > 0) {
                let favoritesData = []
                for(let i = 0; i<tickers.length; i++) {
                    let coinData = await CoinGeckoClient.coins.fetch(tickers[i], {
                        localization: false
                    })
                    favoritesData.push(coinData.data)
                }
                setData(favoritesData)
            } else {
                setNoData(true)
            }
        }
        
        useEffect(async () => {
            await getData()
        }, [localStorage.getItem("watchlist")])
        
    }
    
    const deleteFavorite = ({id}) => {
        let favos = JSON.parse(localStorage.getItem('watchlist')) || []

        if(favos.length > 0) {
            let filtered = favos.filter(value => {
                console.log(value, id)
                return value !== id
            })
            localStorage.setItem("watchlist", JSON.stringify(filtered))
            getData()
        } else {
            setData(true)
        }
    }
    

    return (
        <div>
        <Head>
            <title>CryptoWatch | Favorites</title>
            <meta name="description" content="A crypto tracker app to watch all the prices of the crypto markets" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" 
                integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossOrigin="anonymous"></link>
        </Head>
        <main>
        <ul className="responsive-table"> 
            {data.length > 0 && <li className="table-header">
            <div className="col col-0"></div>
            <div className="col col-1">#
              <button className="sortBtn">
                <i className="fas fa-sort"></i>
              </button> 
            </div>
            <div className="col col-2">Name
            <button className="sortBtn">
              <i className="fas fa-sort"></i>
              </button> 
            </div>
            <div className="col col-3">Price 
            <button className="sortBtn">
              <i className="fas fa-sort"></i>
              </button> 
            </div>
            <div className="col col-4">(24h)% 
            <button className="sortBtn">
            <i className="fas fa-sort"></i>
            </button> 
            </div>
            <div className="col col-5">(7d) %
            <button className="sortBtn">
             <i className="fas fa-sort"></i>
             </button> 
             </div>
            <div className="col col-6">Market Cap 
            <button className="sortBtn">
              <i className="fas fa-sort"></i>
              </button> 
            </div>
            <div className="col col-7">Volume 
            <button className="sortBtn">
              <i className="fas fa-sort"></i>
              </button> 
            </div>
            <div className="col col-7">Last updated 
              <button className="sortBtn">
              <i className="fas fa-sort"></i>
              </button> 
            </div>
        </li>}
 
              {data.length > 0 ? data.map((coin, index) => {
                return (
                  <Fragment key={coin.id}>
                    <li className="table-row"  data-aos="fade-up">
                        <div className="col col-0" onClick={() => deleteFavorite({id: coin.id})}><i className="fas fa-star"></i></div>
                        <div className="col col-1" data-label="Index">{index+1}</div>
                        <div className="col col-2" data-label="Crypto Name">       
                          <Link href={`coin/${coin.id}`}>
                            <div className="coinlink" >
                              <Image src={coin.image.thumb} width={30} height={30} alt={coin.id} />
                              <h5>{coin?.name}<span>{coin?.symbol.toUpperCase()}</span></h5>
                            </div>
                          </Link> 
                        </div>
                  <div className="col col-3" data-label="Price: ">
                    ${coin?.market_data.current_price?.usd}
                  </div>
                  <div className={coin.market_data.price_change_percentage_24h >= 0 ? "col col-4 green" : "col col-4 red"} data-label="24h %: ">
                    {coin?.market_data.price_change_percentage_24h?.toFixed(2)}%
                  </div>

                <div className={coin.market_data.price_change_percentage_7d >= 0 ? "col col-5 green" : "col col-5 red"} data-label="Payment Status">
                    {coin?.market_data.price_change_percentage_7d?.toFixed(2)}%
                </div>
                <div className="col col-6" data-label="Market Cap">
                    ${millify(coin?.market_data.market_cap?.usd, {
                      precision: 3
                    })}
                </div>
                <div className="col col-7" data-label="Total Volume">
                  {millify(coin?.market_data.total_volume?.usd, {
                    precision: 3
                  })}
                </div>
                <div className="col col-8" data-label="Last Updated">
                    {dateFormat(coin.last_updated,  "mmmm dS, yyyy, h:MM").toString()}
                </div>
                </li>
                </Fragment>
          )}
          ) : !noData ? <div className="loader"><div className="lds-ripple"><div></div><div></div></div></div> : <div className="loader"><h3>No favorites yet</h3></div>} 
          </ul>
          </main>
          <footer>
            <p>Made by Rens Gerritsen || <a href="https://github.com/RensG2005/cryptoWatch">Github</a> || I would appreciate it if you would give it a star</p>
          </footer>
        </div>
    )
}