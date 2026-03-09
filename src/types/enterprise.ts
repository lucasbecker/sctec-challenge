import type { Segment } from "./segment"
import type { Status } from "./status"

export type Enterprise = {
  id: string
  name: string
  entrepreneur: string
  city: string
  segment: Segment
  email: string
  phone: string
  status: Status
  document?: string
  description?: string
  createdAt: string
  updatedAt: string
}
