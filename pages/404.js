import Link from 'next/link'
import Image from 'next/image'

export default function FourOhFour() {
  return <div className="fourpage" data-aos="fade-up">
    <Image src="/main_how_to_design_404_page.png" width={300} height={300}/>
    <div className="content">
      <h1>Page Not Found</h1>
      <h2>This page is hopefully coming soon!</h2>
      <Link href="/">
          Go back home
      </Link>

    </div>
  </div>
}