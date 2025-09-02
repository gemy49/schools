"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Import FontAwesome components and icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSchool,
  faMapMarkerAlt,
  faCity,
  faGlobeAmericas,
  faPhoneAlt,
  faEnvelope,
  faImage,
  faCloudUploadAlt,
  faTimes,
  faPlusCircle,
  faSpinner,
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

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
    <div className="bg-light min-vh-100 d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-7">
            <div className="card shadow-lg border-0">
              {/* Header */}
              <div className="card-header bg-dark text-white text-center py-4">
                <div
                  className="bg-white bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: '80px', height: '80px' }}
                >
                  <FontAwesomeIcon icon={faSchool} className="text-white fa-2x" />
                </div>
                <h1 className="h2 mb-2 fw-bold">Add New School</h1>
                <p className="mb-0 opacity-75">Enter the school details to register it in the system</p>
              </div>

              {/* Form Body */}
              <div className="card-body p-4 p-md-5">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  {/* Success/Error Message */}
                  {message && (
                    <div
                      className={`alert d-flex align-items-center mb-4 ${
                        message.includes('successfully') || !message.includes('Error')
                          ? 'alert-success'
                          : 'alert-danger'
                      }`}
                      role="alert"
                    >
                      <FontAwesomeIcon
                        icon={message.includes('successfully') || !message.includes('Error') ? faCheckCircle : faExclamationCircle}
                        className="me-2"
                      />
                      <div>{message}</div>
                    </div>
                  )}

                  <div className="row g-4">
                    {/* School Name */}
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label fw-semibold d-flex align-items-center">
                        <FontAwesomeIcon icon={faSchool} className="me-2 text-primary" />
                        School Name *
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter school name"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label htmlFor="email_id" className="form-label fw-semibold d-flex align-items-center">
                        <FontAwesomeIcon icon={faEnvelope} className="me-2 text-primary" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="email_id"
                        name="email_id"
                        value={form.email_id}
                        onChange={handleChange}
                        placeholder="school@example.com"
                        required
                      />
                    </div>

                    {/* Address */}
                    <div className="col-12">
                      <label htmlFor="address" className="form-label fw-semibold d-flex align-items-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-primary" />
                        Address *
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Enter complete address"
                        required
                      />
                    </div>

                    {/* City */}
                    <div className="col-md-6">
                      <label htmlFor="city" className="form-label fw-semibold d-flex align-items-center">
                        <FontAwesomeIcon icon={faCity} className="me-2 text-primary" />
                        City *
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="city"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                        required
                      />
                    </div>

                    {/* State */}
                    <div className="col-md-6">
                      <label htmlFor="state" className="form-label fw-semibold d-flex align-items-center">
                        <FontAwesomeIcon icon={faGlobeAmericas} className="me-2 text-primary" />
                        State *
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="state"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        placeholder="Enter state"
                        required
                      />
                    </div>

                    {/* Contact Number */}
                    <div className="col-md-6">
                      <label htmlFor="contact_number" className="form-label fw-semibold d-flex align-items-center">
                        <FontAwesomeIcon icon={faPhoneAlt} className="me-2 text-primary" />
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        className="form-control form-control-lg"
                        id="contact_number"
                        name="contact_number"
                        value={form.contact_number}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    {/* Image Upload */}
                    <div className="col-12">
                      <label className="form-label fw-semibold d-flex align-items-center">
                        <FontAwesomeIcon icon={faImage} className="me-2 text-primary" />
                        School Logo (Optional)
                      </label>
                      <div
                        className="border border-2 border-dashed rounded-3 p-4 text-center bg-light"
                        style={{ cursor: 'pointer', minHeight: '200px' }}
                        onClick={() => document.getElementById("image").click()}
                      >
                        <input
                          type="file"
                          id="image"
                          name="image"
                          accept="image/*"
                          className="d-none"
                          onChange={handleChange}
                        />
                        {preview ? (
                          <div className="position-relative d-inline-block">
                            <img
                              src={preview}
                              alt="School logo preview"
                              className="img-fluid rounded-2 shadow-sm"
                              style={{ maxHeight: '200px', objectFit: 'cover' }}
                            />
                            <button
                              type="button"
                              className="btn btn-danger btn-sm rounded-circle position-absolute top-0 end-0 translate-middle"
                              style={{ width: '32px', height: '32px' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreview(null);
                                setForm((prev) => ({ ...prev, image: null }));
                                document.getElementById("image").value = "";
                              }}
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          </div>
                        ) : (
                          <div className="d-flex flex-column align-items-center justify-content-center py-4">
                            <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" className="text-muted mb-3" />
                            <h5 className="text-dark mb-2">Click to upload </h5>
                            <p className="text-muted mb-0">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-dark btn-lg w-100 mt-4 py-3 fw-medium"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                        <span>Adding School...</span>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
                        <span>Add School</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}