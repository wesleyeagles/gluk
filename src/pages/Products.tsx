import { FormEvent } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Box, Button, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { Aside } from "../components/Aside/Aside"
import { Header } from "../components/Header/Header"
import { useDeleteProductMutation, useProductBySlugQuery, useProductsQuery } from "../graphql/generated"
import * as CurrencyFormat from 'react-currency-format';
import { CreateProduct } from './CreateProduct'
import { EditProduct } from './EditProduct'

// Icons Import //

import { MdDeleteForever } from 'react-icons/md'
import { TbEdit } from 'react-icons/tb'



export const Products = () => {

    const { isOpen: isProductOpen, onOpen: onProductOpen, onClose: onProductClose } = useDisclosure()
    const { isOpen: isProductEditOpen, onOpen: onProductEditOpen, onClose: onProductEditClose } = useDisclosure()

    const navigate = useNavigate()


    const { data, loading, error } = useProductsQuery({
        fetchPolicy: 'no-cache'
    })

    const { data: productBySlug, refetch } = useProductBySlugQuery({})

    const refecthBySlug = (e: any) => {
        refetch({
            id: e.currentTarget.id
        })
    }

    const [deleteProductMutation] = useDeleteProductMutation()

    const handleDelete = async (e: FormEvent) => {
        await deleteProductMutation({
            variables: {
                slug: e.currentTarget.id
            }
        })

        navigate(0)
    }

    if (!data && loading) {
        <div>
            Carregando
        </div>
    }


    return (
        <Box display='flex'>
        <Aside />
        <Box w='100%'>
        <Header>
            Produtos
        </Header>
        <Box paddingInline='32px' marginTop='32px'>
            <Button role='button' onClick={onProductOpen} bg='#343A40' _hover={{bg: '#23272b'}} color='#FFF'>
                Cria produto
            </Button>
        </Box>
        <Box paddingInline='32px' marginTop='32px'>
            <TableContainer>
                <Table>
                    <TableCaption>

                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Editar</Th>
                            <Th>Nome</Th>
                            <Th>Preço</Th>
                            <Th>Categoria</Th>
                            <Th textAlign='center'>Estoque</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.products.map(product => {
                            return (
                                <Tr>
                                    <Td display='flex' alignItems='center'>
                                        <TbEdit id={product.id!} onClick={(e) => {refecthBySlug(e); onProductEditOpen();} } size={22} color='orange' />
                                        <MdDeleteForever onClick={handleDelete} id={product.slug!} size={25} color='red'/>
                                    </Td>
                                    <Td>
                                       {product.name}
                                    </Td>
                                    <Td>
                                        <CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'R$ '} />
                                    </Td>
                                    <Td>
                                        {product.categories[0]?.name === undefined? 'Sem categoria' : product.categories[0].name}
                                    </Td>

                                    <Td textAlign='center'>
                                        {product.inventory}
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
           </Box>
         </Box>
         <CreateProduct OpenProduct={onProductOpen} CloseProduct={onProductClose} isModalOpenProduct={isProductOpen}/>
         <EditProduct data={productBySlug} OpenEditProduct={onProductEditOpen} CloseEditProduct={onProductEditClose} isModalOpenEditProduct={isProductEditOpen}/>
      </Box>
    )
}