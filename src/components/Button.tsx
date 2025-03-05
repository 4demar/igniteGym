import { Text, Button as GluestackButton, ButtonSpinner } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type props = ComponentProps<typeof GluestackButton> & {
  titulo: string
  isLoading?: boolean
}

export function Button({ titulo, isLoading = false, ...rest }: props) {

  return (
    <GluestackButton
      {...rest}
      w='$full'
      h='$14'
      bg='$green700'
      borderWidth='$0'
      borderColor='$green500'
      rounded='$sm'
      $active-bg='$green500'
      disabled={isLoading}

    >
      {isLoading
        ? <ButtonSpinner color='$white' />
        : <Text color='$white' fontFamily='$heading' fontSize='$md'>{titulo}</Text>
      }
    </GluestackButton>
  )

}