import { useState } from "react";
import { FlatList } from "react-native";
import { GrupoMuscular } from "@components/GrupoMuscular";
import { HomeHeader } from "@components/HomeHeader";
import { Heading, HStack, VStack, Text } from "@gluestack-ui/themed";
import { CardExercicio } from "@components/CardExercicio";

type exercicio = {
  nomeExercicio: string
  execucao: string
}

export function Home() {
  const [listaExercicios, setListaExercicios] = useState(['Puxada Frontal', 'Remada curvada', 'Levantamento terra', 'teste', 'teste2', 'teste3'])
  const [listaGrupoMuscular, setListaGrupoMuscular] = useState(['bíceps', 'costa', 'gluteo', 'ombro', 'perna', 'tríceps'])
  const [grupoSelecionado, setGrupoSelecionado] = useState('costa')

  return (
    <VStack flex={1}>
      <HomeHeader nomeUsuario="Ademar Junior" />

      <FlatList
        data={listaGrupoMuscular}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GrupoMuscular nome={item} ativo={grupoSelecionado.toLowerCase() === item.toLowerCase()} onPress={() => setGrupoSelecionado(item)} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        style={{ marginVertical: 20, maxHeight: 44, minHeight: 44 }}
      />

      <VStack px='$8' flex={1}>
        <HStack justifyContent="space-between" mb='$5' alignItems="center">
          <Heading color='$gray200' fontSize='$md' fontFamily="$heading">Exercícios</Heading>
          <Text color="$gray200" fontSize='$md' fontFamily="$body">{listaExercicios.length}</Text>
        </HStack>

        <FlatList
          data={listaExercicios}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <CardExercicio nomeExercicio={item} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  )
}