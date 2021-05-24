import Link from 'next/link'

export default function FourOhFour() {
  return <div className="fourpage">
    <h1>404 - Page Not Found</h1>
    <h2>This page is hopefully coming soon!</h2>
    <Link href="/">
        Go back home
    </Link>
  </div>
}