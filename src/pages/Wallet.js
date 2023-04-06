import React, { useState, useEffect } from 'react'

import WalletPrices from '../components/WalletPrices'

import './Wallet.scss'

const Wallet = () => {
    // all coins
    const [coins, setCoins] = useState([])
    const [myCoins, setMyCoins] = useState([])

    // post request coin values
    const [selectedId, setSelectedId] = useState('')
    const [selectedCoin, setSelectedCoin] = useState(undefined)
    const [countAmount, setCoinAmount] = useState(undefined)

    // modal
    const [modal, setModal] = useState('modal')
    const [editModal, setEditModal] = useState('edit-modal')
    const [deleteModal, setDeleteModal] = useState('delete-modal')
    const [editAmount, setEditAmount] = useState(0)
    const [currentCoinId, setCurrentCoinId] = useState('')
    const [patchDelete, setPatchDelete] = useState({})

    // get coins on render
    useEffect(() => {
        const getCoins = async () => {
            try {
                // get all coins
                const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
                const data = await response.json()

                setCoins(data)

                // get my coins
                const response2 = await fetch('http://localhost:4000/wallet/')
                const data2 = await response2.json()

                setMyCoins(data2)
            } catch(error) {   
                throw error
            }
        }

        getCoins()
    }, [patchDelete])

    // get coin info from selectedId
    useEffect(() => {
        setSelectedCoin(coins.filter(coin => coin.id === selectedId))
    }, [selectedId, countAmount, coins])

    // handle added coin
    const handleAddCoin = (e) => {
        e.preventDefault()

        const handleSubmit = async () => {
            try {
                // add to wallet
                const requestBody = {}
                requestBody.name = selectedId
                requestBody.image = selectedCoin[0].image
                requestBody.amount = countAmount

                await fetch('http://localhost:4000/wallet/', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(requestBody)
                })

                // update my coins
                const response2 = await fetch('http://localhost:4000/wallet/')
                const data2 = await response2.json()

                setMyCoins(data2)
            } catch(error) {
                throw error
            }
        }

        handleSubmit()

        setSelectedId('')
        setSelectedCoin(undefined)
        setCoinAmount(undefined)
    }

    // handle edit modal
    const openEdit = (coin) => {
        setModal('modal modal-open')
        setEditModal('edit-modal edit-modal-open')
        setEditAmount(coin.amount)
        setCurrentCoinId(coin._id)
    }

    // handle delete modal 
    const openDelete = () => {
        setModal('modal modal-open')
        setDeleteModal('delete-modal delete-modal-open')
    }

    // close modal
    const closeModal = () => {
        setModal('modal')
        setEditModal('edit-modal')
        setDeleteModal('delete-modal')
    }

    // handle edit submit
    const handleEditCoin = (e) => {
        e.preventDefault()

        const patchRequest = async () => {
            const responseBody = {}
            responseBody.amount = editAmount

            try {
                const response = await fetch(`http://localhost:4000/wallet/${currentCoinId}`, {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(responseBody)
                })

                const data = await response.json()

                setPatchDelete(data)
            } catch (error) {
                throw error
            }
        }

        patchRequest()

        setModal('modal')
        setEditModal('edit-modal')
        setDeleteModal('delete-modal')
    }

    const handleDeleteCoin = (e) => {
        e.preventDefault()

        const handleDelete = async () => {
            try {
                const response = await fetch(`http://localhost:4000/wallet/${currentCoinId}`, {
                    method: 'DELETE'
                })

                const data = await response.json()

                setPatchDelete(data)
            } catch(error) {
                throw error
            }
        }

        handleDelete()

        setModal('modal')
        setEditModal('edit-modal')
        setDeleteModal('delete-modal')
    } 

    return (
        <div className='wallet'>
            <form className="add-coin" onSubmit={(e) => handleAddCoin(e)}>
                <select className='add-coin-select' name="" id="" onChange={(e) => setSelectedId(e.target.value)} value={selectedId} required>
                    <option value="" disabled>Select One</option>
                    {coins && coins.map((coin, i) => (
                        <option key={i} value={coin.id}>{coin.name}</option>
                    ))}
                </select>
                <input type="text" className="add-coin-amount" placeholder='amount' required onChange={(e) => setCoinAmount(e.target.value)} />
                <button className='add-coin-button'>Add</button>
            </form>
            <div className="wallet-container">
                <div className="wallet-container-top">
                    <div className='wallet-top-left'>Coin</div>
                    <div className='wallet-top-middle'>amount</div>
                    <div className='wallet-top-right'>value</div>
                </div>
                <WalletPrices myCoins={myCoins} coins={coins} openEdit={openEdit} openDelete={openDelete} /> 
            </div>
            <div className="modal-container">
                <div className={modal} onClick={closeModal}></div>
                <form className={editModal} onSubmit={(e) => handleEditCoin(e)}>
                    <div className="edit-container">
                        <div>Amount:</div>
                        <input type="text" required onChange={(e) => setEditAmount(e.target.value)} value={editAmount} />
                    </div>
                    <div className="button-containers">
                        <button onClick={closeModal}>Discard</button>
                        <button className='edit'>Save Changes</button>
                    </div>
                </form>
                <form className={deleteModal} onSubmit={(e) => handleDeleteCoin(e)}>
                    <div className='delete-modal-title'>Delete Coins?</div>
                    <div className="button-containers">
                        <button onClick={closeModal}>No</button>
                        <button className='delete'>Delete</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Wallet