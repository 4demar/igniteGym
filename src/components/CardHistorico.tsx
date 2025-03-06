import { Heading, HStack, VStack, Text } from "@gluestack-ui/themed";
import { SectionList } from 'react-native'
import { IExercicio } from "../interfaces";

type props = {
  exercicio: IExercicio
}

export function CardHistorico({ exercicio }: props) {
  return (
    <HStack
      w="$full"
      px="$5"
      py="$4"
      mb="$3"
      bg="$gray500"
      rounded="$md"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack mr="$5">
        <Heading
          color="$white"
          fontSize="$md"
          fontFamily="$heading"
          textTransform="capitalize"
        >
          {exercicio.tipo}
        </Heading>

        <Text color="$gray200" fontSize="$lg" numberOfLines={1}>
          {exercicio.nome}
        </Text>
      </VStack>

      <Text color="$gray200" fontSize="$md">
        {exercicio.duracao}
      </Text>
    </HStack>
  )

}