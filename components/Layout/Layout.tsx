import { Flex } from "@chakra-ui/react"
import React from "react";
import { RightTab } from "../Container";
import SideBar from "./SideBar";

interface LayoutProps {
    children: any;
}

const Layout: React.FC<LayoutProps> = (props) => {
    const { children } = props;

    return (
        <Flex w='100vw'>
            <SideBar />
            <Flex w='full' ml='80px' mr='26vw' px='16' py='6' direction='column' >
                { children }
            </Flex>
            <RightTab />
        </Flex>
    )
}

export default Layout;