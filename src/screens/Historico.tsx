import { CardHistorico } from "@components/CardHistorico";
import { Header } from "@components/Header";
import { Heading, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { SectionList } from "react-native";

type ILista = {
  title: string
  data: string[]
}

export type IDelathes = {
  tipo: string
  nome: string
  duracao: string
}


export function Historico() {
  const [listaExercicios, setListaExercicios] = useState<ILista[]>([
    { title: '22.07.24', data: ['Puxada frontal', 'Puxada remada'] },
    { title: '25.07.24', data: ['Puxada unilateral'] }
  ])

  return (
    <VStack flex={1}>
      <Header titulo="Histórico de Exercícios" />


      <SectionList
        sections={listaExercicios}
        keyExtractor={item => item}
        renderItem={() => <CardHistorico exercicio={{ tipo: "Costas", nome: "Puxada Remada", duracao: "00:15:43" }} />}
        renderSectionHeader={({ section }) => (
          <Heading fontFamily='$heading' color="$gray200" fontSize='$md' mt='$5' mb='$1'>
            {section.title}
          </Heading>
        )}
        style={{ paddingHorizontal: 32 }}
        contentContainerStyle={
          listaExercicios.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Text color='$gray100' textAlign="center">
            Não há exercícios registrados.{"\n"}Vamos fazer exercícios hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />

    </VStack>
  )
}