import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, VStack } from "@chakra-ui/react"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCategoriesQuery, useCreateProductMutation } from "../graphql/generated"
import { IModal } from "../interfaces/IModal"

export const CreateProduct = ({OpenProduct, CloseProduct, isModalOpenProduct} : IModal | any) => {

    const navigate = useNavigate()
    const [productName, setProductName] = useState('')
    const [productSlug, setProductSlug] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productInventory, setProductInventory] = useState('')
    const [categoryName, setCategoryName] = useState('')

    const handleInputChange = (e: any) => {
        setProductName(e.target.value)
        setProductSlug(e.target.value.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,''))
    }

    const [createProductMutation] = useCreateProductMutation()

    const { data, loading, error } = useCategoriesQuery({
        fetchPolicy: 'no-cache'
    })

    const handleCreateCategory = async (e: FormEvent) => {
        e.preventDefault()
        await createProductMutation({
            variables: {
                name: productName,
                slug: productSlug,
                price: Number(productPrice),
                inventory: Number(productInventory),
                categoryName: categoryName
            }
        })

        navigate(0)
    }

    
    return (
        <Modal isOpen={isModalOpenProduct} onClose={CloseProduct}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Criar produto</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleCreateCategory}>
                    <VStack>
                        <Input value={productName} onChange={(e) => handleInputChange(e)} placeholder="Nome" required/>
                        <Input value={productSlug} placeholder="Slug" required/>
                        <Input type='number' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder="Preço" required/>
                        <Input type='number' value={productInventory} onChange={(e) => setProductInventory(e.target.value)}  placeholder="Estoque" required/>
                        <Select value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Categoria">
                          {data?.categories.map(category => {
                            return (
                                <option value={category.name}>{category.name}</option>
                            )
                          })}
                        </Select>
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