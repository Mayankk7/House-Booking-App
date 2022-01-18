import React, { useState } from 'react'
import { Modal, Button, Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init(
    {
        duration:1000
    }
);

const Room = ({ room, fromdate, todate }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='row bs ' data-aos="fade-up" style={{backgroundColor:"white"}}>
            <div className='col-md-4'>
                <img src={room.imageurls[0]} className='smallimg' />
            </div>
            <div className='col-md-7'>
                <h1><b>{room.name}</b></h1>
                <p><b>Max Count :</b> {room.maxcount}</p>
                <p><b>Type :</b> {room.type}</p>

                <div style={{ float: "right" }}>

                    {(fromdate && todate) && (
                        <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                            <button className='btn btn-dark mx-2'>Book Now</button>
                        </Link>
                    )}
                    <button className='btn btn-dark' onClick={handleShow}>View Details</button>

                </div>
            </div>

            <Modal show={show} onHide={handleClose} size='lg' className='mx-3 mt-3' style={{transition:"0.5s", borderRadius:"5px"}} >
                <Modal.Header style={{backgroundColor:"#232b2b",borderRadius:"5px"}}>
                    <Modal.Title className='text-center' style={{color:"white"}}><b>{room.name}</b></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:"whitesmoke"}}>
                    <Carousel>
                        {
                            room.imageurls.map(url => {
                                return <Carousel.Item>
                                    <img
                                        className="d-block w-100 big-img"
                                        src={url}
                                    />

                                </Carousel.Item>
                            })
                        }
                    </Carousel>
                    <p className='mt-5' style={{color:"black"}}>{room.description}</p>
                </Modal.Body>
                    <Button variant="secondary" className='btn btn-dark' style={{float:"right"}} onClick={handleClose}>
                        Close
                    </Button>
            </Modal>
        </div>
    )
}

export default Room
