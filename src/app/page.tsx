import Portfolio from "@/app/components/Portfolio";
import { Providers } from './providers'
export default function Home() {
  return (
    <Providers>
      <Portfolio />
    </Providers>
  )
}