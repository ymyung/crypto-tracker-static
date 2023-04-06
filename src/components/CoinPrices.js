import React from 'react'

import './CoinPrices.scss'

const CoinPrices = ({ coins }) => {
  return (
    <div className='coin-prices-container'>
        {coins.length !== 0 ? coins.map((coin, i) => (
            <div className="coin-container" key={i}>
                <div className="coin-left-container">
                    <img src={coin.image} alt={coin.name} className="coin-image" />
                    <div className='coin-name'>{coin.name}</div>
                </div>
                <div className="coin-right-container">
                    <div className="coin-price">{coin.current_price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: coin.current_price < 1 ? 6 : 2
                    })}</div>
                </div>
            </div>
        )) : <div>Please wait 1 minute for crypto api</div>}
    </div>
  )
}

export default CoinPrices