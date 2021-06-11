import React, { useState, useEffect  } from 'react';
import Head from 'next/head'
import ScrollToTop from "react-scroll-to-top";
const CoinGecko = require('coingecko-api');
import Link from 'next/link'
import TableRowHomepage from "../../components/TableRowHomepage";
const CoinGeckoClient = new CoinGecko();


function coin({data, page, reversedData}) {

  const [arr, setArr] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [reverse, setReverse] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setArr(JSON.parse(localStorage.getItem("watchlist")) || [])
    }
  }, [])

    useEffect(() => {
      if(reverse) setFilteredCoins(reversedData)
      else setFilteredCoins(data)
    }, [reverse])
  
    useEffect(() => {
      let timeoutId = setTimeout(() => {
        const regexp = new RegExp(filter, 'gi');
        console.log(reverse)
        setFilteredCoins(data.filter((coin) => {
            return coin.name.match(regexp) || coin.symbol.match(regexp);
        }));
        console.log(reverse)

      }, 500);
      return () => {
        clearTimeout(timeoutId);
      };
    }, [filter]);

    
    return (
        <div>
      <Head>
        <title>CryptoWatch | Page: {page}</title>
        <meta name="description" content="A crypto tracker app to watch all the prices of the crypto markets" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" 
              integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossOrigin="anonymous"></link>
      </Head>

            <main>
      <ScrollToTop smooth />
      <form className="filterForm" onSubmit={(e)=> e.preventDefault()}>
            <input type="text" className="filterInput" placeholder="Filter: e.g. Bitcoin" onChange={(e) => setFilter(e.target.value)} />
        </form>
        <ul className="responsive-table"> 
          <li className="table-header">
        <div className="col col-0"></div>
            <div className="col col-1">#
              <button className="sortBtn" onClick={()=>setReverse(!reverse)}>
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
                {filteredCoins.map((coin, index) => {
                    return (
                      <TableRowHomepage coin={coin} index={index + 100 * (page - 1)} arr={arr} setArr={setArr} key={coin.id} />
                    )}
            )} 
          </ul>
          <section className="pagesCount">
              {page === 1 ? "" : page  === 2 ? (<>
                  <Link href={`/page/${page - 1}`}>
                    <a>{page - 1}</a>
                  </Link></>) : (<>
                  <Link href="/page/1">1</Link>
                  <p>...</p>
                  <Link href={`/page/${page - 2}`}>
                    <a>{page - 2}</a>
                  </Link>
                  <Link href={`/page/${page - 1}`}>
                    <a>{page - 1}</a>
                  </Link>
                  </>)}
                  
                  <Link href={`/page/${page}`}>
                    <a className="active">{page}</a>
                  </Link>
                  
                  {page === 77 ? "" : page === 76 ? (<>
                  <Link href={`/page/${page + 1}`}>
                    <a>{page + 1}</a>
                  </Link>
                  </>)
                    :  (<><Link href={`/page/${page + 1}`}>
                    <a>{page + 1}</a>
                  </Link>
                  <Link href={`/page/${page + 2}`}>
                    <a>{page + 2}</a>
                  </Link>
                  <p>...</p>
                  <Link href="/page/77">77</Link>
                  </>)
                  }
          </section>
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
        if(page > 77 || page < 1) {
            return {
                redirect: {
                  destination: '/404',
                  permanent: false,
                },
              }
        }
        let data = await CoinGeckoClient.coins.all({
            localization: false,
            per_page: 100,
            page: page
          });

        let reversed = data.data.slice().reverse()
      return {
        props: {
          data: data.data,
          page: +page,
          reversedData: reversed
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
