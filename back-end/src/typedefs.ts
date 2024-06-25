const typeDefs = `#graphql
    
    type Media {
        id: ID! # created and assigned by mongodb
        date: String! # human readable date of when the image was taken
        title: String! # the title of the image
        uploadDate: String! # ISO date of when the image was actually uploaded
        type: String! # type of media, either "Image", "Panorama", or "Video"
        contentURL: String! # the url to either the video or the image
        thumbnailURL: String! # the url to the thumbnail of the media
        URL: String! # the web path that this piece of media can be accessed at
        description: String # the description, if it exists
    }

    type Collection {
        id: ID! # created and assigned by mongodb
        title: String! # the title of the collection
        description: String # the description of the collection
        media: [Media!]! # list of media items in the collection
        URL: String! # the web path that this collection can be accessed at
    }

    # Defines the operations that the user can take for read
    type Query {
        getAllMedia: [Media]
        getMediaById(id: ID!): Media
        getMediaByURL(URL: String!): Media
        getAllCollections: [Collection]
        getCollectionById(id: ID!): Collection
        getCollectionByURL(URL: String!): Collection
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
            URL: String!,
            description: String,
        ): Media

        # updates a piece of media
        updateMedia(
            id: ID!,
            URL: String!,
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
            URL: String!
        ): Collection

        # updates a collection
        updateCollection(
            id: ID!,
            title: String!,
            description: String,
            media: [ID!]!, # list of media IDs
            URL: String!
        ): Collection

        # deletes a collection
        deleteCollection(id: ID!): Collection
    }

    schema {
        query: Query
        mutation: Mutation
    }
`;
export default typeDefs;