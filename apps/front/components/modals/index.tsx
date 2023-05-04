import { Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react'

interface ModalProps {
  isOpen: boolean
  close: () => void
  confirm: () => void
  title: string
  description: string
  body: string
  confirmButton: string
}

export const Modal = ({
  isOpen,
  close,
  confirm,
  title,
  description,
  body,
  confirmButton
}: ModalProps) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog open={isOpen} onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex items-end justify-center p-4 md:items-center">
            <Dialog.Panel className="flex min-h-[300px] flex-col justify-between rounded-md bg-white md:max-w-xl">
              <div>
                <Dialog.Title className="p-4 text-2xl font-semibold">
                  {title}
                </Dialog.Title>
                <Dialog.Description className="px-4 py-2">
                  {description}
                </Dialog.Description>
                <div className="px-4 py-2">
                  <p>
                    {body}
                    Are you sure you want to delete this cowork? You can also
                    set it&apos;s status to &apos;Inactive&apos;
                  </p>
                </div>
              </div>
              <div className="flex justify-between gap-4 border-t border-gray-300 p-4">
                <button
                  onClick={close}
                  className="rounded-md bg-gray-100 px-3 py-2"
                >
                  Cancel
                </button>
                <button
                  onClick={confirm}
                  className=" rounded-md bg-gray-800 px-3 py-2 text-white"
                >
                  {confirmButton}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
