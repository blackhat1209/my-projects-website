// frontend/api/projects.js
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://projectsuser:projects123@myprojectscluster.cz0hzbc.mongodb.net/?retryWrites=true&w=majority&appName=MyProjectsCluster";
let cachedClient = null;

export default async function handler(req, res) {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await cachedClient.connect();
  }
  const db = cachedClient.db("myprojectsdb");
  const collection = db.collection("projects");
  if (req.method === "GET") {
    const projects = await collection.find({}).toArray();
    res.status(200).json(projects);
  } else if (req.method === "POST") {
    // Add admin check if desired
    const result = await collection.insertOne(req.body);
    res.status(201).json({ success: true, projectId: result.insertedId });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
