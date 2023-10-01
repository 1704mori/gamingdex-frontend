"use client";

import { classes } from "@/lib/helpers/common";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import Typography from "../Typography";

interface INotificationContext {
  add: (text: string, type?: "default" | "success" | "info" | "error") => void;
}

const NotificationContext = createContext<INotificationContext>(
  {} as INotificationContext
);

const variants = {
  inital: {
    opacity: 0,
    y: 50,
    scale: 0.2,
    transition: {
      duration: 0.1,
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.2,
    transition: {
      ease: "easeOut",
      duration: 0.15,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.1,
    },
  },
};

export const remove = (arr: any[], item: any) => {
  const newArr = [...arr];
  newArr.splice(
    newArr.findIndex((i) => i === item),
    1
  );
  return newArr;
};

let newIndex = 0;
export const add = (arr: any[], text: string, style: any) => {
  newIndex = newIndex + 1;
  return [...arr, { id: newIndex, text: text, style: style }];
};

interface NotificationProps {
  children?: React.ReactNode;
  placement?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
}

const NotificationProvider = (props: NotificationProps) => {
  const { children, placement = "bottom-left" } = props;
  const [notifications, setNotifications] = useState<any[]>([]);

  const add = (text: string, type = "default") => {
    const id = Date.now() + Math.random();
    setNotifications((notifications) => [
      ...notifications,
      {
        id,
        text,
        type,
      },
    ]);
  };

  const remove = (id: number) => {
    setNotifications((notifications) =>
      notifications.filter((n) => n.id !== id)
    );
  };

  useEffect(() => {
    if (notifications.length > 5) {
      // setNotifications((notifications) => notifications.slice(1));
    }

    if (["bottom-left", "bottom-right", "bottom-center"].includes(placement)) {
      setNotifications((notifications) => notifications.reverse());
    }

    let timeoutDuration = 1000;

    if (notifications.length === 1) {
      timeoutDuration = 3000;
    }

    const timeout = setTimeout(() => {
      setNotifications((notifications) => notifications.slice(1));
    }, timeoutDuration);

    return () => clearTimeout(timeout);
  }, [placement, notifications]);

  return (
    <NotificationContext.Provider value={{ add: add }}>
      {children}
      <AnimatePresence>
        {notifications.length > 0 && (
          <motion.div
            className={classes(
              "notification fixed flex flex-col gap-3",
              placement === "top-left" && "top-3 left-3",
              placement === "top-right" && "top-3 right-3",
              placement === "bottom-left" && "bottom-3 left-3",
              placement === "bottom-right" && "bottom-3 right-3",
              placement === "top-center" &&
                "top-0 left-1/2 transform -translate-x-1/2",
              placement === "bottom-center" &&
                "bottom-0 left-1/2 transform -translate-x-1/2"
            )}
            layout
            // dragElastic={0.9}
            // dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}
            // onDragEnd={closeOnDrag}
            variants={variants} // Defined animation states
            initial="initial" // Starting animation
            animate="animate" // Values to animate to
            exit="exit" // Target to animate to when removed from the tree
          >
            {notifications.map((notification) => (
              <motion.div
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                // dragElastic={0.9}
                // dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}
                // onDragEnd={closeOnDrag}
                variants={variants} // Defined animation states
                initial="initial" // Starting animation
                animate="animate" // Values to animate to
                exit="exit" // Target to animate to when removed from the tree
                className={classes(
                  "flex items-center justify-between notification",
                  notification.type === "success" && "!bg-green-300",
                  notification.type === "info" && "!bg-primary",
                  notification.type === "error" && "!bg-red-300"
                )}
                key={notification.id}
              >
                <Typography thickness={3}>{notification.text}</Typography>
                <X
                  className="cursor-pointer"
                  onClick={() => remove(notification.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }

  return context;
};

export { NotificationProvider, useNotification };
