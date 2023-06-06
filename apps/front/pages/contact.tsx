import { BaseLayout } from '@/common/Layout/BaseLayout'
import { PropsWithUser } from '@/common/types'
import { getUserSession } from '@/common/utils/getAdminSession'

export const ContactPage = ({ user }: PropsWithUser) => (
  <BaseLayout user={user}>
    <div>contact</div>
  </BaseLayout>
)

export const getServerSideProps = getUserSession

export default ContactPage
