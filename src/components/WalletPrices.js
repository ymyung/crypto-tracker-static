import React from 'react'

import './WalletPrices.scss'

const WalletPrices = ({ myCoins, coins, openEdit, openDelete }) => {
    return (
        <div className='wallet-prices-container'>
            {myCoins && myCoins.map((coin, i) => (
                <div key={i} className="wallet-prices-subcontainer">
                    <img className="wallet-prices-coin" src={coin.image} alt="" />
                    <div className="wallet-prices-amount">{coin.amount}</div>
                    <div className="wallet-prices-value">${ (coin.amount * coins.find(item => item.id === coin.name).current_price).toLocaleString() }</div>
                    <div className="wallet-prices-overlay">
                        <button className='edit' onClick={() => openEdit(coin)}>edit</button>
                        <button className='delete' onClick={openDelete}>delete</button> 
                    </div>
                </div>
            ))}
        </div>
    )
}

export default WalletPrices 