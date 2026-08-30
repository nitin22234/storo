import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from '../components/MotionEffects';

function Locations() {
    const navigate = useNavigate();

    const cities = [
        { name: 'Delhi', partners: 45, image: '🏛️' },
        { name: 'Mumbai', partners: 38, image: '🌴' },
        { name: 'Bangalore', partners: 32, image: '🌳' },
        { name: 'Goa', partners: 28, image: '🏖️' },
        { name: 'Jaipur', partners: 22, image: '🕌' },
        { name: 'Kolkata', partners: 20, image: '🦚' }
    ];

    return (
        <div style={{ backgroundColor: "#ffffff", minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem', color: "#1a1a1a", position: "relative", overflow: "hidden" }}>
            <div className="container" style={{ maxWidth: '1000px', position: "relative", zIndex: 1 }}>
                <FadeIn direction="up">
                    <div className="text-center mb-5">
                        <motion.span
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="d-inline-block mb-2"
                            style={{ fontSize: '3.5rem' }}
                        >
                            📍
                        </motion.span>
                        <h2 className="fw-bold mb-2" style={{ color: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}>Our Locations</h2>
                        <p style={{ color: '#6b7280' }}>Find verified storage partners in top destinations across India</p>
                    </div>
                </FadeIn>

                <StaggerContainer staggerChildren={0.1} className="row g-4">
                    {cities.map((city, index) => (
                        <div className="col-md-6 col-lg-4" key={index}>
                            <StaggerItem className="h-100">
                                <HoverCard
                                    className="bg-white shadow-sm p-4 rounded-4 h-100 text-center border"
                                    style={{
                                        cursor: 'pointer',
                                        borderRadius: '1.25rem'
                                    }}
                                    onClick={() => navigate('/find-storage', { state: { searchQuery: city.name } })}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 8 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                        className="mb-3 d-inline-block"
                                        style={{ fontSize: '3.5rem' }}
                                    >
                                        {city.image}
                                    </motion.div>
                                    <h4 className="fw-bold mb-1" style={{ color: '#1a202c' }}>{city.name}</h4>
                                    <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: "0.95rem" }}>
                                        {city.partners} storage partners
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn btn-sm fw-semibold"
                                        style={{
                                            background: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
                                            color: 'white',
                                            border: 'none',
                                            padding: '0.6rem 1.5rem',
                                            borderRadius: '0.6rem'
                                        }}
                                    >
                                        View Partners →
                                    </motion.button>
                                </HoverCard>
                            </StaggerItem>
                        </div>
                    ))}
                </StaggerContainer>
            </div>
        </div>
    );
}

export default Locations;
