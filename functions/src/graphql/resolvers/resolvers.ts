import { firestore as fire } from 'firebase-admin'
import { IResolvers } from 'graphql-tools'

interface User {
  firstName: string
  surname: string
  email: string
  contact: string
  houseNumber: number
  addressLine1: string
  addressLine2?: string
  city: string
  postcode: string
  clubId?: string
}

interface Club {
  clubId: string
  admin: string
  createdDate: Date
  lastOrderDate?: Date
  numberOfMembers: number
}

function mapToUser(args: any): User {
  return {
    firstName: args.firstName,
    surname: args.surname,
    email: args.email,
    contact: args.contact,
    houseNumber: args.houseNumber,
    addressLine1: args.addressLine1,
    addressLine2: args.addressLine2,
    city: args.city,
    postcode: args.postcode
  }
}

function mapToClub(docRef: string, doc: any): Club {
  return {
    clubId: docRef,
    admin: doc.admin,
    createdDate: doc.createdDate,
    lastOrderDate: doc.lastOrderDate,
    numberOfMembers: doc.numberOfMembers
  }
}

const resolvers: IResolvers = {
  Query: {
    getUser: async (parent: any, args: any, ctx: { firestore: fire.Firestore }) => {
      try {
        const user = await ctx.firestore.collection('users').doc(args.userId).get()

        if (!user.exists) {
          throw new Error('User not found')
        }

        return user.data()
      } catch (err) {
        throw err
      }
    },
    getClubs: async (parent: any, args: any, ctx: { firestore: fire.Firestore }) => {
      try {
        const clubsReference = ctx.firestore.collection('clubs')

        if (args.clubId) {
          clubsReference.doc(args.clubId)
        }

        const clubs: fire.QuerySnapshot = await clubsReference.get()

        // TODO filter clubs in range

        return clubs.docs.map(doc => mapToClub(doc.ref.id, doc.data()))
      } catch (err) {
        throw err
      }
    }
  },
  Mutation: {
    addUser: async (parent: any, args: any, ctx: { firestore: fire.Firestore }) => {
      try {
        if ((await ctx.firestore.collection('users').doc(args.userId).get()).exists) {
          throw new Error('userId already exists')
        }

        const user: User = mapToUser(args)
        await ctx.firestore.collection('users').doc(args.userId).set(user)
        return user
      } catch (err) {
        throw err
      }
    },
    joinClub: async (parent: any, args: any, ctx: { firestore: fire.Firestore }) => {
      // TODO - check club exists

      await ctx.firestore.collection('users').doc(args.userId).update({ clubId: args.clubId})
      return (await ctx.firestore.collection('users').doc(args.userId).get()).data()
    }
  }
}

export default resolvers