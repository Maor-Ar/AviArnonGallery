const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Reference Firestore
const db = admin.firestore();

// Create a new gallery item
exports.createGalleryItem = functions.https.onRequest(async (req, res) => {
  const { id, title, description, images, date, tags, price } = req.body;

  if (!id || !title || !description || !images || !date || !tags) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const docRef = db.collection('galleryItems ').doc(id);
    await docRef.set({
      title,
      description,
      images,
      date,
      tags,
      price: price || null
    });
    res.status(201).send({ message: "Gallery item created successfully", id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating gallery item");
  }
});

// Get gallery items with pagination
exports.getGalleryItems = functions.https.onRequest(async (req, res) => {
  const { lastDocId, limit = 12 } = req.query;

  try {
    let query = db.collection('Gallery').orderBy('date', 'desc').limit(Number(limit));

    if (lastDocId) {
      const lastDoc = await db.collection('Gallery').doc(lastDocId).get();
      query = query.startAfter(lastDoc);
    }

    const snapshot = await query.get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching gallery items");
  }
});