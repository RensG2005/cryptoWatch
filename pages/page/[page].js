import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import TableRowHomepage from "../../components/TableRowHomepage";
import ScrollToTop from "react-scroll-to-top";
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

function coin({data}) {

    let [arr, setArr] = useState([]);
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        setArr(JSON.parse(localStorage.getItem("watchlist")) || [])
      }
    }, [])

    
    return (
        <div>
            <Head>
            <title>Bitcoin Price Today</title>
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
                  <TableRowHomepage coin={coin} index={index} arr={arr} setArr={setArr} />
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
        const {page} = context.query
        let data = await CoinGeckoClient.coins.all({
            localization: false,
            per_page: 100,
            page: page
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
export default coin
