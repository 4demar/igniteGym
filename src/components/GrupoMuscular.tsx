import { Button, Text } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type props = ComponentProps<typeof Button> & {
  nome: string
  ativo?: boolean
}

export function GrupoMuscular({ nome, ativo = false, ...rest }: props) {

  return (
    <Button {...rest}
      mr='$3'
      minWidth='$24'
      h='$10'
      bg="$gray600"
      rounded='$md'
      justifyContent="center"
      alignItems="center"
      borderColor='$green500'
      borderWidth={ativo ? 1 : 0}
      sx={{
        ':active': {
          borderWidth: 1
        }
      }}
    >
      <Text
        color={ativo ? '$green500' : '$gray200'}
        textTransform="uppercase"
        fontSize='$xs'
        fontFamily="$heading"
      >
        {nome}
      </Text>
    </Button>
  )
}