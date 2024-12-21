import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@merncluster.qifq6.mongodb.net/?retryWrites=true&w=majority&appName=MernCluster`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function connectDB() {
    try {
        await client.connect();
        await client.db("Library-Management-System").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return client.db("Library-Management-System")
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

const getDB = () => {
    if (!client.db("Library-Management-System")) {
        console.log('No databae Found')
    }
    return client.db("Library-Management-System")
}

export { connectDB, getDB }