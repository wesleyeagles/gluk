import { Box, Image, Stack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

// Icons Import //

import { AiFillHome } from 'react-icons/ai'

export const Aside = () => {
    return (
        <Box w='240px' h='100vh' bg='#2F3031' padding='24px' flex='none'>
            <Box display='flex' justifyContent='center'>
                <Link to='/'>
                <Image src='https://gluk.com.br/assets/images/xlogo-branca-455px.png.pagespeed.ic.ktQMK9G8_J.webp' alt='logo-branca'/>
                </Link>
            </Box>

            <Stack marginTop='20px'>
                <Link to='/'>
                <Box display='flex' alignItems='center' gap='6px'>
                    <AiFillHome color="#FFF" size={20}/>
                    <Text color='#FFF'>
                        Início
                    </Text>
                </Box>
                </Link>
                <Link to='/pdv'>
                <Box display='flex' alignItems='center' gap='6px'>
                    <AiFillHome color="#FFF" size={20}/>
                    <Text color='#FFF'>
                        PDV
                    </Text>
                </Box>
                </Link>
                <Link to='/clientes'>
                <Box display='flex' alignItems='center' gap='6px'>
                    <AiFillHome color="#FFF" size={20}/>
                    <Text color='#FFF'>
                        Clientes
                    </Text>
                </Box>
                </Link>
                <Link to='/produtos'>
                <Box display='flex' alignItems='center' gap='6px'>
                    <AiFillHome color="#FFF" size={20}/>
                    <Text color='#FFF'>
                        Produtos
                    </Text>
                </Box>
                </Link>
                <Link to='/categorias'>
                <Box display='flex' alignItems='center' gap='6px'>
                    <AiFillHome color="#FFF" size={20}/>
                    <Text color='#FFF'>
                        Categorias
                    </Text>
                </Box>
                </Link>
            </Stack>
        </Box>
    )
}