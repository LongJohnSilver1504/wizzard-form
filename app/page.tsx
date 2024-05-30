import { CreateCard } from '@/features/character/create/create-card'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center mx-auto h-full">
      <CreateCard />
    </main>
  )
}
