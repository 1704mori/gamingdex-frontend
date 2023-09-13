import "../../styles/globals.scss";

import RegisterLayout from "@/components/screens/Register/RegisterLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RegisterLayout>{children}</RegisterLayout>;
}
