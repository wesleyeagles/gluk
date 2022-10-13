import { FormEvent } from 'react'
import { Box, Button, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { Aside } from "../components/Aside/Aside"
import { Header } from "../components/Header/Header"
import { useClientByIdQuery, useClientsQuery, useDeleteClientMutation } from "../graphql/generated"
import { CreateClient } from "./CreateClient"
import { useNavigate } from 'react-router-dom'

// Icons Import //

import { MdDeleteForever } from 'react-icons/md'
import { TbEdit } from 'react-icons/tb'
import { EditClient } from './EditClient'


export const Clients = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isClientEditOpen, onOpen: onClientEditOpen, onClose: onClientEditClose } = useDisclosure()
    const [deleteClientMutation] = useDeleteClientMutation()

    const { data } = useClientsQuery()

    const { data: ClientById, refetch } = useClientByIdQuery({})

    const refecthById = (e: any) => {
        refetch({
            id: e.currentTarget.id
        })
    }

    const handleDelete = async (e: FormEvent) => {
        await deleteClientMutation({
            variables: {
                id: e.currentTarget.id
            }
        })

        navigate(0)
    }

    return (
        <Box display='flex'>
            <Aside />
            <Box w='100%'>
                <Header>
                    Clientes
                </Header>

                <Box paddingInline='32px' marginTop='32px'>
                <Button role='button' onClick={onOpen} bg='#343A40' _hover={{bg: '#23272b'}} color='#FFF'>
                    Criar cliente
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
                                <Th>Email</Th>
                                <Th>Telefone</Th>
                                <Th>Endereço</Th>
                                <Th>Número de compras</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.clients.map(client => {
                                return (
                                    <Tr>
                                        <Td display='flex' alignItems='center' paddingLeft='32px'>
                                        <TbEdit id={client.id!} onClick={(e) => {refecthById(e); onClientEditOpen();} } size={22} color='orange' />
                                        <MdDeleteForever onClick={handleDelete} id={client.id} size={25} color='red'/>
                                        </Td>
                                        <Td>
                                        {client.name}
                                        </Td>
                                        <Td>
                                            {client.email}
                                        </Td>
                                        <Td>
                                            {client.phone}
                                        </Td>
                                        <Td>
                                            {client.adress}
                                        </Td>
                                        <Td textAlign='center'>
                                            {client.shops.length}
                                        </Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
                </Box>
             </Box>
             <CreateClient OpenClient={onOpen} CloseClient={onClose} isModalOpenClient={isOpen}/>
             <EditClient data={ClientById} OpenEditClient={onClientEditOpen} CloseEditClient={onClientEditClose} isModalOpenEditClient={isClientEditOpen}/>
            </Box>
    
    )
}