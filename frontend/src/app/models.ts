export interface ClubSummary {
  clubId: number
  admin: string
  numberOfMembers: number
}

export interface Club extends ClubSummary {
  createdDate: Date
  lastOrderDate?: Date
  members: ClubMember[]
}

export interface ClubMember {
  name: string
}
