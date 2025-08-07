import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-blur-md",
  {
    variants: {
      variant: {
        default:
          "border-white/20 bg-white/10 text-gray-900 shadow-lg hover:bg-white/20 hover:shadow-xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
        secondary:
          "border-gray-200/20 bg-gray-100/10 text-gray-700 shadow-lg hover:bg-gray-100/20 hover:shadow-xl backdrop-blur-xl dark:border-gray-700/20 dark:bg-gray-800/10 dark:text-gray-200 dark:hover:bg-gray-800/20",
        destructive:
          "border-red-200/20 bg-red-100/10 text-red-700 shadow-lg hover:bg-red-100/20 hover:shadow-xl backdrop-blur-xl dark:border-red-800/20 dark:bg-red-900/10 dark:text-red-200 dark:hover:bg-red-900/20",
        outline: 
          "border-gray-300/30 bg-transparent text-gray-700 shadow-lg hover:bg-gray-100/5 hover:shadow-xl backdrop-blur-xl dark:border-white/30 dark:text-white dark:hover:bg-white/5",
        success:
          "border-green-200/20 bg-green-100/10 text-green-700 shadow-lg hover:bg-green-100/20 hover:shadow-xl backdrop-blur-xl dark:border-green-800/20 dark:bg-green-900/10 dark:text-green-200 dark:hover:bg-green-900/20",
        warning:
          "border-yellow-200/20 bg-yellow-100/10 text-yellow-700 shadow-lg hover:bg-yellow-100/20 hover:shadow-xl backdrop-blur-xl dark:border-yellow-800/20 dark:bg-yellow-900/10 dark:text-yellow-200 dark:hover:bg-yellow-900/20",
        info:
          "border-blue-200/20 bg-blue-100/10 text-blue-700 shadow-lg hover:bg-blue-100/20 hover:shadow-xl backdrop-blur-xl dark:border-blue-800/20 dark:bg-blue-900/10 dark:text-blue-200 dark:hover:bg-blue-900/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div 
      className={cn(badgeVariants({ variant }), className)} 
      style={{
        // Add subtle inner glow effect
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
      {...props} 
    />
  )
}

export { Badge, badgeVariants }
