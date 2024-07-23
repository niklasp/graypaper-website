import React, { ReactNode } from "react"
import "../i18n"
import Navigation from "./Navigation"
import { cn } from "../utils"
import { useTranslation } from "react-i18next"

export interface LayoutProps {
  children: ReactNode
  isRoot?: boolean
}
export const Layout: React.FC<LayoutProps> = ({ children, ...layoutProps }) => {
  const { i18n } = useTranslation()
  return (
    <div
      className={cn("bg-lemon-jelly bg-fixed shadow-md shadow-zinc-950", {
        "leading-5": ["en", "es"].includes(i18n.language),
        "font-noto-serif leading-7 tracking-wider": ["cn"].includes(
          i18n.language,
        ),
        "font-mincho leading-7 tracking-wide": ["jp"].includes(i18n.language),
      })}
    >
      <Navigation {...layoutProps} />
      <main className="flex min-h-svh flex-col items-center px-6 pb-6">
        <div className="w-full md:w-3/4">{children}</div>
      </main>
    </div>
  )
}
