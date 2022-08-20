import { Flex, useToast } from "@chakra-ui/react"
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { RootState } from "../../redux/store";
import { RightTab } from "../Container";
import SideBar from "../Menu/SideBar";

interface LayoutProps {
    children: any;
    page: string;
}

const Layout: React.FC<LayoutProps> = (props) => {
    const { children, page } = props;
    const tokenExp = useSelector((state: RootState) => state.auth.token.exp);
    const dispatch = useDispatch();
    const toast = useToast();
    const router = useRouter();

    useEffect(() => {
        if (tokenExp * 1000 < Date.now()) {
          dispatch(logout());
          toast({
            title: "Your token is expired. Automatically logged out.",
            status: 'success',
            variant: 'left-accent',
            position: 'top',
            duration: 3000,
            isClosable: true,
          });
          router.push('/login');
        }
    }, []);

    return (
        <>
        <Head>
            <link rel="icon" type="image/png" href="/logo-squared.png" />
        </Head>
        <Flex w='screen' mb={[16,6,6]}>
            <SideBar page={page} />
            <Flex w='full' ml={[0,'80px','80px']} mr={[0,'26vw','26vw']} px={['4','6','16']} py='6' direction='column'>
                { children }
            </Flex>
            <RightTab />
        </Flex>
        </>
    )
}

export default Layout;