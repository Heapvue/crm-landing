"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Testimonial {
    id: number;
    company: string;
    logoSrc: string;
    quote: string;
    authorName: string;
    authorTitle: string;
    avatar: string;
    services: string[];
}

const testimonialsData: Testimonial[] = [
    {
        id: 1,
        company: "SOLVEMyHealth",
        logoSrc: "/images/clients/solvemyhealth.webp",
        quote: "“Heapsync CRM has helped us manage client details efficiently, track progress, and ensure timely follow-ups. Since personalised guidance and continuous support are integral to our service, the platform plays an important role in helping us deliver a better client experience. Thank you Team Heapvue for their excellent support, responsiveness, and willingness to understand our requirements. They have been a valuable technology partner, and we appreciate their continued assistance.”",
        authorName: "Rajiv Ambat",
        authorTitle: "Founder & CEO, SOLVEMyHealth",
        avatar: "/images/clients/rajiv-ambat.png",
        services: ["HIPAA-Compliant Sovereignty", "Customer Intelligence", "Automated Follow-ups"],
    },
    {
        id: 2,
        company: "Forsight",
        logoSrc: "/images/clients/forsight.png",
        quote: "“The architecture is robust, sovereign, and ultra-fast. It was remarkably easy to integrate with our private cloud stack. Every CRM tool is rushing to add bloated subscriptions, but there's no way to control data sprawl. Heapsync gave us sovereign ownership and zero recurring overhead.”",
        authorName: "Libin Joseph K",
        authorTitle: "Director, Forsight Group Pvt. Ltd.",
        avatar: "/images/clients/libin-joseph.jpg",
        services: ["Zero Trust Architecture", "Microsecond Latency", "Private Cloud Integration"],
    },
    {
        id: 3,
        company: "Conzaura",
        logoSrc: "/images/clients/conzaura.png",
        quote: "“Heapsync is an exceptional CRM that combines power with simplicity. Its intuitive interface ensures a smooth user experience and a very short learning curve for teams.”",
        authorName: "Somu K E",
        authorTitle: "Director, Conzauara Business Solutions Pvt. Ltd.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85",
        services: ["Commerce Intelligence", "Automated Workflows", "Perpetual License"],
    },
];

const count = testimonialsData.length;

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
    };

    return (
        <section className="testimonials-section-wrapper">
            <div className="testimonials-container">
                {/* Top Content: Badge & Heading */}
                <div className="testimonials-top-content">
                    <div className="testimonials-badge-capsule">
                        <span className="badge-bullet"></span>
                        <span className="badge-text">Testimonials</span>
                    </div>

                    <div className="trusted-heading-wrapper">
                        <h2 className="testimonials-heading">
                            <span className="testimonials-heading-accent">Trusted</span> by Businesses <br />
                            Building for the Future
                        </h2>
                    </div>
                </div>

                {/* Carousel Viewport with Peeking Next Card like in Main Site */}
                <div className="testimonials-carousel-viewport">
                    <div
                        className="testimonials-carousel-track"
                        style={{
                            transform: `translateX(calc(-${currentIndex} * (var(--tm-card-w, 1200px) + var(--tm-card-gap, 24px))))`,
                            transition: "transform 0.48s cubic-bezier(0.25, 1, 0.5, 1)",
                        }}
                    >
                        {testimonialsData.map((item, idx) => (
                            <div
                                key={item.id}
                                className={`testimonial-card ${idx === currentIndex ? "active" : ""}`}
                            >
                                {/* Large B&W Client Image covering full height & ~40% width, dispersing to the right */}
                                <div className="testimonial-bg-image-wrapper">
                                    <img
                                        src={item.avatar}
                                        alt={item.authorName}
                                        className="testimonial-card-bg-photo"
                                    />
                                    <div className="testimonial-photo-dispersion-overlay"></div>
                                </div>

                                {/* Card Content layer sitting above the image */}
                                <div className="testimonial-card-content-layer">
                                    {/* Top Row: Company Logo on Right Side */}
                                    <div className="testimonial-card-top-header">
                                        <div className="testimonial-card-logo-container">
                                            <img
                                                src={item.logoSrc}
                                                alt={item.company}
                                                className="testimonial-client-logo-img"
                                            />
                                        </div>
                                    </div>

                                    {/* Middle: Client Message */}
                                    <p className="testimonial-quote">
                                        {item.quote}
                                    </p>

                                    {/* Bottom: Services boxes we did for client + Name & Designation */}
                                    <div className="testimonial-card-bottom-info">
                                        <div className="testimonial-services-tags">
                                            {item.services.map((service, sIdx) => (
                                                <span key={sIdx} className="testimonial-service-pill">
                                                    {service}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="testimonial-author-wrapper">
                                            <h5 className="author-name">{item.authorName}</h5>
                                            <p className="author-title">{item.authorTitle}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Carousel Navigation Buttons like in Main Site (No numbers) */}
                <div className="testimonials-nav-buttons">
                    <button
                        type="button"
                        onClick={handlePrev}
                        className="testimonials-nav-btn prev-btn"
                        aria-label="Previous testimonial"
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <button
                        type="button"
                        onClick={handleNext}
                        className="testimonials-nav-btn next-btn"
                        aria-label="Next testimonial"
                    >
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
}
