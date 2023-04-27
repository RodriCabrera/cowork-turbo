import CoworkValidate from './coworkValidation'

const createSchema = CoworkValidate.getCreateSchema()
const editSchema = CoworkValidate.getEditSchema()

type CreateCoworkInput = ReturnType<typeof createSchema.parse>
type EditCoworkInput = ReturnType<typeof editSchema.parse>

export { CreateCoworkInput, EditCoworkInput }
