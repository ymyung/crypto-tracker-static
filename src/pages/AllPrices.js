import React, { useEffect, useState } from 'react'

import CoinPrices from '../components/CoinPrices'

import './AllPrices.scss'

const AllPrices = () => {
    const [coins, setCoins] = useState([])

    // get coins on render
    useEffect(() => {
        const getCoins = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')

                const data = await response.json()

                // if request gets denied return nothing to maintain coins list
                if (data.length === 0) {
                    return
                } else {
                    setCoins(data)
                }
            } catch(error) {   
                throw error
            }
        }

        getCoins()
    }, [])
    console.log(coins)

    return (
        <div className='all-prices'>
            <div className="coins-container">
                <CoinPrices coins={coins} />
            </div>
        </div>
    )
}

export default AllPrices 