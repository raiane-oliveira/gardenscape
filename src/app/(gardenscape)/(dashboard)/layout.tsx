import { CurrentUserProvider, QueryProvider } from "@/app/_providers"
import { ChildrenProps } from "@/shared/lib"
import { Header } from "@/widgets/dashboard"

export default function AppLayout({ children }: ChildrenProps) {
  return (
    <QueryProvider>
      <CurrentUserProvider>
        <div className="min-h-screen">
          <Header />

          {children}
        </div>
      </CurrentUserProvider>
    </QueryProvider>
  )
}
