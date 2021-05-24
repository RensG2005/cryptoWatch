import React from 'react'
import Head from 'next/head'
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

function coin({data}) {
    return (
        <div>
            <Head>
            <title>Bitcoin Price Today</title>
            </Head>

            <main>
                <header>
                    <h1>{data.name}<span>{data.symbol}</span></h1>  
                </header>
                <p dangerouslySetInnerHTML={{ __html: data.description.en }}>
               
                </p>
                <section>
                    <h3>Socials</h3>
                    <ul>
                        {Object.keys(data.community_data).map((key, index) => {
                            if(data.community_data[key]) {
                                return <li>
                                    {Object.keys(data.community_data)[index]}: { data.community_data[key]}
                                </li>
                            } else {
                                return <li>
                                {Object.keys(data.community_data)[index]}: None
                            </li>
                            }
                        })}
                    </ul>
                </section>
            </main>
        </div>
    )
}

export async function getServerSideProps(context) {
    try {
        const {coin} = context.query
        let data = await CoinGeckoClient.coins.fetch(coin, {});
      return {
        props: {
          data: data.data
        }
      }
    } catch (err) {
      return {
        props: {
          data: {
            message: "an error occured"
          }
        }
      }
    }
  }
export default coin
