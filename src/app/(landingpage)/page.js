import Featured from "@/components/(landingpage)/Featured";
import Hero from "@/components/(landingpage)/Hero";
import Sale from "@/components/(landingpage)/Sale";
import Products from "@/components/(landingpage)/Products";


export default function Home() {
  return (
    <div>
      <Hero />
      <Sale />
      <Featured />
      <Products />
    </div>
  )
}
