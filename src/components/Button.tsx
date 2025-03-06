import { Text, Button as GluestackButton, ButtonSpinner } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type props = ComponentProps<typeof GluestackButton> & {
  titulo: string
  variant?: 'solid' | 'outline'
  isLoading?: boolean
}

export function Button({ titulo, isLoading = false, variant = 'solid', ...rest }: props) {

  return (
    <GluestackButton
      {...rest}
      w='$full'
      h='$14'
      bg={variant === 'outline' ? 'transparent' : '$green700'}
      borderWidth={variant === 'outline' ? '$1' : '$0'}
      borderColor='$green500'
      rounded='$sm'
      $active-bg={variant === 'outline' ? '$gray500' : '$green500'}
      disabled={isLoading}

    >
      {isLoading
        ? <ButtonSpinner color='$white' />
        : <Text
          color={variant === 'outline' ? '$green500' : '$white'}
          fontFamily='$heading'
          fontSize='$md'>
          {titulo}
        </Text>
      }
    </GluestackButton>
  )

}