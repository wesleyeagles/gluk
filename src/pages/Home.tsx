import { Box, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Aside } from "../components/Aside/Aside"
import { Header } from "../components/Header/Header"
import { useClientsQuery, useShopsQuery } from "../graphql/generated"
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export const Home = () => {

    const [totalSellings, setTotalSellings] = useState<undefined | number>()
    
    const { data } = useClientsQuery()
    const { data: shopData } = useShopsQuery()

    useEffect(() => {
        setTotalSellings(data?.clients.map(client => client.shops.length).reduce((prev, curr) => prev + curr, 0))
    }, [data])

    if (!data) {
        return (
            <div>
                Carregando...
            </div>
        )
    }

    return (
        <>
        <Box display='flex'>
            <Aside />
            <Box w='100%'>
                <Header>
                    Dashboard
                </Header>
                <Box padding='32px'>
                    <Box w='100%' h='360px' boxShadow='0px 4px 15px 0px #00000030' borderRadius='5px'>
                        <Heading textAlign='center' paddingTop='16px' marginBottom='32px'>
                            Ultimas vendas
                        </Heading>
                        <TableContainer>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>Cliente</Th>
                                        <Th>Data</Th>
                                        <Th>Produtos</Th>
                                        <Th>Quantidade</Th>
                                        <Th>Total R$</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {shopData?.shops.map(shop => {
                                        return (
                                            <Tr>
                                                <Td>{shop.client?.name}</Td>
                                                <Td>{format(parseISO(shop.createdAt), "d/M ' - ' k'h'mm", { locale: ptBR })}</Td>
                                                <Td display='flex' gap='6px' flexDirection='column'>{shop.products.map(product => {
                                                    return (
                                                        <Text>
                                                            {product.name}
                                                        </Text>
                                                    )
                                                })}</Td>
                                                <Td>{shop.products.length}</Td>
                                                <Td>R$ {shop.total}</Td>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>

                    <Box w='200px' h='120px' boxShadow='0px 4px 15px 0px #00000030' borderRadius='5px' marginTop='20px'>
                        <Text textAlign='center' paddingTop='16px'>
                            Total de Vendas
                        </Text>
                        <Heading textAlign='center' marginTop='16px'>
                            {totalSellings}
                        </Heading>
                    </Box>
                </Box>
            </Box>
        </Box>
        </>
    )
}