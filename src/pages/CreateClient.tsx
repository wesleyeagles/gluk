import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, VStack } from "@chakra-ui/react"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCreateClientMutation } from "../graphql/generated"
import { IModal } from "../interfaces/IModal"
import ReactInputMask from "react-input-mask"

export const CreateClient = ({OpenClient, CloseClient, isModalOpenClient} : IModal | any) => {

    const navigate = useNavigate()
    const [clientName, setClientName] = useState('')
    const [clientSlug, setClientSlug] = useState('')
    const [clientPhone, setClientPhone] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [clientAdress, setClientAdress] = useState('')

    const handleInputChange = (e: any) => {
        setClientName(e.target.value)
        setClientSlug(e.target.value.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,''))
    }

    const [createClientMutation] = useCreateClientMutation()

    const handleCreateClient = async (e: FormEvent) => {
        e.preventDefault()
        await createClientMutation({
            variables: {
                name: clientName,
                email: clientEmail,
                phone: clientPhone,
                adress: clientAdress,
                slug: clientSlug
            }
        })

        navigate(0)
    }

    
    return (
        <Modal isOpen={isModalOpenClient} onClose={CloseClient}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Criar cliente</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleCreateClient}>
                    <VStack>
                        <Input value={clientName} onChange={(e) => handleInputChange(e)} placeholder="Nome" required/>
                        <Input type='email' value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="Email" required/>
                        <Input mask='(99) 9 9999-9999' as={ReactInputMask} value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="Telefone" required/>
                        <Input value={clientAdress} onChange={(e) => setClientAdress(e.target.value)} placeholder="Endereço" required/>
                        <Input type='hidden' value={clientSlug} placeholder="Slug" required/>
                    </VStack>
                    <Box display='flex' justifyContent='flex-end'>
                        <Button type="submit" marginTop='12px' bg='#343A40' _hover={{bg: '#23272b'}} color='#FFF'>
                            Criar
                        </Button>
                    </Box>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <ModalCloseButton bg='#343A40' _hover={{bg: '#23272b'}} color='#FFF'/>
                </ModalFooter>
            </ModalContent>
        </Modal>

    )
}