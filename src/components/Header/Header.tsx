import { Box, Heading } from "@chakra-ui/react"
import { IHeader } from "../../interfaces/IHeader"

export const Header = ({children}: IHeader) => {
    return (
        <Box as='header' w='100%'>
            <Box display='flex' alignItems='center' w='100%' justifyContent='space-between' h='13vh' boxShadow='0px 4px 15px 0px #00000030' paddingInline='32px'>
                <Box>
                    <Heading as='h2' fontSize='32px'>
                        {children}
                    </Heading>
                </Box>

                <Box w='50px' h='50px' borderRadius='100%' border='solid 1px red'>

                </Box>
            </Box>
        </Box>
    )
}