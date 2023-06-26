'use client'
import { useForm } from "react-hook-form"
import { useState } from "react";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

const Profile = () => {

  const [userEmail, setUserEmail] = useState("")
  const [userPass, setUserPass] = useState("")
  const [openModal, setOpenModal] = useState(false)

  
  const schema = yup.object().shape({
    email: yup.string().email().required("Please insert proper email"),
    password: yup.string().min(4,).max(20).required(),
  })
  
  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(schema),
  });

  // close modal when bootstrap close form is clicked
  const closeModalForm = () => setOpenModal(false)


  const submitHandler = (e) => {
    event.preventDefault()
    setUserEmail(e.email)
    setUserPass(e.password)
    setOpenModal(true)
  };

  return (
    <main className="flex flex-col bg-slate-200 min-h-screen w-full p-24">
        <form className="flex flex-col w-full" onSubmit={handleSubmit(submitHandler)}>
          <div class="form-group my-2">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" {...register("email")}/>
            {errors.email &&
              <p className=" text-red-500">{errors.email?.message}</p>
            }
          </div>
          <div class="form-group my-2">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" {...register("password")}/>
            {errors.password &&
              <p className=" text-red-500">{errors.password?.message}</p>
            }
            
          </div>
          <button type="submit" class="btn btn-primary mt-3">Submit</button>
        </form>

        <Modal show={openModal} onHide={closeModalForm} centered>
          <Modal.Header closeButton>
            <Modal.Title>User Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              <ListGroup.Item>Email: {userEmail}</ListGroup.Item>
              <ListGroup.Item>Password: {userPass}</ListGroup.Item>
            </ListGroup>
          </Modal.Body>
        </Modal>
    </main>
  )
}

export default Profile