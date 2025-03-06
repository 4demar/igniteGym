import { Center, Heading } from "@gluestack-ui/themed"

type props = {
  titulo: string
}

export function Header({ titulo }: props) {

  return (
    <Center bg='$gray300' paddingVertical='$10'>
      <Heading color='$gray100' fontSize='$xl' fontFamily="$heading" mt='$8'>
        {titulo}
      </Heading>
    </Center>
  )
}