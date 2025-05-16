import { Contact } from "../model/contact.model.js";

export const handleContact = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    // Create and save contact
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      message,
    });
    const savedContact = await newContact.save();

    // ✅ Return proper JSON
    res.status(200).json({
      success: true,
      message: "Message received successfully",
      data: savedContact, // this is what frontend expects
    });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit message",
    });
  }
};
