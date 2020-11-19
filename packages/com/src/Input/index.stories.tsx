import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Input from './index'

const ControlledInput = () => {
  const [value, setValue] = useState()
  return <Input value={value} defaultValue={value} onChange={(event: any) => {setValue(event.target.value)}}/>
}
const defaultInput = () => (
  <>
    <Input
      style={{width: '300px'}}
      placeholder="placeholder"
      onChange={action('changed')}
    />
    <ControlledInput />
  </>
)
const disabledInput = () => (
  <Input
    style={{width: '300px'}}
    placeholder="disabled input"
  />
)


const sizeInput = () => (
  <>
    <Input
      style={{width: '300px'}}
      defaultValue="large size"
    />
    <Input
      style={{width: '300px'}}
      placeholder="small size"
    />
  </>
)

storiesOf('Input component', module)
  .add('Input', defaultInput)
  .add('被禁用的 Input', disabledInput)
  .add('大小不同的 Input', sizeInput)