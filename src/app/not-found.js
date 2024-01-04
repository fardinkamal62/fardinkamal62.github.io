import Link from 'next/link';

export const metadata = {
    title: "Oopsie! Don't fall off!",
    description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
    return (
        <div>
            <h2>Not Found</h2>
            <p>The page that you followed doesn&apos;t exist</p>
            <Link href="/">Return Home</Link>
        </div>
    )
}
