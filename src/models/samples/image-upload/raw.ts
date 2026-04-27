export default {
  data: {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    type: 'image-upload',
    attributes: {
      bucket: 'confetti-uploads',
      region: 'eu-west-1',
      awsKey: 'AKIAIOSFODNN7EXAMPLE',
      key: 'uploads/events/123/photo.jpg',
      eventId: 123,
      signature: null,
      uploadUrl: 'https://confetti-uploads.s3.eu-west-1.amazonaws.com/uploads/events/123/photo.jpg?X-Amz-Signature=example',
    },
  },
}
