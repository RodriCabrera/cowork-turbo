import { useRouter } from 'next/router'
import { InferGetServerSidePropsType } from 'next'

import { RegisterBanner } from '@/modules/auth/components/banners/RegisterBanner'
import {
  CompanyForm,
  FreelancerForm
} from '@/modules/auth/components/RegisterForms'
import { getUserSession } from '@/common/utils/getAdminSession'
import { BaseLayout } from '@/common/Layout/BaseLayout'

export const RegisterPage = ({
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  const isCompany = router.query.role === 'company'

  const goToCompanyRegister = () =>
    router.push({
      query: { role: 'company' }
    })

  const goToFreelancerRegister = () =>
    router.push({
      query: { role: 'freelancer' }
    })

  return (
    <BaseLayout user={user}>
      <div className="flex min-h-[calc(100vh-8rem)]   flex-col md:flex-row">
        <RegisterBanner
          isCompany={isCompany}
          goToCompanyRegister={goToCompanyRegister}
          goToFreelancerRegister={goToFreelancerRegister}
        />
        {isCompany ? <CompanyForm /> : <FreelancerForm />}
      </div>
    </BaseLayout>
  )
}

export const getServerSideProps = getUserSession

export default RegisterPage
