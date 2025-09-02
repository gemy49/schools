"use client";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSchool,
  faMapMarkerAlt,
  faEnvelope,
  faPhoneAlt,
  faBuilding,
  faImage
} from '@fortawesome/free-solid-svg-icons';

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
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        {/* Header */}
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-lg-8 text-center">
            <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
              <FontAwesomeIcon icon={faBuilding} className="text-primary fa-2x" />
            </div>
            <h2 className="h1 mb-2 fw-bold">All Schools</h2>
            <p className="text-muted fs-5 mb-0">Browse and manage all registered schools in the system</p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 h5 text-muted">Fetching schools...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="alert alert-danger text-center py-3 d-flex align-items-center justify-content-center gap-2">
            <FontAwesomeIcon icon={faExclamationCircle} />
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* No Schools Found */}
        {!loading && !error && schools.length === 0 && (
          <div className="text-center py-5">
            <FontAwesomeIcon icon={faSchool} size="3x" className="text-muted mb-3" style={{ opacity: 0.4 }} />
            <h5 className="text-muted">No schools found</h5>
            <p className="text-muted small">Be the first to add a school!</p>
          </div>
        )}

        {/* Schools Grid */}
        {!loading && !error && schools.length > 0 && (
          <div className="row g-5">
            {schools.map((school) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={school.id}>
                <div className="card shadow-sm border-0 h-100 hover-shadow transition-all" style={{ borderRadius: '14px', overflow: 'hidden' }}>
                  {/* School Image */}
                  <div className="bg-primary" style={{ height: '180px' }}>
                    {school.image ? (
                      <img
                        src={school.image}
                        alt={school.name}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x180?text=No+Image';
                          e.target.alt = 'Image not available';
                        }}
                      />
                    ) : (
                      <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-light">
                        <FontAwesomeIcon icon={faImage} size="2x" className="text-secondary" />
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="card-body p-4">
                    <h5 className="card-title mb-3 fw-bold text-dark">{school.name}</h5>

                    <ul className="list-unstyled small text-muted mb-3">
                      <li className="d-flex align-items-start mb-2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary me-2 mt-1" />
                        <span>
                          <strong>Address:</strong> {school.address}, {school.city}, {school.state}
                        </span>
                      </li>
                      <li className="d-flex align-items-start mb-2">
                        <FontAwesomeIcon icon={faEnvelope} className="text-primary me-2 mt-1" />
                        <span>
                          <strong>Email:</strong> {school.email_id}
                        </span>
                      </li>
                      {school.contact_number && (
                        <li className="d-flex align-items-start mb-0">
                          <FontAwesomeIcon icon={faPhoneAlt} className="text-primary me-2 mt-1" />
                          <span>
                            <strong>Phone:</strong> {school.contact_number}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}