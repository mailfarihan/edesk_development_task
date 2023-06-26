'use client'

import { useState, useEffect } from 'react'
import MyTable from '/components/Table'
import List from '/components/List'
import ListGroup from 'react-bootstrap/ListGroup';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'

// import data from json file
import apiData from './api/data.json'
import treeData from './api/tree.json'

import Modal from 'react-bootstrap/Modal';


export default function Home() {

  const [openModal, setOpenModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const [userData, setUserData] = useState([])
  const [treeArray, setTreeArray] = useState([])
  const [filteredData, setFilteredData] = useState([])

  const [filter, setFilter] = useState({
    global: {value: null, matchMode: FilterMatchMode.CONTAINS}
  })

  // function to get data from api router
  const getData = async () =>{
    // In this function I try to assign array data fetch from json file (1 ---) or from mongoDB (2 ---). This case, I use mongoDB.

    // 1 --- Assign data from json file
    // setUserData(apiData.user)
    setTreeArray(treeData)

    // 2 --- Assign data from mongoDB using nextjs api router
    try {
      const res = await fetch(`/api/customers`)
      const data = await res.json()
      setUserData(data)
      setFilteredData(data)
    } catch (error) {
      console.log(error)
    }
  }

  // load data on componenet mount
  useEffect(() => {
    getData()
  }, [])
  

  // open modal based on user clicked
  const openModalForm = (e) =>{
    const showData = userData.filter((user)=> user._id === e)
    setModalData(showData[0])
    setOpenModal(true)
  }

  // close modal when bootstrap close form is clicked
  const closeModalForm = () => setOpenModal(false)

  // Filter data when click on tree
  const handleFilter = (e) =>{
    // filter original data from database based on city
    const filteredList = userData.filter((user)=> user.city === e)
    filteredList? (setFilteredData(filteredList)):(setFilteredData(userData))
  }

  // clear filter, show all data from database
  const clearFilter = () =>{
    setFilteredData(userData)
  }

  return (
    <main className="col bg-slate-200 min-h-screen w-5/6">
      <div className=' flex flex-col w-full xl:flex-row'>

        <section className='main__country-list p-5 col-4 sm:pl-5 sm:pr-1 w-full'>
          <button className=' bg-sky-500 text-gray-200 px-3 py-1 rounded-lg' onClick={clearFilter}>Show All</button>
          <div className='list-group list-group-root well mt-2'>
              <List data={treeArray} handleFilter={handleFilter}/>
          </div>
        </section>

        <section className='main__user-list w-full p-5 sm:pr-5 sm:pl-1'>
          <div className='flex justify-between mb-5'>
            <h3>Customer Details</h3>
            <span className="p-input-icon-left">
                <FontAwesomeIcon icon={faSearch} className='object-fit'/>
                <InputText placeholder="Search..." onInput={(e)=> setFilter({
                    global: {value: e.target.value, matchMode: FilterMatchMode.CONTAINS},
                })}/>
            </span>
          </div>
          
          <MyTable data={filteredData} handleClick={openModalForm} filter={filter}/>
        </section>

      </div>

      {/* Modal component from bootstrap */}
      <Modal show={openModal} onHide={closeModalForm} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item>Address: {modalData.address}</ListGroup.Item>
            <ListGroup.Item>City: {modalData.city}</ListGroup.Item>
            <ListGroup.Item>State: {modalData.state}</ListGroup.Item>
            <ListGroup.Item>Country: {modalData.country}</ListGroup.Item>
            <ListGroup.Item>Pin Code: {modalData.pincode}</ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      </Modal>
      

    </main>
  )
}
