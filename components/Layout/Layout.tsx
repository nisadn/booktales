import { Flex } from "@chakra-ui/react"
import Head from "next/head";
import React from "react";
import { RightTab } from "../Container";
import SideBar from "../Menu/SideBar";

interface LayoutProps {
    children: any;
    page: string;
}

const Layout: React.FC<LayoutProps> = (props) => {
    const { children, page } = props;

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