import { NextPage } from 'next'

import { BaseLayout } from '@/common/Layout/BaseLayout'
import { PropsWithAdmin } from '@/common/types'
import { getAdminSession } from '@/common/utils/getAdminSession'

export const ContactPage = ({ admin }: PropsWithAdmin) => (
  <BaseLayout admin={admin}>
    <div>contact</div>
  </BaseLayout>
)

export const getServerSideProps = getAdminSession

ContactPage.getLayout = (page: NextPage) => page

export default ContactPage
