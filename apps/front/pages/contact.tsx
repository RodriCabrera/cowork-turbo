import { BaseLayout } from '@/common/Layout/BaseLayout'
import { PropsWithUser } from '@/common/types'
import { getUserSession } from '@/common/utils/getAdminSession'

import { ContactBanner } from '@/modules/contact/ContactBanner'

export const ContactPage = ({ user }: PropsWithUser) => (
  <BaseLayout user={user}>
    <ContactBanner />
  </BaseLayout>
)

export const getServerSideProps = getUserSession

export default ContactPage
