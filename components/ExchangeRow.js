import React, { Fragment } from 'react'
import millify from "millify";
import dateFormat from 'dateformat'
import Link from 'next/link'
import Image from 'next/image'


function TableRowHomepage({exchange, index}) {
    return (
        <Fragment key={exchange.id}>    
            <li className="table-row"  data-aos="fade-up">
                <div className="col col-1" data-label="Index">{index+1}</div>
                <div className="col col-2" data-label="Crypto Name">       
                    <Link href={`exchange/${exchange.id}`}>
                    <div className="coinlink" >
                        <Image src={exchange?.image} width={20} height={20} alt={exchange?.id} objectFit="fill" />
                        <h5>{exchange?.name}<span>{exchange?.id.toUpperCase()}</span></h5>
                    </div>
                    </Link>
                </div>
                <div className="col col-3" data-label="Year established: ">
                {exchange?.year_established ? exchange?.year_established : "Not Specified" }
                </div>
                <div className="col col-4" data-label="24h %: ">
                {exchange?.trust_score}
                </div>

            <div className="col col-5" data-label="Country">
                {exchange?.country ? exchange?.country : "Not Specified"}
            </div>
            <div className="col col-6" data-label="Trade volume (24h): ">
                {millify(exchange.trade_volume_24h_btc, {
                    precision: 3
                })}
            </div>
            <div className="col col-7" data-label="Link: ">
                {exchange?.url}
            </div>
            <div className="col col-8" data-label="Last Updated">
                {dateFormat(new Date(),  "mmmm dS, yyyy, h:MM").toString()}
            </div>
            </li>
        </Fragment>
    )
}

export default TableRowHomepage
