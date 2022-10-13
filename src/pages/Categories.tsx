import { FormEvent } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Box, Button, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { Aside } from "../components/Aside/Aside"
import { Header } from "../components/Header/Header"
import { useCategoriesQuery, useDeleteCategoryMutation } from "../graphql/generated"
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'


// Icons Import //

import { MdDeleteForever } from 'react-icons/md'
import { CreateCategory } from './CreateCategory'

export const Categories = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const navigate = useNavigate()
    const { data, loading, error } = useCategoriesQuery({
        fetchPolicy: 'no-cache'
    })
    const [deleteCategoryMutation] = useDeleteCategoryMutation()

    const handleDelete = async (e: FormEvent) => {
        await deleteCategoryMutation({
            variables: {
                name: e.currentTarget.id
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
            Categorias
        </Header>
        <Box paddingInline='32px' marginTop='32px'>
            <Button role='button' onClick={onOpen} bg='#343A40' _hover={{bg: '#23272b'}} color='#FFF'>
                Cria categoria
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
                            <Th>Data de criação</Th>
                            <Th textAlign='center'>Número de produtos</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.categories.map(category => {
                            return (
                                <Tr>
                                    <Td display='flex' alignItems='center' paddingLeft='32px'>
                                        <MdDeleteForever onClick={handleDelete} id={category.name} size={25} color='red'/>
                                    </Td>
                                    <Td>
                                       {category.name}
                                    </Td>
                                    <Td>
                                        {format(parseISO(category.createdAt), "d/M ' - ' k'h'mm", { locale: ptBR })}
                                    </Td>
                                    <Td textAlign='center'>
                                        {category.products.length}
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
           </Box>
         </Box>
         <CreateCategory Open={onOpen} Close={onClose} isModalOpen={isOpen}/>
      </Box>
    )
}