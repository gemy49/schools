"use client";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/getschools");
        if (!res.ok) throw new Error("Failed to fetch schools");
        const data = await res.json();
        setSchools(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center mb-4">
        <div className="col-md-8 text-center">
          <h2 className="mb-0">All Schools</h2>
          <p className="text-muted">Browse and view all registered schools</p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Fetching schools...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-danger text-center py-3">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Schools Grid */}
      {!loading && !error && schools.length === 0 && (
        <div className="text-center py-5">
          <img src="/globe.svg" alt="No schools" style={{ width: "100px", opacity: 0.5 }} />
          <p className="text-muted mt-3">No schools found. Add one now!</p>
        </div>
      )}

      {!loading && !error && schools.length > 0 && (
        <div className="row g-4">
          {schools.map((school) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={school.id}>
              <div className="card h-100 shadow-sm border-0 hover-shadow">
                {/* Image */}
                {school.image ? (
                  <img
                    src={school.image}
                    alt={school.name}
                    className="card-img-top"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px"
                    }}
                    onError={(e) => {
                      e.target.src = "/file.svg"; // Fallback image
                      e.target.alt = "Default School Logo";
                    }}
                  />
                ) : (
                  <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: "200px" }}>
                    <img src="/file.svg" alt="No image" style={{ width: "60px", opacity: 0.6 }} />
                  </div>
                )}

                <div className="card-body p-3">
                  <h5 className="card-title mb-2">{school.name}</h5>
                  <p className="card-text text-muted small mb-2">
                    <strong>Address:</strong> {school.address}, {school.city}, {school.state}
                  </p>
                  <p className="card-text text-muted small mb-2">
                    <strong>Email:</strong> {school.email_id}
                  </p>
                  {school.contact_number && (
                    <p className="card-text text-muted small mb-0">
                      <strong>Phone:</strong> {school.contact_number}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}