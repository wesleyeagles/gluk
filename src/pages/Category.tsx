import { FormEvent } from 'react'
import { Box, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Aside } from "../components/Aside/Aside"
import { Header } from "../components/Header/Header"
import { useCategoryByNameQuery, useDeleteProductMutation } from "../graphql/generated"
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

// Icons Import //

import { MdDeleteForever } from 'react-icons/md'
import { TbEdit } from 'react-icons/tb'

export const Category = () => {

    const navigate = useNavigate()
    const { name } = useParams<{name: string | undefined}>()
    const [deleteProductMutation] = useDeleteProductMutation()

    const { data } = useCategoryByNameQuery({
        variables: {
            name: name?.charAt(0).toUpperCase() + name!.slice(1)
        }
    })

    const handleDelete = async (e: FormEvent) => {
        await deleteProductMutation({
            variables: {
                slug: e.currentTarget.id
            }
        })

        navigate(0)
    }



    if (!data) {
    return (
        <div>
            Carregando
        </div>
      )
    }

    return (
        <Box display='flex'>
            <Aside />
            <Box w='100%'>
                <Header>
                    {data.category?.name}
                </Header>
                <Box paddingInline='32px' marginTop='32px'>
                    <TableContainer>
                        <Table>
                            <TableCaption>

                            </TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>
                                        Editar
                                    </Th>
                                    <Th>
                                        Nome
                                    </Th>
                                    <Th>
                                        Preço
                                    </Th>

                                    <Th>
                                        Adicionado em
                                    </Th>

                                    <Th textAlign='center'>
                                        Estoque
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.category?.products.map(product => {
                                    return (
                                        <Tr>
                                            <Td display='flex' alignItems='center' gap='2px'>
                                            <Link to={`/produtos/${product.slug}`}> 
                                            <TbEdit size={22} color='orange' />
                                            </Link>
                                            <MdDeleteForever onClick={handleDelete} id={product.slug!} size={25} color='red'/>
                                            </Td>
                                            <Td>
                                                {product.name}
                                            </Td>
                                            <Td>
                                               R$ {product.price}
                                            </Td>
                                            <Td>
                                                {format(parseISO(product.createdAt), "d/M ' - ' k'h'mm", { locale: ptBR })}
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
        </Box>
    )
}