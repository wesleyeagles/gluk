import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCreateCategoryMutation } from "../graphql/generated"
import { IModal } from "../interfaces/IModal"

export const CreateCategory = ({Open, Close, isModalOpen} : IModal | any) => {

    const navigate = useNavigate()
    const [categoryName, setCategoryName] = useState('')
    const [categorySlug, setCategorySlug] = useState('')

    const handleInputChange = (e: any) => {
        setCategoryName(e.target.value)
        setCategorySlug(e.target.value.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,''))
    }

    const [createCategoryMutation, {data, loading, error}] = useCreateCategoryMutation()
    

    const handleCreateCategory = async (e: FormEvent) => {
        e.preventDefault()
        await createCategoryMutation({
            variables: {
                name: categoryName,
                slug: categorySlug
            }
        })

        navigate(0)
    }

    
    return (
        <Modal isOpen={isModalOpen} onClose={Close}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Criar categoria</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleCreateCategory}>
                    <VStack>
                        <Input value={categoryName} onChange={(e) => handleInputChange(e)} placeholder="Nome" required/>
                        <Input value={categorySlug} placeholder="Slug" required/>
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