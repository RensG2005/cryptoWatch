import Link from "next/link"
import { useState, useRef, useEffect } from "react"

function Header({setFilter, searchDisabled}) {

  const [show, setShow] = useState(false)
  let inputRef = useRef()

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if(inputRef.current && !searchDisabled) {
        inputRef.current.focus()
      }
    })
  }, [])

    return (
        <header>
          <Link href="/">
            <h1 className="logo">CryptoWatch</h1>
          </Link>

        <nav className="normalNav">
          <Link href="/exchanges">
            Exchanges
          </Link>
          <Link href="/watchlist">
            Watchlist
          </Link>
          <Link href="/events">
            Events
          </Link>
        {searchDisabled ? "" : (
          <form className="filterForm"  onSubmit={(e)=> e.preventDefault()}>
            <input ref={inputRef} placeholder="Type" type="text" className="filterInputHeader"  onChange={(e) => setFilter(e.target.value)} />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="16px" width="16px" viewBox="0 0 24 24" className="svg"><path d="M16.4153 16.4153L20 20M18.5455 11.2727C18.5455 15.2893 15.2894 18.5454 11.2728 18.5454C7.25612 18.5454 4 15.2893 4 11.2727C4 7.2561 7.25612 4 11.2728 4C15.2894 4 18.5455 7.2561 18.5455 11.2727Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </form>
        )}
        </nav>

      <nav className="mobileNav">

        <button className={show ? "menu opened" : "menu"} onClick={() => setShow(!show)} aria-label="Main Menu">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
            <path className="line line2" d="M 20,50 H 80" />
            <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
          </svg>
        </button>

        <div className={show ? "shown" : "hide"}>
          <Link href="/exchanges">
            Exchanges
          </Link>
          <Link href="/watchlist">
            Watchlist
          </Link>
          <Link href="/events">
            Events
          </Link>
          {searchDisabled ? "" : (
              <form className="filterForm"  onSubmit={(e)=> e.preventDefault()}>
                <input ref={inputRef} placeholder="Type" type="text" className="filterInputHeader"  onChange={(e) => setFilter(e.target.value)} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="16px" width="16px" viewBox="0 0 24 24" className="svg"><path d="M16.4153 16.4153L20 20M18.5455 11.2727C18.5455 15.2893 15.2894 18.5454 11.2728 18.5454C7.25612 18.5454 4 15.2893 4 11.2727C4 7.2561 7.25612 4 11.2728 4C15.2894 4 18.5455 7.2561 18.5455 11.2727Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </form>
            )}
        </div>
      </nav>

      </header>

    )
}

export default Header
