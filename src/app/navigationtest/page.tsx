"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const NavigationTestPage = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const q = searchParams.get('q')

    console.log(pathname, q)

    const handleClick = () => {
        console.log('clicked')
        router.forward()
    }

    return (
        <div>
            <Link href="/" prefetch={false}>Click Here</Link>
            <button onClick={handleClick}>Redirect</button>
        </div>
    )
}

export default NavigationTestPage
