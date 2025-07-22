import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import type { ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  isClosed: () => void;
  title?: string;
  children: ReactNode;
  description?: string;
}
const Model = ({ isOpen, isClosed, title, children, description }: IProps) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog
            open={isOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={isClosed}
          >
            <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                  transition
                  className="w-full max-w-md rounded-xl bg-white p-6  duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                >
                  {title && (
                    <DialogTitle
                      as="h2"
                      className="text-base/7 font-medium text-gray-800 text-xl font-extrabold"
                    >
                      {title}
                    </DialogTitle>
                  )}
                  <div className="text-md pt-3 text-gray-500">
                    {description}
                  </div>
                  <div className="mt-4 text-xl">{children}</div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </div>
      )}
    </>
  );
};
export default Model;
