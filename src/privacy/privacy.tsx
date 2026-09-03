import './privacy.css'
import { Analytics } from '@vercel/analytics/react'

export default function Privacy() {
  return (
    <main className="privacy-page">
      <h1>Privacy Policy</h1>
      <p className="privacy-updated">Lorem ipsum dolor sit amet — placeholder copy, not a real policy.</p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>

      <h2>Sed Do Eiusmod</h2>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Curabitur pretium tincidunt lacus, nulla gravida orci a odio.
      </p>

      <h2>Quis Nostrud Exercitation</h2>
      <p>
        Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis
        sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus
        vulputate vehicula. Donec lobortis risus a elit.
      </p>
      <p>
        Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt
        sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque
        malesuada nulla a mi.
      </p>

      <h2>Excepteur Sint Occaecat</h2>
      <p>
        Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut
        dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis
        scelerisque nunc. Nullam arcu.
      </p>

      <h2>Sunt In Culpa</h2>
      <p>
        Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean
        magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst.
      </p>

      <a className="privacy-back" href="/">
        Back home
      </a>
      <Analytics />
    </main>
  )
}
