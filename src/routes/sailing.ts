import { createFileRoute } from "@tanstack/react-router"
import { Sailing } from "@/features/sailing"

export const Route = createFileRoute("/sailing")({
  component: Sailing,
})
