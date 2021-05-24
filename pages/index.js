import Head from 'next/head'
import Image from 'next/image'
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
import millify from "millify";
import dateFormat from 'dateformat'
import Link from 'next/link'

export default function Home({data}) {
  // const [scrollindex, setScrollIndex] = useState(100)
  // const handleScroll = () => {

  //   const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight

  //   if (bottom) {
  //     setScrollIndex(index + 100)
  //   }
  // };
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll, {
  //     passive: true
  //   });

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  

  return (
    <div>
      <Head>
        <title>CryptoWatch | Home</title>
        <meta name="description" content="A crypto tracker app to watch all the prices of the crypto markets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      {data.length > 0 ? (
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
                <li className="table-row" key={coin.id}>
                    <div className="col col-1" data-label="Crypto Index">{index+1}</div>
                    <div className="col col-2" data-label="Crypto Name">       
                      <Link href={`coin/${coin.id}`}>
                        <div className="coinlink" >
                          <Image src={coin.image.thumb} width={30} height={30} alt={coin.id} />
                          <h5>{coin.name}<span>{coin.symbol.toUpperCase()}</span></h5>
                        </div>
                      </Link> 
                    </div>
              <div className="col col-3" data-label="Amount">
                ${coin.market_data.current_price.usd}
              </div>
              <div className={coin.market_data.price_change_percentage_24h >= 0 ? "col col-4 green" : "col col-4 red"} data-label="Amount">
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%
              </div>

            <div className={coin.market_data.price_change_percentage_7d >= 0 ? "col col-5 green" : "col col-5 red"} data-label="Payment Status">
                {coin.market_data.price_change_percentage_7d.toFixed(2)}%
            </div>
            <div className="col col-6" data-label="Payment Status">
                ${millify(coin.market_data.market_cap.usd, {
                  precision: 3
                })}
            </div>
            <div className="col col-7" data-label="Payment Status">
              {millify(coin.market_data.total_volume.usd, {
                precision: 3
              })}
            </div>
            <div className="col col-8" data-label="Payment Status">
                {dateFormat(coin.last_updated,  "mmmm dS, yyyy, h:MM:ss TT").toString()}
            </div>
            </li>
          )}
          )} 
          </ul>
              ) : (
              <div className="loader">
                <div className="face">
                  <div className="circle"></div>
                </div>
                <div className="face">
                  <div className="circle"></div>
                </div>
            </div>
            )}
      </main> 

      <footer>
        <p>made by Rens Gerritsen</p>
      </footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
  let data = await CoinGeckoClient.coins.all({
    localization: false,
    per_page: 100
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