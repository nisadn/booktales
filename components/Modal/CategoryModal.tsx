import { FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React, { useState } from "react";
import { OutlineButton, PrimaryButton } from "../Button";
import { useForm } from 'react-hook-form';

interface ICategoryModal {
    isOpen: any;
    onClose: any;
}

const CategoryModal: React.FC<ICategoryModal> = (props) => {
    const { isOpen, onClose } = props;

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ loadSubmit, setLoadSubmit ] = useState(false);

    const onSubmit = (data: any) => {
        // setLoadSubmit(true);
        console.log(data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='sm'>
            <ModalOverlay />
            <ModalContent px='4' py='2' textAlign='center'>
            <ModalHeader fontSize='lg' pb='1'>
                Add Category
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pt='4'>
            <FormControl isInvalid={errors.title !== undefined}>
                <Input 
                    placeholder='Insert new category here' 
                    {...register("title", {
                        required: true, 
                        maxLength: 100
                    })} 
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>
            </ModalBody>

            <ModalFooter justifyContent='center' gap='4'>
                <PrimaryButton px='10' type='submit' isLoading={loadSubmit} >Add</PrimaryButton>
                <OutlineButton px='10' onClick={onClose}>Cancel</OutlineButton>
            </ModalFooter>
            </form>
            </ModalContent>
        </Modal>
    )
}

export default CategoryModal;