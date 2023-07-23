import { BaseLayout } from '@/common/Layout/BaseLayout'
import { PropsWithUser } from '@/common/types'
import { getUserSession } from '@/common/utils/getAdminSession'

import { ContactBanner } from '@/modules/contact/ContactBanner'
import { ContactForm } from '@/modules/contact/ContactForm'

export const ContactPage = ({ user }: PropsWithUser) => (
  <BaseLayout user={user}>
    <div className="flex min-h-[calc(100vh-126px)] flex-col items-center justify-center bg-gray-50 pb-20 md:flex-row md:p-0">
      <div className="md:w-1/2">
        <ContactBanner />
      </div>
      <div className="m-2 w-full rounded-md p-6 md:w-1/2 md:bg-slate-300/20">
        <ContactForm />
      </div>
    </div>
  </BaseLayout>
)

export const getServerSideProps = getUserSession

export default ContactPage
