import { TouchableOpacity } from "react-native";
import { HStack, Heading, Text, VStack, Icon } from "@gluestack-ui/themed";
import { LogOut } from 'lucide-react-native'
import { useAuth } from "@hooks/useAuth";
import { FotoUsuario } from "./FotoUsuario";
import FotoDefaultUser from '@assets/userPhotoDefault.png'

//passando o componente LogOut(icone externo) para dentro do Icon do gluestack >> as={LogOut}

export function HomeHeader() {
  const { user, Logout } = useAuth()

  console.log('USER => ', user)

  return (
    <HStack bg='$gray600' pt='$16' pb='$5' px='$8' alignItems="center" gap='$4'>
      <FotoUsuario
        alt='imagem do usuario' w='$16' h='$16'
        source={user.avatar ? { uri: user.avatar } : FotoDefaultUser}
        defaultSource={FotoDefaultUser}
      />
      <VStack flex={1}>
        <Text color='$gray100' fontSize='$sm'>Olá, </Text>
        <Heading color='$gray100' fontSize='$md'>{user.nome}</Heading>
      </VStack>
      <TouchableOpacity onPress={Logout}>
        <Icon as={LogOut} color='$gray200' size='xl' />
      </TouchableOpacity>
    </HStack>
  )

}