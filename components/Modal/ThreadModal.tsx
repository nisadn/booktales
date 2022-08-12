import { FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { OutlineButton, PrimaryButton } from "../Button";
import { useForm } from 'react-hook-form';

type Category = {
    id: string;
    title: string;
}

interface IThreadModal {
    isOpen: any;
    onClose: any;
    isUpdate?: boolean;
    defaultTitle?: string;
    defaultCategory?: string;
    withStarter?: boolean;
    defaultStarter?: string;
}

const ThreadModal: React.FC<IThreadModal> = (props) => {
    const { isOpen, onClose, isUpdate, defaultTitle, defaultCategory, withStarter, defaultStarter } = props;

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ loadSubmit, setLoadSubmit ] = useState(false);

    const onSubmit = (data: any) => {
        // setLoadSubmit(true);
        console.log(data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='xl'>
            <ModalOverlay />
            <ModalContent px='4' py='2' textAlign='center'>
            <ModalHeader fontSize='lg' pb='1'>
                {isUpdate ? 'Update ' : 'Create '} Thread
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pt='0'>
            <FormControl isInvalid={errors.title !== undefined}>
                <FormLabel fontWeight={'semibold'}>Title</FormLabel>
                    <Input 
                        defaultValue={defaultTitle} 
                        placeholder='Insert title here' 
                        {...register("title", {
                            required: true, 
                            maxLength: 100
                        })} 
                    />
                    <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} 
                    isInvalid={errors.category !== undefined}
                >
                    <FormLabel fontWeight={'semibold'}>Category</FormLabel>
                    <Select
                        defaultValue={defaultCategory}
                        placeholder={isUpdate ? '' : 'Select category'}
                        {...register("category", {required: true})}
                    >
                        {categories.map((val: Category) => (
                            <option value={val.id} key={val.id}>{val.title}</option>
                        ))}
                    </Select>
                    <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>

                {!isUpdate || withStarter ? 
                    <FormControl mt={4} isInvalid={errors.starter_post !== undefined}>
                        <FormLabel fontWeight={'semibold'}>Starter Post</FormLabel>
                        <Textarea
                            defaultValue={defaultStarter}
                            placeholder='Write post here'
                            minHeight={['200px','200px','150px']}
                            {...register("starter_post", {required: true})}
                        />
                        <FormErrorMessage>This field is required</FormErrorMessage>
                    </FormControl>
                : <></>}
            </ModalBody>

            <ModalFooter justifyContent='center' gap='4'>
                <PrimaryButton px='10' type='submit' isLoading={loadSubmit} >{isUpdate ? 'Save' : 'Add'}</PrimaryButton>
                <OutlineButton px='10' onClick={onClose}>Cancel</OutlineButton>
            </ModalFooter>
            </form>
            </ModalContent>
        </Modal>
    )
}

export default ThreadModal;

const categories: Category[] = [{
    id: '1',
    title: "Fiction",
  },{
    id: '2',
    title: "Non-Fiction",
  },{
    id: '3',
    title: "Biography",
  },{
    id: '4',
    title: "Drama",
  },{
    id: '5',
    title: "Romance",
  },{
    id: '6',
    title: "Adventure",
  },{
    id: '7',
    title: "Scifi",
  },{
    id: '8',
    title: "Fantasy",
  }
]