import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, VStack } from "@chakra-ui/react"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEditProductMutation } from "../graphql/generated"
import { IModal } from "../interfaces/IModal"

export const EditProduct = ({OpenEditProduct, CloseEditProduct, isModalOpenEditProduct, data} : IModal | any) => {

    const navigate = useNavigate()
    const [productName, setProductName] = useState('')
    const [productSlug, setProductSlug] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productInventory, setProductInventory] = useState('')

    const handleInputChange = (e: any) => {
        setProductName(e.target.value)
        setProductSlug(e.target.value.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,''))
    }

    const [editProductMutation] = useEditProductMutation()

    const handleEditProduct = async (e: FormEvent) => {
        e.preventDefault()

        await editProductMutation({
            variables: {
                id: data.product.id,
                name: productName === ''? data.product.name : productName,
                productSlug: productSlug === ''? data.product.slug : productSlug,
                price: productPrice === ''? data.product.price : Number(productPrice),
                inventory: productInventory === ''? data.product.inventory : Number(productInventory)
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
        <Modal isOpen={isModalOpenEditProduct} onClose={CloseEditProduct}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Editar produto</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleEditProduct}>
                    <VStack>
                        <Input value={productName} onChange={(e) => handleInputChange(e)} placeholder={data.product?.name}/>
                        <Input value={productSlug} placeholder={data.product?.name}/>
                        <Input value={productPrice} onChange={(e) => setProductPrice(e.target.value)} type='number' placeholder={data.product?.price}/>
                        <Input value={productInventory} onChange={(e) => setProductInventory(e.target.value)} type='number' placeholder={data.product?.inventory}/>
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