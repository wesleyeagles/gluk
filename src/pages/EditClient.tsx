import { 
         Box, Button, 
         Input, Modal, 
         ModalBody, ModalCloseButton, 
         ModalContent, ModalFooter, 
         ModalHeader, ModalOverlay, 
         VStack 
        } from "@chakra-ui/react"
import { useEditClientMutation } from "../graphql/generated"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IModal } from "../interfaces/IModal"
import ReactInputMask from "react-input-mask"

export const EditClient = ({OpenEditClient, CloseEditClient, isModalOpenEditClient, data} : IModal | any) => {

    const navigate = useNavigate()
    const [clientName, setClientName] = useState('')
    const [clientSlug, setClientSlug] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [clientPhone, setClientPhone] = useState('')
    const [clientAdress, setClientAdress] = useState('')

    const handleInputChange = (e: any) => {
        setClientName(e.target.value)
        setClientSlug(e.target.value.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,''))
    }

    const [editClientMutation] = useEditClientMutation()

    const handleEditProduct = async (e: FormEvent) => {
        e.preventDefault()

        await editClientMutation({
            variables: {
                id: data.client.id,
                name: clientName === ''? data.client.name : clientName,
                slug: clientSlug === ''? data.client.slug : clientSlug,
                email: clientEmail === ''? data.client.email : clientEmail,
                phone: clientPhone === ''? data.client.phone : clientPhone
            }
        })

        navigate(0)
    }

    if (!data) {
        return (
            <div>
                
            </div>
        )
    }

    return (
        <Modal isOpen={isModalOpenEditClient} onClose={CloseEditClient}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Editar cliente</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleEditProduct}>
                    <VStack>
                        <Input value={clientName} onChange={(e) => handleInputChange(e)} placeholder={data.client?.name}/>
                        <Input type='hidden' value={clientSlug} placeholder={data.product?.name}/>
                        <Input type='email' value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder={data.client?.email}/>
                        <Input mask='(99) 9 9999-9999' as={ReactInputMask} value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder={data.client?.phone}/>
                        <Input value={clientAdress} onChange={(e) => setClientAdress(e.target.value)} placeholder={data.client?.adress}/>
                    </VStack>
                    <Box display='flex' justifyContent='flex-end'>
                        <Button type="submit" marginTop='12px' bg='#343A40' _hover={{bg: '#23272b'}} color='#FFF'>
                            Salvar
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