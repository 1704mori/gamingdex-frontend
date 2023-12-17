import { classes } from "@/lib/helpers/common";
import { AnimatePresence, motion } from "framer-motion";
import { isValidElement, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useClickOutside from "../../lib/hooks/useClickOutside";

interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

const Backdrop = (props: BackdropProps) => {
  const { children, onClick } = props;
  return (
    <motion.div
      ref={props.ref}
      onClick={onClick}
      className={classes("backdrop", props.className, "backdrop")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

const Modal = ({
  children,
  handleClose,
  modalOpen,
  className,
  floatingTop,
  floatingBottom,
  width,
}: {
  children?: React.ReactNode;
  modalOpen: boolean;
  handleClose: () => void;
  className?: string;
  floatingTop?: React.ReactNode;
  floatingBottom?: React.ReactNode;
  width?: string;
}) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  useClickOutside(backdropRef, () => handleClose());

  // disable scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0";
    }
  }, [modalOpen]);

  if (typeof window !== "object") return null;

  const modalElement = document.body;
  if (!modalElement) return null;

  return createPortal(
    <AnimatePresence>
      {modalOpen && (
        <Backdrop
          className={classes(
            floatingTop || floatingBottom ? "flex flex-col" : "",
          )}
        >
          <div
            className={classes(
              "flex flex-col items-center justify-center px-3",
              width,
            )}
            ref={backdropRef}
          >
            {floatingTop && floatingTop}
            <motion.div
              className={classes("modal", className)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
            {floatingBottom && floatingBottom}
          </div>
          {/* {children && (children as any).type === FloatingContainer && children} */}
          {/* if chiildren is FloatinButton */}
        </Backdrop>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export function useModal() {
  const [modalOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return { open, close, setOpen, modalOpen };
}

export default Modal;
