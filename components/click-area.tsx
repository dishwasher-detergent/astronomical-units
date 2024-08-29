import { Likes } from "@/components/likes"
import { LikeButton } from "@/components/likes/button"
import { LikesGeneration } from "@/components/likes/generation"

const ClickArea = () => {
    return (
        <>
            <Likes />
            <LikeButton />
            <LikesGeneration />
        </>
    )
}

export { ClickArea }