import { Box, Button, Divider, Select, Text } from "@chakra-ui/react"
import _ from "lodash"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Aside } from "../components/Aside/Aside"
import { Header } from "../components/Header/Header"
import { useClientsQuery, useCreateShopMutation, useProductsQuery } from "../graphql/generated"

interface IProducts {
    id: string
    name: string
    price: string
}

interface IServerProducts {
    name: string
}


export const PDV = () => {

    const navigate = useNavigate()

    const { data } = useClientsQuery()

    const { data: productsData, loading, error } = useProductsQuery({
        fetchPolicy: 'no-cache'
    })

    const [clientEmail, setClientEmail] = useState('')

   

    const [products, setProducts] = useState<IProducts[]>([])
    const [serverProducts, setServerProducts] = useState<IServerProducts[]>([])
    const [total, setTotal] = useState(0)

    const putProduct = async (updatedValue: IProducts, updatedServerValue: IServerProducts, e: any) => {
        const id = e.target.id
        const name = e.target.name
        const price = e.target.value

        updatedValue = {
            "id": id, "name": name, "price": price
        }

        updatedServerValue = {
            "name": name
        }


        setProducts((products: IProducts[]) => [...products, updatedValue])
        setServerProducts((serverProducts: IServerProducts[]) => [...serverProducts, updatedServerValue])
        
   
    }

    useEffect(() => {
        setTotal(products.map(product => Number(product.price)).reduce((prev, curr) => prev + curr, 0))
    }, [products])

    const [createShopMutation] = useCreateShopMutation()

    const handleCreateShop = async () => {

        await createShopMutation({
            variables: {
                email: clientEmail,
                products: serverProducts,
                total: total
            }
        })

        navigate(0)
    }

    if (!data) {
        return (
            <div>
                Carregando....
            </div>
        )
    }

    return (
        <Box display='flex'>
            <Aside />
            <Box w='100%'>
                <Header>
                    Ponto de Venda
                </Header>
                <Box display='flex' justifyContent='space-between'>
                    <Box padding='32px'>
                        <Select onChange={(e) => setClientEmail(e.target.value)} placeholder="Selecione um cliente" marginBottom='60px'>
                            {data.clients.map(client => {
                                return (
                                    <option value={client.email}>{client.name}</option>
                                )
                            })}
                        </Select>
                        {productsData?.products.map(productData => {
                            return (
                                <Box marginBlock='12px' display='flex' alignItems='center' justifyContent='space-between' w='400px'>
                                    <Box> {productData.name} </Box>
                                    <Button onClick={(e) => putProduct(_,_, e)} id={productData.id} name={productData.name} value={productData.price}> Adicionar ao carrinho </Button>    
                                </Box>
                            )
                        })}
                    </Box>
                    <Box w='400px' h='87vh' bg='#2F3031' padding='32px' overflow='auto'>
                        <Text color='#FFF'>
                            Produtos
                        </Text>
                        <Divider marginBlock='12px'/>
                        <Box display='flex' flexDirection='column' justifyContent='space-between' h='90%'>
                        {products.map(product => {
                            return (
                                <Box key={product.id} display='flex' justifyContent='space-between'>
                                    <Box> <Text color='#FFF'> {product.name} </Text> </Box>
                                    <Box> <Text color='#FFF'> R$ {product.price} </Text> </Box>
                                </Box>
                            )
                        })}
                        <Box marginTop='auto' paddingTop='60px' display='flex' justifyContent='flex-end'>
                            <Text color='#FFF'>
                                Total: R$ {total}
                            </Text>
                        </Box>
                        <Button onClick={handleCreateShop} marginTop='12px'>
                            Efetuar compra
                        </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}