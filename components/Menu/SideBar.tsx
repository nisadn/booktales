import { Divider, Flex, useDisclosure } from '@chakra-ui/react';
import styled from 'styled-components';
import { AiOutlineHome } from 'react-icons/ai';
import { BiEdit, BiLogInCircle } from 'react-icons/bi';
import MenuIcon from './MenuIcon';
import React from 'react';
import { useRouter } from 'next/router';
import { ThreadModal } from '../Modal';

interface ISideBar {
    page: string;
}

const SideBar: React.FC<ISideBar> = (props) => {
    const { page } = props;
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex w='80px' direction='column' py='6' px='4' h='100vh' boxShadow={'base'} position='fixed' zIndex={3} bg='white'>
            <Flex w='full' h='10vh' pt='2'>
                <StyledLogo />
            </Flex>
            <Flex gap='5' direction='column' h='full' mt='10'>
            <Flex justify={'center'}>
                <MenuIcon icon={AiOutlineHome} label='Home' isActive={page === 'home'} onClick={() => router.push('/')}/>
            </Flex>
            <Divider />
            <Flex justify={'center'}>
                <MenuIcon icon={BiEdit} label='Add Thread' onClick={onOpen} />
                <ThreadModal isOpen={isOpen} onClose={onClose} />
            </Flex>
            </Flex>
            <Flex w='full' h='10vh' justify='center' >
                <MenuIcon icon={BiLogInCircle} label='Login' color='red.600' />
            </Flex>
        </Flex>
    )
}

export default SideBar;

const StyledLogo = styled.div`
    background-image: url('/logo.png');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    width: 100%;
    height: 100%;
`