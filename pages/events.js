import CoinGecko from 'coingecko-api'
const CoinGeckoClient = new CoinGecko()
import Head from "next/head";

export default function Events({data}) {
    console.log(data)
    return (
        <div>
        <Head>
            <title>CryptoWatch | Events</title>
            <meta name="description" content="A crypto tracker app to watch all the prices of the crypto markets" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" 
                integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossOrigin="anonymous"></link>
        </Head>
        <main>
        {JSON.stringify(data)}
        </main>
        <footer>
            <p>Made by Rens Gerritsen || <a href="https://github.com/RensG2005/cryptoWatch">Github</a> || I would appreciate it if you would give it a star</p>
        </footer>
    </div>
    )
}

export async function getServerSideProps() {
    try {
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