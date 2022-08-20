import { Flex, Text, useToast } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading, ManageCategory } from "../../components/Container";
import Layout from "../../components/Layout/Layout";
import { axiosClient } from "../../config/apiClient";
import { RootState } from "../../redux/store";
import { get } from '../..//redux/features/category/categorySlice';
import { useRouter } from "next/router";
import { categoryApi } from "../../config/service/categoryApi";
import { useQuery, UseQueryResult } from "react-query";

type Category = {
    id: string;
    name: string;
}

const ManageCategoryPage = () => {
        
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const role = useSelector((state: RootState) => state.auth.account.role);
    const toast = useToast();
    const router = useRouter();

    const getCategories = async () => {
        const res = await categoryApi.getCategories();
        return res.data;
    }

    const { status, data, error }: UseQueryResult<Array<Category>, Error> = useQuery<Array<Category>, Error>('categories', getCategories); 

    const dispatch = useDispatch();
    useEffect(() => {
        if (status === 'success') {
            dispatch(get(data));
        }
    }, [data]);
    
    useEffect(() => {
        if (role !== 'admin' || !isLogin) {
            toast({
                title: "You don't have permission to access this page",
                status: 'error',
                variant: 'left-accent',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
            router.push('/');
        }
    }, []);

    return (
        <div>
            <Head>
                <title>Manage Category</title>
                <meta name="description" content="Admin settings for managing categories" />
            </Head>

            <Layout page='manage_category'>
                <Flex direction='column'>
                <Text as='span' fontSize={['3xl','4xl','4xl']} fontWeight='bold'>
                    Manage Category
                </Text>
                </Flex>
                {status === 'success' ? 
                    <ManageCategory categories={data} />
                : 
                    <Loading text='categories' />
                }
            </Layout>

        </div>
    )
}

export default ManageCategoryPage;