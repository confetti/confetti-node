import { TYPE } from 'yayson/utils'

export default {
  id: 1,
  name: 'email',
  title: 'Email',
  description: null,
  field: 'text',
  order: 1,
  status: 'created',
  sectionId: null,
  settings: { required: true },
  [TYPE]: 'formField',
}
