import { Modal, Button } from "react-bootstrap";
import React from "react";

export function DisplayMessage({
    show,
    handleClose,
    header,
    message
}: {
    show: boolean;
    handleClose: () => void;
    header: string;
    message: string;
}): JSX.Element {
    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                animation={true}
                fade={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message}
                    <br></br>
                    <br></br>
                    <div style={{ textAlign: "right" }}>
                        <Button onClick={handleClose}>Close</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
