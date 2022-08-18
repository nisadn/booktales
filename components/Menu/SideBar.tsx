import { Divider, Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiEdit, BiLogInCircle, BiCategory, BiLogOutCircle } from 'react-icons/bi';
import MenuIcon from './MenuIcon';
import React from 'react';
import { useRouter } from 'next/router';
import { ThreadModal } from '../Modal';
import { StyledLogo } from '../StyledComponents/Styled';
import CategoryDrawer from '../Container/CategoryDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/features/auth/authSlice';

interface ISideBar {
    page: string;
}

const SideBar: React.FC<ISideBar> = (props) => {
    const { page } = props;
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen:isOpenDrawer, onOpen:onOpenDrawer, onClose:onCloseDrawer } = useDisclosure();
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const dispatch = useDispatch();
    const toast = useToast();

    return (
        <Flex py={[0,6,6]} px='4' boxShadow={['custom','base','base']} position='fixed' zIndex={3} 
            w={['100vw','80px','80px']} 
            h={['65px','100vh','100vh']}
            bg='white'
            direction={['row','column','column']} 
            bottom={[0,'auto','auto']}
        >
            <Flex w='full' h='10vh' pt='2'
                display={['none','block','block']}
                bottom={[0,'auto','auto']}
            >
                <StyledLogo />
            </Flex>
            <Flex 
                gap={[0,5,5]}
                mt={[0,10,10]}
                h='full'
                direction={['row','column','column']} 
                bottom={[0,'auto','auto']}
                w='full' align='center' 
            >
                <Flex justify={'center'} w='full' >
                    <MenuIcon icon={AiOutlineHome} label='Home' isActive={page === 'home'} onClick={() => router.push('/')}/>
                </Flex>
                <Divider display={['none','block','block']} />
                <Flex justify={'center'} w='full' >
                    <MenuIcon icon={BiEdit} label='Create Thread' 
                        onClick={isLogin ? onOpen : () => {
                            toast({
                                title: "You don't have permission for this feature",
                                status: "error",
                                variant: 'left-accent',
                                position: 'top',
                                duration: 3000,
                                isClosable: true,
                            });
                            router.push('/login');
                        }} 
                    />
                    <ThreadModal isOpen={isOpen} onClose={onClose} />
                </Flex>
            </Flex>
            <Flex w='full' justify='center' h={['full','10vh','10vh']} align='center' 
                justifyContent='space-between'
            >
                <Flex display={['block','none','none']} w='full' textAlign='center'>
                    <MenuIcon icon={BiCategory} label='Category' onClick={onOpenDrawer} />
                    <CategoryDrawer isOpen={isOpenDrawer} onClose={onCloseDrawer} />
                </Flex>
                <Flex w='full' justify='center'>
                    {isLogin ? 
                        <MenuIcon icon={BiLogOutCircle} label='Logout' color='red.600' onClick={() => {
                            dispatch(logout);
                            router.push('/login');
                        }} />
                    : 
                        <MenuIcon icon={BiLogInCircle} label='Login' color='blue.600' onClick={() => router.push('/login')} />
                    }
                </Flex>
            </Flex>
        </Flex>
    )
}

export default SideBar;