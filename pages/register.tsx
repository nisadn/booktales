import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Account } from "../components/Container";
import { RootState } from "../redux/store";

const RegisterPage = () => {
        
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const role = useSelector((state: RootState) => state.auth.account.role);
    const toast = useToast();
    const router = useRouter();

    useEffect(() => {
        if (isLogin) {
            toast({
                title: "You still logged in. Please logout first to register new user.",
                variant: 'left-accent',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
            router.push('/');
        }
    }, []);

    return (
        <Account isRegister />
    )
}

export default RegisterPage;