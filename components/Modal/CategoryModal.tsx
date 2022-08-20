import { FormControl, FormErrorMessage, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import React from "react";
import { OutlineButton, PrimaryButton } from "../Button";
import { useForm } from 'react-hook-form';
import { useMutation, UseMutationResult } from "react-query";
import { categoryApi } from "../../config/service/categoryApi";
import { useRouter } from "next/router";

type Category = {
    id: string;
    name: string;
}
interface ICategoryModal {
    isOpen: any;
    onClose: any;
    isUpdate?: boolean;
    defaultCategory?: Category;
}

type CategoryReq = {
    name: string;
}

type CategoryResp = CategoryReq & {
    id: string;
}

const CategoryModal: React.FC<ICategoryModal> = (props) => {
    const { isOpen, onClose, isUpdate, defaultCategory } = props;

    const { register, handleSubmit, formState: { errors } } = useForm();
    const toast = useToast();
    const router = useRouter();

    const postCategory = async (data: CategoryReq) => {
        let res: any;
        if (isUpdate) {
            res = await categoryApi.edit(data);
        } else {
            res = await categoryApi.create(data);
        }
        return res.data;
    } 

    const mutation: UseMutationResult<CategoryResp, Error, CategoryReq> = useMutation<CategoryResp, Error, CategoryReq>(postCategory, {
        onError: () => {
            toast({
                title: 'Category already exist',
                status: 'error',
                variant: 'left-accent',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
        },
        onSuccess: (res) => {
            toast({
                title: `Successfully ${isUpdate ? 'update' : 'create'} category ${res.name}`,
                variant: 'left-accent',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
        }
    })
    
    
    const onSubmit = (data: any) => {
        if (isUpdate) {
            data.id = defaultCategory?.id;
        }
        mutation.mutate(data);
    };

    if (mutation.isSuccess) {
        router.reload();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={['xs','sm','sm']}>
            <ModalOverlay />
            <ModalContent px='4' py='2' textAlign='center'>
            <ModalHeader fontSize='lg' pb='1'>
                Add Category
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pt='4'>
            <FormControl isInvalid={errors.name !== undefined}>
                <Input 
                    defaultValue={defaultCategory?.name}
                    placeholder='Insert new category here' 
                    {...register("name", {
                        required: true, 
                        maxLength: 100
                    })} 
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>
            </ModalBody>

            <ModalFooter justifyContent='center' gap='4'>
                <PrimaryButton px='10' type='submit' isLoading={mutation.isLoading} >{
                    isUpdate? 'Save' : 'Add'
                }</PrimaryButton>
                <OutlineButton px='10' onClick={onClose}>Cancel</OutlineButton>
            </ModalFooter>
            </form>
            </ModalContent>
        </Modal>
    )
}

export default CategoryModal;