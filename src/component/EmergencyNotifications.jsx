"use client";

import { FaExclamationTriangle, FaPhoneAlt } from "react-icons/fa";
import { IoAlertCircle } from "react-icons/io5";
import { AiFillUnlock } from "react-icons/ai";

export default function EmergencyNotifications() {
    return (

        <div className="mt-4 emergency-notifications">

            {/* High Priority Alert */}
            <div className="alert-box d-flex align-items-center gap-3">
                <FaExclamationTriangle className="alert-icon" />
                <div>
                    <h5 className="alert-title">High-priority alert</h5>
                    <p className="alert-text mb-0">
                        Lorem ipsum dollor sit alley Lorem ipsum dollor sit alley Lorem ipsum dollor sit alley
                    </p>
                </div>
            </div>

            <div className="row mt-4 gx-4">

                {/* School Status Indicator */}
                <div className="col-lg-4">
                    <div className="white-card p-4">
                        <h5 className="fw-bold">School Status Indicator</h5>

                        <div className="status-pill mt-3 mb-3">
                            <AiFillUnlock size={22} />
                            <span>Open</span>
                        </div>

                        <p className="text-muted small">
                            Lorem ipsum dollor sit alley Lorem ipsum dollor sit alley Lorem ipsum dollor sit alley
                        </p>
                    </div>

                    {/* Emergency Info */}
                    <div className="white-card p-4 mt-4">
                        <h5 className="fw-bold mb-3">Emergency info</h5>

                        <div className="emergency-btn">
                            <IoAlertCircle size={20} />
                            Emergency Procedures
                        </div>

                        <div className="emergency-btn">
                            <IoAlertCircle size={20} />
                            Evacuation Routes
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="col-lg-8">
                    <div className="white-card p-4">
                        <h5 className="fw-bold">Campus map with emergency routes</h5>
                        <div className="map-box mt-3">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6051.849904749786!2d-73.95210687255513!3d40.67562249672428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1765495600891!5m2!1sen!2s"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Directory */}
            <div className="white-card p-4 mt-4">
                <h5 className="fw-bold mb-4">Emergency contact directory</h5>

                <div className="row text-center g-4">
                    {[1, 2, 3].map((i) => (
                        <div className="col-lg-4" key={i}>
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <h6 className="m-0 fw-bold">Call Security</h6>
                                    <p className="text-muted m-0">+123 456 789</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
