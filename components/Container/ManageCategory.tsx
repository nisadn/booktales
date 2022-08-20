import { Flex } from "@chakra-ui/react";
import CategoryCard from "../Card/CategoryCard";

type Category = {
    id: string;
    name: string;
}

const ManageCategory = ({categories}: {categories: Category[]}) => {;
    return (
        <Flex direction='column' mt='8' gap='10'>
            {categories ? 
                categories.map((val: Category) => (
                    <CategoryCard category={val} key={val.id} />
                )) 
            : <div>There is no category yet.</div>
            }
        </Flex>
    )
}

export default ManageCategory;