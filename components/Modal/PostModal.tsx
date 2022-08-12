import { FormControl, FormErrorMessage, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { OutlineButton, PrimaryButton } from "../Button";
import { useForm } from 'react-hook-form';

interface IPostModal {
    isOpen: any;
    onClose: any;
    defaultContent?: string;
    isUpdate?: boolean;
    isReply?: boolean;
}

const PostModal: React.FC<IPostModal> = (props) => {
    const { isOpen, onClose, defaultContent, isUpdate, isReply } = props;

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ loadSubmit, setLoadSubmit ] = useState(false);

    const onSubmit = (data: any) => {
        // setLoadSubmit(true);
        console.log(data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={['xs','lg','xl']}>
            <ModalOverlay />
            <ModalContent px='4' py='2' textAlign='center'>
            <ModalHeader fontSize='lg' pb='1'>
                {isUpdate ? 'Update' : isReply ? 'Reply' : 'Add'} Post
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pt='4'>
            <FormControl isInvalid={errors.content !== undefined}>
                <Textarea
                    defaultValue={defaultContent}
                    placeholder='Write here'
                    minHeight={['300px','200px','150px']}
                    {...register("content", {required: true})}
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>
            </ModalBody>

            <ModalFooter justifyContent='center' gap='4'>
                <PrimaryButton px='10' type='submit' isLoading={loadSubmit} >{isUpdate ? 'Save' : 'Post'}</PrimaryButton>
                <OutlineButton px='10' onClick={onClose}>Cancel</OutlineButton>
            </ModalFooter>
            </form>
            </ModalContent>
        </Modal>
    )
}

export default PostModal;