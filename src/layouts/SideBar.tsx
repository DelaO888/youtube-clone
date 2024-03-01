import { Home, Repeat, Clapperboard, Library, ChevronUp, ChevronDown, History, PlaySquare, Clock, ListVideo } from "lucide-react"
import { Children, ElementType, ReactNode, useState } from "react"
import { Button, buttonStyles } from "../components/Button"
import { twMerge } from "tailwind-merge"
import { useSidebarContext } from "../context/SidebarContext"
import { playlists, subscriptions } from "../data/home"
import { PageHeaderFirstSection } from "./PageHeader"

export const SideBar = () => {

    const { isLargeOpen, isSmallOpen, close } = useSidebarContext()

    return (
        <>
            <aside
                className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${isLargeOpen ? "lg:hidden" : "lg:flex"
                    }`}
            >
                <SmallSidebarItem Icon={Home} title="Home" url="/" />
                <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
                <SmallSidebarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions" />
                <SmallSidebarItem Icon={Library} title="Library" url="/library" />
            </aside>
            {isSmallOpen && (
                <div
                    onClick={close}
                    className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
                />
            )}
            <aside
                className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${isLargeOpen ? "lg:flex" : "lg:hidden"
                    } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
            >
                <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
                    <PageHeaderFirstSection />
                </div>
                <LargeSideBarSection title="Example">
                    <LargeSideBarItem isActive Icon={Home} title="Home" url="/" />
                    <LargeSideBarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions" />
                </LargeSideBarSection>
                <hr />
                <LargeSideBarSection visibleItemCount={5}>
                    <LargeSideBarItem Icon={Library} title="Library" url="/library" />
                    <LargeSideBarItem Icon={History} title="History" url="/history" />
                    <LargeSideBarItem Icon={PlaySquare} title="Your Videos" url="/your-videos" />
                    <LargeSideBarItem Icon={Clock} title="Watch later" url="/playlist?list-WL" />
                    {playlists.map(playlist => (
                        <LargeSideBarItem Icon={ListVideo}
                            key={playlist.id} title="playlist.name" url={`/playlist?list=${playlist.id}`} />
                    ))}
                </LargeSideBarSection>
                <hr />
                <LargeSideBarSection title="Subscriptions">
                    {subscriptions.map(subscription => (
                        <LargeSideBarItem key={subscription.id} Icon={subscription.imgUrl} title={subscription.channelName} url={`/@${subscription.id}`} />
                    ))}
                </LargeSideBarSection>
            </aside>
        </>
    )
}

type SmallSidebarItemProps = {
    Icon: ElementType | string //should be renamed IconOrImage
    title: string
    url: string
}

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
    return (
        <a href={url} className={twMerge(buttonStyles({ variant: "ghost" }), "py-4 px-1 flex flex-col items-center rounded-lg gap-1")}>
            <Icon className="w-6 h-6" />
            <div className="text-sm">{title}</div>
        </a>)
}

type LargeSidebarItemProps = {
    Icon: ElementType | string
    title: string
    url: string
    isActive?: boolean
}

type LargeSidebarSectionProps = {
    children: ReactNode
    title?: string
    visibleItemCount?: number
}

function LargeSideBarSection({ children, title, visibleItemCount = Number.POSITIVE_INFINITY }: LargeSidebarSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const childrenArray = Children.toArray(children).flat()
    const showExpandButton = childrenArray.length > visibleItemCount
    const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount)
    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown
    return <div>
        {title && <div className="ml-4 mt-2 text-lg mb-1">
            {title}
        </div>}
        {visibleChildren}
        {showExpandButton &&
            <Button variant="ghost" className="w-full flex items-center rounded-lg gap-4 p-3" onClick={() => setIsExpanded(e => !e)}>
                <ButtonIcon className="w-6 h-6">
                    <div>{isExpanded ? "Show Less" : "Show More"}</div>
                </ButtonIcon>
            </Button>

        }
    </div>
}

function LargeSideBarItem({ Icon, title, url, isActive = false }: LargeSidebarItemProps) {
    return (
        <a href={url} className={twMerge(buttonStyles({ variant: "ghost" }), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined}`)}>

            {typeof Icon === "string" ? <img src={Icon} className="w-6 h-6 rounded-full"></img> :
                (<Icon className="w-6 h-6" />)
            }

            <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                {title}
            </div>
        </a>

    )

}