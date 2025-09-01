"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AddSchoolSimple() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact_number: "",
    email_id: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "image" && form.image) {
        formData.append("image", form.image);
      } else if (key !== "image") {
        formData.append(key, form[key]);
      }
    });

    try {
      const res = await fetch("/api/addschool", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      setMessage(result.message || result.error);
      if (result.message) {
        alert(result.message);
        setForm({
          name: "",
          address: "",
          city: "",
          state: "",
          contact_number: "",
          email_id: "",
          image: null,
        });
        setPreview(null);
      }
    } catch (err) {
      setMessage("Error submitting form. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-dark text-white text-center">
              <h2 className="mb-0">Add New School</h2>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">School Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Address */}
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* City */}
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">City *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* State */}
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">State *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Contact Number */}
                <div className="mb-3">
                  <label htmlFor="contact_number" className="form-label">Contact Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="contact_number"
                    name="contact_number"
                    value={form.contact_number}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email_id" className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email_id"
                    name="email_id"
                    value={form.email_id}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Image Upload */}
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">School Logo (Optional)</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  {preview && (
                    <div className="mt-2">
                      <img
                        src={preview}
                        alt="Preview"
                        style={{ maxWidth: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                      />
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-dark w-100 py-2" disabled={loading}>
                  {loading ? "Saving..." : "Add School"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
