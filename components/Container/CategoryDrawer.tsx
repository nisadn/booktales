import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import React from "react";
import { RightContent } from "./RightTab";

interface DrawerProps {
    isOpen: any;
    onClose: any;
}

const CategoryDrawer: React.FC<DrawerProps> = (props) => {
    const { isOpen, onClose } = props;

    return (
        <Drawer onClose={onClose} isOpen={isOpen} size='full'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <RightContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    )
}

export default CategoryDrawer;