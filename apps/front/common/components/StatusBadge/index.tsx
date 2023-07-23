import { COLORS_BY_STATUS } from '@/modules/coworks/components/CoworksTable/constants'
import { SingleCoworkFullGetRes } from 'types'

interface StatusBadgeProps {
  status: SingleCoworkFullGetRes['status']
}

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span
    className={`rounded-full  px-3 py-1 text-xs ${COLORS_BY_STATUS[status]}`}
  >
    {status}
  </span>
)
