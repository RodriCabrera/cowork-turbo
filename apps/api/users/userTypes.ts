import UserValidate from './userValidation'

const createAdminSchema = UserValidate.getCreateAdminSchema()

export type CreateAdminInput = ReturnType<typeof createAdminSchema.parse>
