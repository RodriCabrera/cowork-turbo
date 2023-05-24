// TODO: Type employees, it is User[] from prisma client
export const PeopleList = ({
  employees,
  isLoading
}: {
  employees: any
  isLoading: boolean
}) => {
  return (
    <div className="bg-yellow-200">
      <p className="text-xl font-bold">PeopleList Component</p>
      {isLoading && 'Loading people list...'}
      {employees?.map((employee: any) => (
        <p key={employee?.id}>{employee?.email}</p>
      ))}
    </div>
  )
}
