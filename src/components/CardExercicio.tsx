import { Heading, HStack, Image, VStack, Text, Icon } from "@gluestack-ui/themed";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ChevronRight } from 'lucide-react-native'

type props = TouchableOpacityProps & {
  nomeExercicio: string
}

export function CardExercicio({ nomeExercicio, ...rest }: props) {

  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg='$gray500'
        alignItems="center"
        p='$2'
        pr='$4'
        rounded='$md'
        mb='$3'
      >
        <Image
          alt='imagem do exercicio'
          source={{ uri: 'https://www.hola.com/horizon/original_aspect_ratio/4d8ac4079c2e-ejercicios-triceps5-a.jpg' }}
          w='$16'
          h='$16'
          mr='$4'
          rounded='$md'
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading fontSize='$lg' color='$white' fontFamily="$heading">{nomeExercicio}</Heading>
          <Text fontSize='$sm' color='$gray200' mt='$1' numberOfLines={2}>3 séries x 12 repetições</Text>
        </VStack>
        <Icon as={ChevronRight} color='$gray300' />
      </HStack>
    </TouchableOpacity>
  )
}