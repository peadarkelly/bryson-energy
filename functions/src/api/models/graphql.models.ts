export type Maybe<T> = T | null;

export interface UserInput {
  userId: string;

  firstName: string;

  surname: string;

  email: string;

  contact: string;

  placeId: string;
}

export interface OrderInput {
  clubId: string;

  deadlineDate: string;

  deliveryDate: string;
}

export interface JoinOrderInput {
  userId: string;

  orderId: string;

  volume: number;

  cost: number;
}

export enum OrderStatus {
  Open = "OPEN",
  DeliveryDue = "DELIVERY_DUE",
  Completed = "COMPLETED"
}

// ====================================================
// Types
// ====================================================

export interface Query {
  user: User;

  clubs: Club[];

  club: Club;

  order: Order;
}

export interface User {
  userId: string;

  firstName: string;

  surname: string;

  email: string;

  contact: string;

  placeId: string;

  clubId?: Maybe<string>;

  club?: Maybe<Club>;
}

export interface Club {
  clubId: string;

  admin: string;

  createdDate: string;

  numberOfMembers: number;

  members: ClubMember[];

  orders: Order[];
}

export interface ClubMember {
  userId: string;

  name: string;

  isAdmin: boolean;
}

export interface Order {
  orderId: string;

  deadlineDate: string;

  deliveryDate: string;

  totalVolume: number;

  status: OrderStatus;

  numberOfParticipants: number;

  participants: (Maybe<OrderParticipant>)[];
}

export interface OrderParticipant {
  userId: string;

  name: string;

  volume: number;

  cost: number;

  cashback: number;
}

export interface Mutation {
  addUser: User;

  addClub: Club;

  joinClub: User;

  addOrder: Order;

  joinOrder: Order;
}

// ====================================================
// Arguments
// ====================================================

export interface UserQueryArgs {
  userId: string;
}
export interface ClubsQueryArgs {
  userId: string;
}
export interface ClubQueryArgs {
  clubId: string;
}
export interface OrderQueryArgs {
  clubId: string;

  orderId: string;
}
export interface AddUserMutationArgs {
  input: UserInput;
}
export interface AddClubMutationArgs {
  adminId: string;
}
export interface JoinClubMutationArgs {
  userId: string;

  clubId: string;
}
export interface AddOrderMutationArgs {
  input: OrderInput;
}
export interface JoinOrderMutationArgs {
  input: JoinOrderInput;
}
