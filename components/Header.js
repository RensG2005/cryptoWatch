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
          <form className="filterForm" onSubmit={(e)=> e.preventDefault()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="16px" width="16px" viewBox="0 0 24 24" className="svg"><path d="M16.4153 16.4153L20 20M18.5455 11.2727C18.5455 15.2893 15.2894 18.5454 11.2728 18.5454C7.25612 18.5454 4 15.2893 4 11.2727C4 7.2561 7.25612 4 11.2728 4C15.2894 4 18.5455 7.2561 18.5455 11.2727Z" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <input type="text" className="filterInput" className="fontAwesome" onChange={(e) => setFilter(e.target.value)} />
        </form>
        </nav>
      </header>
    )
}

export default Header
