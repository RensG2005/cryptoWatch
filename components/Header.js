import Link from "next/link"

function Header() {

    return (
        <header>
          <Link href="/">
            <h1 className="logo">CryptoWatch</h1>
          </Link>

        <nav>
          <Link href="/exchanges">
            Exchanges
          </Link>
          <Link href="/watchlist">
            Watchlist
          </Link>
          <Link href="/events">
            Events
          </Link>
        </nav>
      </header>
    )
}

export default Header
