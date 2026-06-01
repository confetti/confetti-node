import { z } from 'zod'

export const ImageUploadSchema = z.object({
  id: z.string().meta({
    label: 'ID',
    description: 'UUID identifier of the image upload.',
  }),
  bucket: z.string().meta({
    label: 'Bucket',
    description: 'S3 bucket name for the upload.',
  }),
  region: z.string().meta({
    label: 'Region',
    description: 'AWS region of the S3 bucket.',
  }),
  awsKey: z.string().meta({
    label: 'AWS Key',
    description: 'AWS access key for the upload.',
  }),
  key: z.string().meta({
    label: 'Key',
    description: 'S3 object key (path) for the uploaded file.',
  }),
  eventId: z.number().nullable().meta({
    label: 'Event Id',
    description: 'Event the upload belongs to.',
  }),
  signature: z.string().nullable().meta({
    label: 'Signature',
    description: 'V4 signature returned when stringToSign is provided.',
  }),
  uploadUrl: z.string().nullable().meta({
    label: 'Upload URL',
    description: 'Presigned S3 PUT URL. Upload the file with a PUT request to this URL.',
  }),
})

export const ImageUploadCreateSchema = z.object({
  filename: z.string().meta({
    label: 'Filename',
    description: 'Name of the file to upload (e.g. "photo.jpg").',
  }),
  eventId: z.number().optional().meta({
    label: 'Event Id',
    description: 'Event to associate the upload with. Either eventId or workspaceId is required.',
  }),
  workspaceId: z.number().optional().meta({
    label: 'Workspace Id',
    description: 'Workspace to associate the upload with. Either eventId or workspaceId is required.',
  }),
})

export const ImageUploadUpdateSchema = ImageUploadCreateSchema.partial().extend({
  stringToSign: z.string().optional().meta({
    label: 'String To Sign',
    description: 'The string-to-sign for V4 signature generation.',
  }),
  canonicalRequest: z.string().optional().meta({
    label: 'Canonical Request',
    description: 'The canonical request for V4 signature validation.',
  }),
})

export type ImageUpload = z.infer<typeof ImageUploadSchema>
export type ImageUploadCreate = z.infer<typeof ImageUploadCreateSchema>
export type ImageUploadUpdate = z.infer<typeof ImageUploadUpdateSchema>
