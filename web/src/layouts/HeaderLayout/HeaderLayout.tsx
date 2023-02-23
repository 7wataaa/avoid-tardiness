import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { useNow } from 'src/hooks/useNow/useNow'

const Clock = () => {
  const [now] = useNow()
  const n = dayjs(now)

  return (
    <Box
      display="flex"
      minW="10rem"
      h="4rem"
      marginBottom=".5rem"
      bgColor="gray.200"
      borderRadius="lg"
    >
      <Heading margin="auto" display="block" fontSize={['4xl']}>
        {n.format(`HH${n.second() % 2 == 0 ? ':' : ' '}mm`)}
      </Heading>
    </Box>
  )
}

type HeaderLayoutProps = {
  children?: React.ReactNode
}

const HeaderLayout = ({ children }: HeaderLayoutProps) => {
  return (
    <>
      <Box>
        <Flex
          margin="10px"
          borderX="0"
          borderBottom={'1px'}
          borderStyle="solid"
          borderColor="grey"
          bgColor="grey.100"
        >
          <Heading marginLeft="10">Avoid-Tardiness</Heading>
        </Flex>
      </Box>
      <Box as="main" margin="10px" paddingX={['', '10']}>
        {children}
      </Box>
      <Box position="fixed" left="0" bottom="0" w="100%">
        <Box
          width="fit-content"
          display="block"
          marginLeft="auto"
          marginRight="1rem"
        >
          <Clock />
        </Box>
      </Box>
    </>
  )
}

export default HeaderLayout
