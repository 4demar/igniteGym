import { Heading, HStack, Image, VStack, Text, Icon } from "@gluestack-ui/themed";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ChevronRight } from 'lucide-react-native'
import { ExercicioDTO } from "../interfaces/exercicioDTO";
import { api } from '@services/api'

type props = TouchableOpacityProps & {
  exercicio: ExercicioDTO
}

export function CardExercicio({ exercicio, ...rest }: props) {

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
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb${exercicio.thumb}` }}
          w='$16'
          h='$16'
          mr='$4'
          rounded='$md'
          resizeMode="center"
        />
        <VStack flex={1}>
          <Heading fontSize='$lg' color='$white' fontFamily="$heading">{exercicio.name}</Heading>
          <Text fontSize='$sm' color='$gray200' mt='$1' numberOfLines={2}>{exercicio.series} séries x {exercicio.repetitions} repetições</Text>
        </VStack>
        <Icon as={ChevronRight} color='$gray300' />
      </HStack>
    </TouchableOpacity>
  )
}