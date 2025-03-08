import { HStack, Heading, Text, VStack, Icon } from "@gluestack-ui/themed";
import { FotoUsuario } from "./FotoUsuario";
import { LogOut } from 'lucide-react-native'

type props = {
  nomeUsuario: string
}

//passando o componente LogOut(icone externo) para dentro do Icon do gluestack >> as={LogOut}

export function HomeHeader({ nomeUsuario }: props) {

  return (
    <HStack bg='$gray600' pt='$16' pb='$5' px='$8' alignItems="center" gap='$4'>
      <FotoUsuario source={{ uri: 'http://github.com/4demar.png' }} alt='imagem do usuario' w='$16' h='$16' />
      <VStack flex={1}>
        <Text color='$gray100' fontSize='$sm'>Olá, </Text>
        <Heading color='$gray100' fontSize='$md'>{nomeUsuario}</Heading>
      </VStack>

      <Icon as={LogOut} color='$gray200' size='xl' />
    </HStack>
  )

}