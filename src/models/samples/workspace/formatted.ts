import { TYPE } from 'yayson/utils'

export default {
  id: 1,
  name: 'My workspace',
  titleMode: 'custom',
  titleOptions: [
    { title: 'Dr', greeting: 'Dear' },
    { title: null, greeting: 'Hello', isDefault: true },
    { title: 'Prof', greeting: 'Dear', isHidden: true },
  ],
  [TYPE]: 'workspace',
}
