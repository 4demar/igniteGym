import { ComponentProps } from "react"
import { Image } from '@gluestack-ui/themed'

type props = ComponentProps<typeof Image>

export function FotoUsuario({ ...rest }: props) {

  return (
    <Image
      rounded='$full'
      borderWidth={2}
      borderColor="$gray400"
      backgroundColor="$gray500"
      {...rest}
    />
  )
}