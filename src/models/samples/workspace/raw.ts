export default {
  data: {
    id: 1,
    type: 'workspace',
    attributes: {
      name: 'My workspace',
      titleMode: 'custom',
      titleOptions: [
        { title: 'Dr', greeting: 'Dear' },
        { title: null, greeting: 'Hello', isDefault: true },
        { title: 'Prof', greeting: 'Dear', isHidden: true },
      ],
    },
  },
}
