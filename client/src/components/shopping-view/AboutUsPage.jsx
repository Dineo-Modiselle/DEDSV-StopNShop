import React from 'react';
import { Github, Linkedin } from 'lucide-react';


const AboutUs = () => {





    const teamMembers = [
        {
            name: "Simon Deselske",
            role: "Co-Founder",
            image: "../src/assets/",
            bio: "I like playing around with CSS and make pages look awesome. I'm excited to collaborate with others and bring innovative ideas to life in the digital world.",
            github: "#",
            linkedin: "#"
        },
        {
            name: "Vladyslav Plugin",
            role: "Co-Founder",
            image: "../src/assets/Resume.jpg",
            bio: "I am a gamer and passionate about web development, making the online world more accessible and enjoyable for everyone.",
            github: "#",
            linkedin: "#"
        },
        {
            name: "Dineo Modiselle",
            role: "Co-Founder",
            image: "../src/assets/Dineo.jpeg",
            bio: "The development is so innovative and exciting that I have made it my favorite hobby.",
            github: "#",
            linkedin: "#"
        },
        {
            name: "Essam Almari",
            role: "Co-Founder",
            image: "../src/assets/",
            bio: "My expertise in coding, design, and user experience helps to bring ideas to life on the internet",
            github: "#",
            linkedin: "#"
        },
        {
            name: "Darly Tchibemen",
            role: "Co-Founder",
            image: "../src/assets/",
            bio: "I'm passionate about creating engaging and user-friendly websites and constantly expanding my skills in coding",
            github: "#",
            linkedin: "#"
        }
    ];



    const techStack = [
        {
            name: "MongoDB",
            image: "../src/assets/mongoDB-logo.webp",
        },
        {
            name: "Express",
            image: "../src/assets/expressJS.webp",    
        },
        {
            name: "React",
            image: "../src/assets/React_logo.png",  
        },
        {
            name: "Node",
            image: "../src/assets/nodejs-logo.svg", 
        },
        {
            name: "Tailwind",
            image: "../src/assets/tailwind.png", 
        },
        {
            name: "GitHub",
            image: "../src/assets/github.webp",
        }
    ];





    return (
        <div className=" min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-center mb-8">DEDSV</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Our histoiry</h2>
                        <p className="text-gray-700">
                            DEDSV, founded in 2025 by passionate students, was born from a shared vision: to offer innovative luxury
                            clothing for men and women. Our brand combines Italian elegance with Parisian avant-garde, creating unique pieces
                            that defy conventions. Inspired by renowned names like Zegna and Dior, we strive to push the boundaries of luxury fashion.
                            At DEDSV, we believe in the union of artisanal quality and contemporary design. Our collection, ranging from bespoke to ready-to-wear,
                            embodies boldness and refinement. DEDSV is not just a brand; it is a style statement for those who dare to stand out.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Our mission</h2>
                        <p className="text-gray-700">
                            <span className="text-4xl font-bold text-center mb-8">" </span>
                            Our mission is to offer a carefully curated selection of clothing and accessories for men and women, combining quality,
                            style, and affordability. We strive to make fashion accessible to everyone.            </p>
                    </div>
                </div>


                {/* Team Section */}
                <section className="px-4 py-15 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.name}
                                className="bg-gray-50 bg-opacity-80 rounded-lg p-6 flex flex-col items-center 
                          transform transition duration-300 hover:scale-105 relative h-[450px] sm:h-[400px] shadow-xl">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover mb-6"
                                />
                                <h2 className="text-xl font-semibold mb-1">{member.name}</h2>
                                <h6 className="text-gray-600 mb-4">{member.role}</h6>
                                <p className="text-center text-gray-700 mb-12">{member.bio}</p>
                                <div className="absolute bottom-6 flex space-x-4">
                                    <a href={member.github} className="text-gray-600 hover:text-black transition-colors ">
                                        <Github className="w-6 h-6" />
                                    </a>
                                    <a href={member.linkedin} className="text-gray-600 hover:text-black transition-colors">
                                        <Linkedin className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>


                {/* Our values */}
                <div className="mt-10 text-center">
                    <h2 className="text-2xl font-semibold mb-4">Our values</h2>
                    <ul className="inline-block text-left">
                        <li className="flex items-center mb-2">
                            <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            Quality and durability
                        </li>
                        <li className="flex items-center mb-2">
                            <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            Exceptional customer service
                        </li>
                        <li className="flex items-center mb-2">
                            <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            Innovation and creativity
                        </li>
                    </ul>
                </div>
            </div>

            {/* Tech Stack Section */}
            <section className="mt-10 mb-5 px-4">

                <h2 className="text-2xl font-semibold mb-6 text-center"> The Tech Stack</h2>
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-6 gap-8">
                    {techStack.map((tech) => (
                        <div key={tech.name}
                            className="bg-gray-100 bg-opacity-70 rounded-lg p-6 flex flex-col items-center
                          transform transition duration-300 hover:scale-105">
                            <img
                                src={tech.image}
                                alt={`${tech.name} logo`}
                                className="w-20 h-20 object-contain mb-6"
                            />
                            <div className="text-center">
                                <h2 className="text-xl font-semibold mb-4">{tech.name}</h2>

                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
