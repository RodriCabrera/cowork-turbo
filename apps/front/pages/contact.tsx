import { BaseLayout } from '@/common/Layout/BaseLayout'
import { PropsWithAdmin } from '@/common/types'
import { getUserSession } from '@/common/utils/getAdminSession'

export const ContactPage = ({ admin }: PropsWithAdmin) => (
  <BaseLayout admin={admin}>
    <div>contact</div>
  </BaseLayout>
)

export const getServerSideProps = getUserSession

export default ContactPage
