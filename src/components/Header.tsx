import { Center, Heading } from "@gluestack-ui/themed"

type props = {
  titulo: string
}

export function Header({ titulo }: props) {

  return (
    <Center bg='$gray600' paddingVertical='$6'>
      <Heading color='$gray100' fontSize='$xl' fontFamily="$heading" mt='$10'>
        {titulo}
      </Heading>
    </Center>
  )
}