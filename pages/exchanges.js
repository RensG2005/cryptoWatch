import CoinGecko from 'coingecko-api'
const CoinGeckoClient = new CoinGecko()
import Head from "next/head";
import { useEffect, useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import ExchangeRow from "../components/tablerows/ExchangeRow";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Exchange({data, reversed}) {
  const [reverse, setReverse] = useState(false)
  const [filteredData, setFilterdData] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    if(reverse) {
      setFilterdData(reversed)
      return 0
    }
    setFilterdData(data)
  }, [reverse])

    useEffect(() => {
    let timeoutId = setTimeout(() => {
      const regexp = new RegExp(filter, 'gi')
      setFilterdData(data.filter((exchange) => {
        return exchange.name.match(regexp) || exchange.id.match(regexp)
      }));
    }, 500)
    return () => {
      clearTimeout(timeoutId);
    };
  }, [filter]);


    return (
        <div>
        <Head>
            <title>CryptoWatch | Exchanges</title>
            <meta name="description" content="A crypto tracker app to watch all the prices of the crypto markets" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" 
                integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossOrigin="anonymous"></link>
        </Head>

        <Header setFilter={setFilter} />
        <main>
        <ScrollToTop smooth />


        <ul className="responsive-table"> 
          <li className="table-header">
            <div className="col col-1">#
              <button className="sortBtn" onClick={()=>setReverse(!reverse)} name="sortButton">
                <i className="fas fa-sort"></i>
              </button> 
            </div>
            <div className="col col-2">Name:</div>
            <div className="col col-3">Year Established </div>
            <div className="col col-4">Trust Score </div>
            <div className="col col-5">Country</div>
            <div className="col col-6">Trade Volume(24h) </div>
            <div className="col col-7">Link to site </div>
            <div className="col col-7">Last updated </div>
            
        </li>
              {filteredData.map((exchange, index) => {
                return (
                  	<ExchangeRow exchange={exchange} index={index} />
                  )}
              )} 

          </ul>
        </main>
          <Footer />
    </div>
    )
}

export async function getServerSideProps() {
    try {
      let data = await CoinGeckoClient.exchanges.all();
      let reversed = data.data.slice().reverse()
        return { 
          props: {
            data: data.data,
            reversed: reversed
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
