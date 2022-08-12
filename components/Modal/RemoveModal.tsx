import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React from "react";
import { OutlineButton, PrimaryButton } from "../Button";

interface IModal {
    isOpen: any;
    onClose: any;
}

const RemoveModal: React.FC<IModal> = (props) => {
    const { isOpen, onClose } = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent px='4' py='2' textAlign='center'>
            <ModalHeader fontSize='lg' pb='1'>
                Are you sure you want to delete this thread?
            </ModalHeader>
            <ModalBody pt='0'>
                It will also remove all the posts within this thread.
            </ModalBody>

            <ModalFooter justifyContent='center' gap='4'>
                <PrimaryButton px='10'>Yes</PrimaryButton>
                <OutlineButton px='10' onClick={onClose}>No</OutlineButton>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default RemoveModal;