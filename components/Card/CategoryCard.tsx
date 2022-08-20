import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CustomIcon from "../Icon/CustomIcon";
import { CategoryModal, RemoveModal } from "../Modal";
import { BiEditAlt, BiTrash } from 'react-icons/bi';

type Category = {
    id: string;
    name: string;
}

const CategoryCard = ({category}: {category: Category}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen:isOpenEdit, onOpen:onOpenEdit, onClose:onCloseEdit } = useDisclosure();
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const role = useSelector((state: RootState) => state.auth.account.role);

    return (
        <Flex direction='column' p='6' boxShadow='md' borderRadius='md' gap='1' transition='0.3s'
            _hover={{
                bg: 'gray.100',
                transition: '0.3s',
            }}
        >
            <Flex justify='space-between'>
                <Box>
                    <Text fontWeight='semibold' fontSize='xl'>{category.name}</Text>
                </Box>
                <Flex gap='1' align='center' justify='flex-end'>
                    {isLogin && role === 'admin' && <>
                    <CustomIcon as={BiEditAlt} color='blue.500' activeCol="blue.700" ml='2' onClick={onOpenEdit} />
                    <CustomIcon as={BiTrash} color='red.500' activeCol="red.700" onClick={onOpen} /></>}
                    <CategoryModal isOpen={isOpenEdit} onClose={onCloseEdit} isUpdate defaultCategory={category} />
                    <RemoveModal isOpen={isOpen} onClose={onClose} object='category' id={category.id} />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default CategoryCard;