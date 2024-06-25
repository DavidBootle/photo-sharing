import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { MongoClient, ObjectId } from 'mongodb';
const uri = "mongodb://mongodb:27017";
const dbName = 'photoShare';
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
    
    type Media {
        id: ID! # created and assigned by mongodb
        date: String! # human readable date of when the image was taken
        title: String! # the title of the image
        uploadDate: String! # ISO date of when the image was actually uploaded
        type: String! # type of media, either "Image", "Panorama", or "Video"
        contentURL: String! # the url to either the video or the image
        thumbnailURL: String! # the url to the thumbnail of the media
        webURL: String! # the web path that this piece of media can be accessed at
        description: String # the description, if it exists
    }

    type Collection {
        id: ID! # created and assigned by mongodb
        title: String! # the title of the collection
        description: String # the description of the collection
        media: [Media!]! # list of media items in the collection
        webURL: String! # the web path that this collection can be accessed at
    }

    # Defines the operations that the user can take for read
    type Query {
        getAllMedia: [Media]
        getMediaById(id: ID!): Media
        getMediaByURL(webURL: String!): Media
        getAllCollections: [Collection]
        getCollectionById(id: ID!): Collection
        getCollectionByURL(webURL: String!): Collection
    }

    # Defines the operations that the user can take for write
    type Mutation {

        # creates a new piece of media
        createMedia(
            date: String!,
            title: String!,
            uploadDate: String!,
            type: String!,
            contentURL: String!,
            thumbnailURL: String!,
            webURL: String!,
            description: String,
        ): Media

        # updates a piece of media
        updateMedia(
            id: ID!,
            webURL: String!,
            date: String!,
            title: String!,
            uploadDate: String!,
            type: String!,
            contentURL: String!,
            thumbnailURL: String!,
            description: String,
        ): Media

        # deletes a piece of media
        deleteMedia(id: ID!): Media

        # creates a new collection
        createCollection(
            title: String!,
            description: String,
            media: [ID!]!, # list of media IDs
            webURL: String!
        ): Collection

        # updates a collection
        updateCollection(
            id: ID!,
            title: String!,
            description: String,
            media: [ID!]!, # list of media IDs
            webURL: String!
        ): Collection

        # deletes a collection
        deleteCollection(id: ID!): Collection
    }

    schema {
        query: Query
        mutation: Mutation
    }
`;
// connect to MongoDB
const client = new MongoClient(uri);
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        getAllMedia: async (_, __, { db }) => {
            return await db.collection('media').find().toArray();
        },
        getMediaById: async (_, { id }, { db }) => {
            return await db.collection('media').findOne({ _id: new ObjectId(id) });
        },
        getMediaByWebURL: async (_, { webURL }, { db }) => {
            return await db.collection('media').findOne({ webURL });
        },
        getAllCollections: async (_, __, { db }) => {
            return await db.collection('collections').find().toArray();
        },
        getCollectionById: async (_, { id }, { db }) => {
            return await db.collection('collections').findOne({ _id: new ObjectId(id) });
        },
        getCollectionByWebURL: async (_, { webURL }, { db }) => {
            return await db.collection('collections').findOne({ webURL });
        },
    },
    Mutation: {
        createMedia: async (_, { date, title, uploadDate, type, contentURL, thumbnailURL, webURL, description }, { db }) => {
            const result = await db.collection('media').insertOne({ date, title, uploadDate, type, contentURL, thumbnailURL, webURL, description });
            return await db.collection('media').findOne({ _id: result.insertedId });
        },
        updateMedia: async (_, { id, date, title, uploadDate, type, contentURL, thumbnailURL, webURL, description }, { db }) => {
            const result = await db.collection('media').findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { date, title, uploadDate, type, contentURL, thumbnailURL, webURL, description } }, { returnDocument: 'after' });
            return result.value;
        },
        deleteMedia: async (_, { id }, { db }) => {
            const result = await db.collection('media').findOneAndDelete({ _id: new ObjectId(id) });
            return result.value;
        },
        createCollection: async (_, { title, description, media, webURL }, { db }) => {
            const mediaItems = await db.collection('media').find({ _id: { $in: media.map(id => new ObjectId(id)) } }).toArray();
            const result = await db.collection('collections').insertOne({ title, description, media: mediaItems, webURL });
            return await db.collection('collections').findOne({ _id: result.insertedId });
        },
        updateCollection: async (_, { id, title, description, media, webURL }, { db }) => {
            const mediaItems = await db.collection('media').find({ _id: { $in: media.map(id => new ObjectId(id)) } }).toArray();
            const result = await db.collection('collections').findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { title, description, media: mediaItems, webURL } }, { returnDocument: 'after' });
            return result.value;
        },
        deleteCollection: async (_, { id }, { db }) => {
            const result = await db.collection('collections').findOneAndDelete({ _id: new ObjectId(id) });
            return result.value;
        },
    },
};
async function startServer() {
    try {
        await client.connect();
        const db = client.db(dbName);
        const server = new ApolloServer({
            typeDefs,
            resolvers,
        });
        const { url } = await startStandaloneServer(server, {
            listen: { port: 4000 },
            context: async () => ({ db }),
        });
        console.log(`🚀  Server ready at: ${url}`);
    }
    catch (e) {
        console.log('Failed to start backend!');
        console.error(e);
    }
}
startServer();
