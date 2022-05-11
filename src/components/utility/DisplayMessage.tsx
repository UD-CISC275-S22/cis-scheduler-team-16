import { Modal, Button } from "react-bootstrap";
import React from "react";

export function DisplayMessage({
    show,
    handleClose,
    message
}: {
    show: boolean;
    handleClose: () => void;
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
                    <Modal.Title>Action Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Successfully added {message} to your plan!
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="button"
                        className="btn btn-success"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
