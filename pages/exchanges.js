import CoinGecko from 'coingecko-api'
const CoinGeckoClient = new CoinGecko()
import Head from "next/head";
import ScrollToTop from "react-scroll-to-top";
import ExchangeRow from "../components/ExchangeRow";

export default function watchlist({data}) {

    console.log(data)

    return (
        <div>
        <Head>
            <title>CryptoWatch | Exchanges</title>
            <meta name="description" content="A crypto tracker app to watch all the prices of the crypto markets" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" 
                integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossOrigin="anonymous"></link>
        </Head>
        <main>
        <ScrollToTop smooth />
        <ul className="responsive-table"> 
          <li className="table-header">
            <div className="col col-1">#
              <button className="sortBtn">
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
              {data.map((exchange, index) => {
                return (
                  <ExchangeRow exchange={exchange} index={index} />
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

export async function getServerSideProps() {
    try {
      let data = await CoinGeckoClient.exchanges.all();
        return { 
          props: {
            data: data.data,
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