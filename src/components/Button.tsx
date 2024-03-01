import { VariantProps, cva } from "class-variance-authority"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
export const buttonStyles = cva(["transition-colors"],
    {
        variants: {
            variant: {
                default: ["bg-secondary", "hover:bg-secondary-hover"],
                ghost: ["hover:bg-gray-100"],
                dark: ["bg-secondary-dark", "hover:bg-secondary-dark-hover", "text-secondary"],
            },
            size: {
                default: ["rounded", "p-2"],
                icon: ["rounded-full",
                    "w-10",
                    "h-10",
                    "flex",
                    "items-center",
                    "justify-center",
                    "p-2.5"]
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }) //takes in an array of properties every button should have, and a variants object that has keys depending on the properties u want to vary

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">

//applies all the classes in icon with the ones defined in cva first arg

export const Button = ({ variant, size, className, ...props }: ButtonProps) => {
    return <button {...props} className={twMerge(buttonStyles({ variant, size }), className)}></button>
    //twMerge allows us to decide which classes override in css
}