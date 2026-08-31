import { createFileRoute } from "@tanstack/react-router"
import { Fishing } from "@/features/fishing"

export const Route = createFileRoute("/fishing")({
  component: Fishing,
})
