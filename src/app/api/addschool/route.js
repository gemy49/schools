import { pool } from "../../lib/db";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact_number = formData.get("contact_number");
    const email_id = formData.get("email_id");
    const imageFile = formData.get("image"); 

    let imagePath = null;
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/schoolimages");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileExt = path.extname(imageFile.name);
      const newFileName = `${Date.now()}${fileExt}`;
      const newPath = path.join(uploadDir, newFileName);

      fs.writeFileSync(newPath, buffer);
      imagePath = `/schoolimages/${newFileName}`; 
    }

    console.log("Inserting:", {
      name,
      address,
      city,
      state,
      contact_number,
      image: imagePath,
      email_id,
    });

    const [result] = await pool.query(
      `INSERT INTO schools (name, address, city, state, contact_number, image, email_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact_number || null, imagePath, email_id]
    );

    return Response.json({ message: "School added", id: result.insertId });
  } catch (err) {
    console.error("Error in POST /api/addschool:", err);
    return Response.json({ error: "Failed to add school: " + err.message }, { status: 500 });
  }
}