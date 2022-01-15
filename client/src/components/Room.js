import React, { useState } from 'react'
import { Modal, Button, Carousel } from "react-bootstrap"
const Room = ({ room }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='row bs'>
            <div className='col-md-4'>
                <img src={room.imageurls[0]} className='smallimg' />
            </div>
            <div className='col-md-7'>
                <h1>{room.name}</h1>
                <b><p>Max Count : {room.maxcount}</p>
                    <p>Phone Number : {room.phonenumber}</p>
                    <p>Type : {room.type}</p></b>

                <div style={{ float: "right" }}>
                    <button className='btn btn-dark' onClick={handleShow}>View Details</button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                    <p className='mt-5'>{room.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Room
