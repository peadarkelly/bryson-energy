export type Maybe<T> = T | null;

// ====================================================
// Documents
// ====================================================

export namespace AddUser {
  export type Variables = {
    userId: string;
    firstName: string;
    surname: string;
    email: string;
    contact: string;
    houseNumber: number;
    addressLine1: string;
    addressLine2?: Maybe<string>;
    city: string;
    postcode: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    addUser: AddUser;
  };

  export type AddUser = {
    __typename?: "User";

    userId: string;
  };
}

export namespace GetClub {
  export type Variables = {
    clubId?: Maybe<string>;
  };

  export type Query = {
    __typename?: "Query";

    getClubs: GetClubs[];
  };

  export type GetClubs = {
    __typename?: "Club";

    clubId: string;

    admin: string;

    createdDate: string;

    lastOrderDate: Maybe<string>;

    numberOfMembers: number;

    members: Members[];
  };

  export type Members = {
    __typename?: "ClubMember";

    name: string;
  };
}

export namespace GetClubs {
  export type Variables = {
    clubId?: Maybe<string>;
  };

  export type Query = {
    __typename?: "Query";

    getClubs: GetClubs[];
  };

  export type GetClubs = {
    __typename?: "Club";

    clubId: string;

    admin: string;

    numberOfMembers: number;
  };
}

export namespace GetUserSession {
  export type Variables = {
    userId: string;
  };

  export type Query = {
    __typename?: "Query";

    getUser: GetUser;
  };

  export type GetUser = {
    __typename?: "User";

    userId: string;

    clubId: Maybe<string>;
  };
}

export namespace JoinClub {
  export type Variables = {
    userId: string;
    clubId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    joinClub: JoinClub;
  };

  export type JoinClub = {
    __typename?: "User";

    clubId: Maybe<string>;
  };
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
  providedIn: "root"
})
export class AddUserGQL extends Apollo.Mutation<
  AddUser.Mutation,
  AddUser.Variables
> {
  document: any = gql`
    mutation addUser(
      $userId: ID!
      $firstName: String!
      $surname: String!
      $email: String!
      $contact: String!
      $houseNumber: Int!
      $addressLine1: String!
      $addressLine2: String
      $city: String!
      $postcode: String!
    ) {
      addUser(
        userId: $userId
        firstName: $firstName
        surname: $surname
        email: $email
        contact: $contact
        houseNumber: $houseNumber
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        city: $city
        postcode: $postcode
      ) {
        userId
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class GetClubGQL extends Apollo.Query<GetClub.Query, GetClub.Variables> {
  document: any = gql`
    query getClub($clubId: ID) {
      getClubs(clubId: $clubId) {
        clubId
        admin
        createdDate
        lastOrderDate
        numberOfMembers
        members {
          name
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class GetClubsGQL extends Apollo.Query<
  GetClubs.Query,
  GetClubs.Variables
> {
  document: any = gql`
    query getClubs($clubId: ID) {
      getClubs(clubId: $clubId) {
        clubId
        admin
        numberOfMembers
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class GetUserSessionGQL extends Apollo.Query<
  GetUserSession.Query,
  GetUserSession.Variables
> {
  document: any = gql`
    query getUserSession($userId: ID!) {
      getUser(userId: $userId) {
        userId
        clubId
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class JoinClubGQL extends Apollo.Mutation<
  JoinClub.Mutation,
  JoinClub.Variables
> {
  document: any = gql`
    mutation joinClub($userId: ID!, $clubId: ID!) {
      joinClub(userId: $userId, clubId: $clubId) {
        clubId
      }
    }
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================
