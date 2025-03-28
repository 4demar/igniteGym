import { Heading, HStack, VStack, Text } from "@gluestack-ui/themed";
import { IDelathes } from "@screens/Historico";
import { HistoricoDTO } from "../interfaces/historicoDTO";

type props = {
  exercicio: HistoricoDTO
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
      <VStack mr="$5" flex={1}>
        <Heading
          color="$white"
          fontSize="$md"
          fontFamily="$heading"
          textTransform="capitalize"
          numberOfLines={1}
        >
          {exercicio.group}
        </Heading>

        <Text color="$gray200" fontSize="$lg" numberOfLines={1}>
          {exercicio.name}
        </Text>
      </VStack>

      <Text color="$gray200" fontSize="$md">
        {exercicio.hour}
      </Text>
    </HStack>
  )

}