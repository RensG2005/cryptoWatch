import React, { Fragment } from 'react'
import millify from "millify";
import dateFormat from 'dateformat'
import Link from 'next/link'
import Image from 'next/image'


function TableRowHomepage({coin, index, arr, setArr}) {

    
  async function favorite({id}) {
    //adds or removes clicked coin to favorites array in localstorage
    let favorites = JSON.parse(localStorage.getItem("watchlist")) || []

    console.log(favorites, arr)

    favorites.includes(id) ? favorites = favorites.filter(coinId => coinId !== id)  : favorites.push(id)
    console.log(favorites, arr)
    await setArr(favorites)
    console.log(favorites, arr)

    localStorage.setItem("watchlist", JSON.stringify(favorites))
  }


    return (
        <Fragment key={coin.id}>    
            <li className="table-row"  data-aos="fade-up">
                <div className="col col-0" onClick={() => {favorite({id: coin.id})}}>
                    <i className={arr.includes(coin.id) ? "fas fa-star" : "far fa-star"}></i>
                </div>
                    
                <div className="col col-1" data-label="Index">{index+1}</div>
                <div className="col col-2" data-label="Crypto Name">       
                    <Link href={`coin/${coin.id}`}>
                    <div className="coinlink" >
                        <Image src={coin?.image?.thumb} width={20} height={20} alt={coin?.id} objectFit="fill" />
                        <h5>{coin?.name}<span>{coin?.symbol.toUpperCase()}</span></h5>
                    </div>
                    </Link>
                </div>
                <div className="col col-3" data-label="Price: ">
                ${coin?.market_data?.current_price?.usd}
                </div>
                <div className={coin.market_data.price_change_percentage_24h >= 0 ? "col col-4 green" : "col col-4 red"} data-label="24h %: ">
                {coin.market_data?.price_change_percentage_24h?.toFixed(2)}%
                </div>

            <div className={coin.market_data.price_change_percentage_7d >= 0 ? "col col-5 green" : "col col-5 red"} data-label="Payment Status">
                {coin.market_data?.price_change_percentage_7d?.toFixed(2)}%
            </div>
            <div className="col col-6" data-label="Market Cap">
                ${millify(coin.market_data.market_cap.usd, {
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
    )
}

export default TableRowHomepage
