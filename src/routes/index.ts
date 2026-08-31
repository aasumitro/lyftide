import { createFileRoute } from "@tanstack/react-router"
import { Homeland } from "@/features/homeland"

export const Route = createFileRoute("/")({
  component: Homeland,
})
