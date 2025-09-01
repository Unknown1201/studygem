
import type { Syllabus } from '../types';

export const syllabus: Syllabus = {
    "11th": null, // Represents "Upcoming"
    "12th": {
        "Semester Exam": {
            "Biology": {
                "1 Reproduction in Lower and Higher Plants": ["Asexual vs. Sexual Reproduction", "Pollination", "Double Fertilization", "Post-Fertilization Changes"],
                "3 Inheritance and Variation": ["Mendel's Laws", "Deviations from Mendelism", "Genetic Disorders"],
                "4 Molecular Basis of Inheritance": ["DNA Structure", "DNA Packaging", "Central Dogma", "Lac Operon"],
                "6 Plant Water Relations": ["Water Potential & Osmosis", "Transport Mechanisms", "Stomata"],
                "8 Respiration and Circulation": ["Human Respiratory System", "Human Heart & Cardiac Cycle", "Blood Groups"],
                "10 Human Health and Diseases": ["Immunity", "Malaria, AIDS, and Cancer"],
                "11 Enhancement of Food Production": ["Plant Breeding", "Tissue Culture", "Animal Husbandry"],
                "12 Biotechnology": ["Recombinant DNA Technology", "PCR"]
            },
            "Physics": {
                "1 Rotational Dynamics": ["Circular Motion", "Moment of Inertia", "Conservation of Angular Momentum"],
                "2 Mechanical Properties of Fluids": ["Surface Tension", "Capillarity", "Viscosity & Fluid Dynamics"],
                "3 Kinetic Theory of Gases and Radiation": ["Ideal Gas Laws", "Degrees of Freedom", "Radiation Laws"],
                "4 Thermodynamics": ["Laws of Thermodynamics", "Thermodynamic Processes", "Heat Engines & Refrigerators"],
                "5 Oscillations": ["Simple Harmonic Motion (SHM)", "Energy in SHM", "Composition of SHMs"],
                "6 Superposition of Waves": ["Stationary Waves", "Harmonics and Overtones", "Beats"],
                "8 Electrostatics": ["Gauss's Law", "Capacitors", "Dielectrics"],
                "9 Current Electricity": ["Kirchhoff's Laws", "Wheatstone Bridge", "Potentiometer"]
            },
            "Mathematics": {
                "1 Mathematical Logic": ["Truth Tables", "Tautology, Contradiction, Contingency", "Laws of Logic"],
                "2 Matrices": ["Inverse of a Matrix", "Solving Linear Equations"],
                "3 Trigonometric Functions": ["General Solutions", "Inverse Trigonometric Functions"],
                "7 Linear Programming": ["Formulating an LPP", "Solving LPP Graphically"],
                "1 Differentiation": ["Rules of Differentiation", "Derivatives of Functions", "Second-order derivatives"],
                "2 Probability Distributions": ["PMF and CDF", "Expected Value and Variance"],
                "8 Binomial Distribution": ["Binomial Formula", "Mean and Variance"]
            },
            "Information Technology": {
                "1 Advanced Web Designing": ["HTML5 Forms", "CSS", "Image Maps"],
                "2 Introduction to SEO": ["Types of SEO", "SEO Techniques", "Keywords"],
                "3 Advanced JavaScript": ["Objects in JS", "DOM Access", "Event Handling"]
            },
            "English": {
                "1 Prose": ["1.1 An Astrologer's Day", "1.3", "1.4", "1.6", "Personal Response"],
                "2 Poetry": ["2.1", "2.2", "2.3", "2.4", "2.5"],
                "3 Writing Skills": ["3.1 Summary Writting (3M)", "3.2 Mind Mapping (3M)", "Note Making (3M)", "3.4 Statement of With Purpose (4M)+(Op)", "3.5 Drafting a Virtual Message (4M)+(Op)", "3.6 Group Discussion (4M)+(Op)", "Op 11th's Section Three"],
                "4 Novel Genre": ["4.1 History of English Novel", "4.2 To Sire With Love", "4.3 Around The World In 80 Days (Not sure)", "Theme, Plot, & Characters"]
            }
        }
    }
};