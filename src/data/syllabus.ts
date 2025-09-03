
import type { Syllabus } from '../types';

export const syllabus: Syllabus = {
    "11th": null, // Represents "Upcoming"
    "12th": {
        "Semester Exam": {
            "Physics": {
                "1 Rotational Dynamics": [
                    "Circular Motion: Differentiate between uniform and non-uniform circular motion. Understand the concepts of centripetal force and centrifugal force, and how they apply in different frames of reference.",
                    "Applications of Uniform Circular Motion: Analyze the dynamics of a vehicle on a horizontal circular track , and on a banked road, including the most safe speed. Know the working principle of a conical pendulum. Understand the physics of a \"well of death\" and the minimum speed required.",
                    "Vertical Circular Motion: Study the dynamics of a point mass attached to a string or a rod. Differentiate the conditions and minimum speeds at the uppermost and lowermost points.",
                    "Moment of Inertia: Define moment of inertia as the rotational analogue of mass. Learn the expressions for the moment of inertia of a uniform ring (I=MR^2) and a uniform disc (I= 1/2 MR^2). Understand the concept of radius of gyration (I=MK^2).",
                    "Theorems: Apply the theorem of parallel axes and the theorem of perpendicular axes to solve problems.",
                    "Rotational Kinematics and Dynamics: Relate angular momentum to angular velocity (L=Iω). Express torque in terms of moment of inertia (τ=Iα). Understand the principle of conservation of angular momentum and its real-world applications.",
                    "Rolling Motion: Differentiate between translational and rotational kinetic energy during rolling motion. Derive expressions for the acceleration and final velocity of an object rolling down an inclined plane."
                ],
                "2 Mechanical Properties of Fluids": [
                    "Pressure: Define pressure and atmospheric pressure. Derive the expression for pressure due to a liquid column (P=hρg). Understand the concepts of absolute pressure and gauge pressure.",
                    "Pascal's Law: State Pascal's law and its applications in a hydraulic lift and hydraulic brakes.",
                    "Surface Tension: Explain surface tension based on the molecular theory. Define surface energy and its relationship with surface tension (dW=T(dA)). Understand the concept of the angle of contact and its effect on the meniscus. Know the factors affecting surface tension and the excess pressure inside a liquid drop or bubble.",
                    "Viscosity: Define viscosity and viscous drag. Learn Stokes' law (Fv =6πηrv) and derive the expression for terminal velocity.",
                    "Fluid Dynamics: Understand the characteristics of streamline flow and turbulent flow. State the equation of continuity (A1 v1 =A2 v2) and its significance.",
                    "Bernoulli's Equation: State Bernoulli's equation (P+ 1/2 ρv^2 +ρgh= constant) and its applications, such as speed of efflux and the Venturi tube."
                ],
                "3 Kinetic Theory of Gases and Radiation": [
                    "Gases: Differentiate between an ideal gas and a real gas. Understand the concept of mean free path.",
                    "Kinetic Theory: Derive the expression for pressure of an ideal gas based on kinetic theory. Relate temperature to the average kinetic energy of gas molecules.",
                    "Root Mean Square (rms) Speed: Understand the concept of rms speed and its relation to temperature and molar mass (v_rms = sqrt(3RT/M0)).",
                    "Law of Equipartition of Energy: State the law of equipartition of energy. Apply it to calculate the molar specific heats (Cv, Cp) for monatomic, diatomic, and polyatomic gases.",
                    "Mayer's Relation: Understand Mayer's relation (Cp −Cv =R) and its importance.",
                    "Radiation: Explain Kirchhoff's law of heat radiation (a=e). Understand the spectral distribution of blackbody radiation and Wien's displacement law."
                ],
                "4 Thermodynamics": [
                    "Zeroth Law of Thermodynamics: Define thermal equilibrium and state the Zeroth Law.",
                    "First Law of Thermodynamics: Define internal energy and work. State the First Law of Thermodynamics (ΔU=Q−W). Apply the law to different thermodynamic processes: isothermal, isobaric, isochoric, and adiabatic.",
                    "Second Law of Thermodynamics: Understand the concept of a spontaneous process and the role of entropy."
                ],
                "5 Oscillations": [
                    "Simple Harmonic Motion (S.H.M.): Define S.H.M. and its properties. Understand the differential equation of S.H.M. and derive expressions for displacement, velocity, and acceleration.",
                    "Energy in S.H.M.: Derive expressions for kinetic energy, potential energy, and total energy of a particle in S.H.M.. Show that the total energy is conserved.",
                    "Simple Pendulum: State the laws of a simple pendulum and derive the expression for its period of oscillation (T=2π sqrt(L cos θ / g)).",
                    "Damped and Forced Oscillations: Understand the concepts of damped oscillations, forced oscillations, and resonance."
                ],
                "6 Superposition of Waves": [
                    "Wave Phenomena: Explain the reflection of waves from denser and rarer media, including phase changes.",
                    "Standing Waves: Understand the formation of stationary waves and the properties of nodes and antinodes.",
                    "Strings and Pipes: Analyze stationary waves formed in strings, and in air columns in pipes with open and closed ends.",
                    "Beats: Understand the formation of beats and the beat frequency (N=n1 −n2)."
                ],
                "8 Electrostatics": [
                    "Gauss's Law: State Gauss's Law and use it to find the electric field of a symmetric charge distribution.",
                    "Electric Potential: Relate electric potential to work done and potential energy.",
                    "Conductors and Dielectrics: Distinguish between conductors and insulators. Understand the concept of polarization in dielectrics.",
                    "Capacitors: Define capacitance and discuss the energy stored in a capacitor."
                ],
                "9 Current Electricity": [
                    "Kirchhoff's Laws: State and apply Kirchhoff's current law (junction rule) and voltage law (loop rule) to analyze electrical circuits.",
                    "Electrical Instruments: Understand the principle and applications of a potentiometer for comparing electromotive forces (emfs) and measuring internal resistance of a cell.",
                    "Meter Bridge: Know the principle of a Wheatstone's network and how a meter bridge is used to find an unknown resistance.",
                    "Galvanometer: Explain how a galvanometer can be converted into an ammeter or a voltmeter using suitable shunt or series resistance."
                ],
                "10 Magnetic Fields due to Electric Current": [
                    "Magnetic Force: Understand the magnetic force on a moving charge and a current-carrying wire in a magnetic field (Lorentz force).",
                    "Biot-Savart Law: State the Biot-Savart law and use it to calculate the magnetic field due to a current in a straight wire and a circular loop.",
                    "Ampere's Law: Use Ampere's Law to find the magnetic field for symmetric current distributions.",
                    "Magnetic Dipole Moment: Define the magnetic dipole moment of a current loop and its behavior in a magnetic field.",
                    "Cyclotron Motion: Describe the circular motion of a charged particle in a uniform magnetic field."
                ]
            },
            "Chemistry": {
                "1 Solid State": [
                    "Types of Solids: Differentiate between crystalline and amorphous solids.",
                    "Crystal Systems: Classify crystals based on their unit cell parameters. Study the cubic system in detail, including primitive, body-centered cubic (bcc), and face-centered cubic (fcc) cells.",
                    "Packing and Defects: Understand the packing of particles in crystal lattices, including coordination number and packing efficiency. Learn about various crystal defects such as Schottky and Frenkel defects.",
                    "Properties: Explain the electrical properties of solids (conductors, insulators, semiconductors) using band theory. Classify solids based on their magnetic properties (diamagnetic, paramagnetic, ferromagnetic)."
                ],
                "2 Solutions": [
                    "Solubility: Understand the factors affecting the solubility of solids and gases, including Henry's law for gases in liquids.",
                    "Vapour Pressure: Learn Raoult's law for volatile and non-volatile solutes. Differentiate between ideal and non-ideal solutions.",
                    "Colligative Properties: Define colligative properties and derive expressions for lowering of vapor pressure, elevation of boiling point, depression of freezing point, and osmotic pressure.",
                    "Van't Hoff Factor: Understand the Van't Hoff factor and its relation to the degree of dissociation of electrolytes."
                ],
                "3 Ionic Equilibria": [
                    "Acids and Bases: Study the Arrhenius, Brønsted-Lowry, and Lewis theories of acids and bases.",
                    "Dissociation: Understand the dissociation of weak acids and bases and the Ostwald's dilution law.",
                    "pH and Hydrolysis: Define pH and pOH. Explain the concept of salt hydrolysis and the nature of solutions of different types of salts.",
                    "Buffers: Understand buffer solutions and the Henderson-Hasselbalch equation.",
                    "Solubility Product: Define solubility product (Ksp) and its relationship with molar solubility."
                ],
                "4 Chemical Thermodynamics": [
                    "Fundamentals: Distinguish between a system and its surroundings, and between extensive and intensive properties.",
                    "Laws of Thermodynamics: State and apply the First Law of Thermodynamics (ΔU=Q−W). Understand the concepts of enthalpy, entropy, and Gibbs free energy.",
                    "Processes: Differentiate between isothermal, isobaric, isochoric, and adiabatic processes."
                ],
                "5 Electrochemistry": [
                    "Electrolytes: Learn about electrolytic conductors and Kohlrausch's law.",
                    "Electrochemical Cells: Understand the working of galvanic and electrolytic cells.",
                    "Nernst Equation: Derive the Nernst equation to calculate electrode potentials.",
                    "Batteries: Study the construction and reactions of dry cells, lead storage batteries, and fuel cells."
                ],
                "11 Alcohols, Phenols and Ethers": [
                    "Nomenclature and Properties: Learn the common and IUPAC names of these compounds. Study their physical properties, such as boiling point and solubility, based on intermolecular forces.",
                    "Reactions: Understand the acidic nature of alcohols and phenols and their reactions due to the cleavage of the O-H and C-O bonds."
                ],
                "12 Aldehydes, Ketones and Carboxylic acids": [
                    "Nomenclature and Preparation: Learn the common and IUPAC names. Study the methods of preparing aldehydes, ketones, and carboxylic acids from various organic compounds.",
                    "Chemical Properties: Understand the nucleophilic addition reactions of aldehydes and ketones. Explain the acidic character of carboxylic acids and the influence of electronic effects on their acidity."
                ],
                "15 Introduction to Polymer Chemistry": [
                    "Classification: Classify polymers based on their source, structure, mode of polymerization, and intermolecular forces.",
                    "Important Polymers: Study the preparation, properties, and uses of key polymers like natural and vulcanized rubber, polythene (LDP, HDP), Teflon, nylon, and Bakelite.",
                    "Special Polymers: Understand biodegradable polymers like PHBV and nylon 2-nylon 6."
                ]
            },
            "Biology": {
                "1 Reproduction in Lower and Higher Plants": [
                    "Asexual Reproduction: Fragmentation, budding, and spore formation.",
                    "Vegetative Propagation: Natural and artificial methods like cutting and grafting.",
                    "Sexual Reproduction: Events like pre-fertilization, fertilization, and post-fertilization.",
                    "Pollination: Types of pollination (autogamy, geitonogamy, xenogamy) and pollinating agents.",
                    "Fertilization: Describe the process of double fertilization, including syngamy and triple fusion.",
                    "Embryo and Seed Development: Explain the development of endosperm and dicot and monocot embryos.",
                    "Special Mechanisms: Understand apomixis, parthenocarpy, and polyembryony."
                ],
                "3 Inheritance and Variation": [
                    "Mendelian Genetics: Know the reasons for Mendel's success. Define important genetic terms like alleles, genotype, phenotype, homozygous, and heterozygous.",
                    "Laws of Inheritance: State and explain the Law of Dominance, Law of Segregation, and Law of Independent Assortment.",
                    "Deviations from Mendelism: Learn about incomplete dominance, codominance, and pleiotropy.",
                    "Chromosomes and Genes: Explain the chromosomal theory of inheritance, linkage, and crossing over. Understand sex-linked inheritance, including color blindness and hemophilia."
                ],
                "4 Molecular Basis of Inheritance": [
                    "Genetic Material: Understand the experiments (like Griffith's) that proved DNA is the genetic material.",
                    "Molecular Processes: Know the basic processes of DNA replication, transcription, and translation.",
                    "Gene Regulation: Explain the concept of gene regulation with the Lac-operon as an example."
                ],
                "6 Plant Water Relations": [
                    "Water Absorption: Describe the mechanism of water absorption by roots, including imbibition, diffusion, and osmosis. Understand the concept of water potential and DPD (Diffusion Pressure Deficit).",
                    "Ascent of Sap: Explain the theories for the upward movement of water, such as root pressure and cohesion-tension theory.",
                    "Transpiration: Understand the significance of transpiration."
                ],
                "8 Respiration and Circulation": [
                    "Human Respiratory System: Learn about pulmonary volumes and capacities. Differentiate between external and internal respiration.",
                    "Human Circulatory System: Describe the composition of blood and the mechanism of a double circulation heart.",
                    "Health and Disorders: Study common cardiovascular disorders."
                ],
                "10 Human Health and Diseases": [
                    "Human Diseases: Understand common infectious diseases like malaria, amoebiasis, ascariasis, and filariasis.",
                    "Reproductive Health: Study the goals of RCH programs. Learn about various birth control methods and sexually transmitted diseases (STDs)."
                ],
                "11 Enhancement of Food Production": [
                    "Plant Breeding: Understand plant breeding techniques for disease and pest resistance.",
                    "Tissue Culture: Learn about tissue culture as a method of micropropagation.",
                    "Animal Husbandry: Study the principles of poultry farm management and apiculture.",
                    "Microbes: Understand the role of microbes in industrial production (fermentation, antibiotics, enzymes) and sewage treatment."
                ],
                "12 Biotechnology": [
                    "Genetic Engineering: Define genetic engineering and recombinant DNA technology.",
                    "Tools and Techniques: Identify the tools and techniques of biotechnology, including restriction enzymes, cloning vectors, and PCR.",
                    "Applications: Understand the applications of biotechnology in healthcare, such as the production of human insulin and gene therapy."
                ]
            },
            "Mathematics": {
                "1 Mathematical Logic": [
                    "Statements: Define a statement and its truth value.",
                    "Connectives: Understand and apply logical connectives: conjunction (p∧q), disjunction (p∨q), conditional (p→q), biconditional (p↔q), and negation (∼p).",
                    "Truth Tables: Construct truth tables for compound statements.",
                    "Logic Concepts: Define tautology, contradiction, and contingency. Understand logical equivalence (A≡B).",
                    "Applications: Learn the application of logic to switching circuits, where 'on' is represented by 1 and 'off' by 0."
                ],
                "2 Matrices": [
                    "Transformations: Perform elementary row and column transformations on matrices.",
                    "Inverse of a Matrix: Calculate the inverse of a matrix using elementary transformations and the adjoint method.",
                    "Applications: Solve a system of linear equations using the inversion and reduction methods."
                ],
                "3 Trigonometric Functions": [
                    "Trigonometric Equations: Find the principal and general solutions of trigonometric equations.",
                    "Rules for Triangles: Apply the Sine rule, Cosine rule, and Projection rule to solve problems related to triangles.",
                    "Inverse Functions: Understand the properties and principal values of inverse trigonometric functions."
                ],
                "7 Linear Programming Problem (L.P.P.)": [
                    "Linear Inequalities: Solve linear inequations graphically.",
                    "L.P.P. Formulation: Understand the formulation of a linear programming problem.",
                    "Graphical Method: Find the solution of an L.P.P. using the graphical method."
                ],
                "1 Differentiation": [
                    "Composite Functions: Apply the chain rule to differentiate composite functions.",
                    "Inverse Functions: Find the derivative of a function using the derivative of its inverse.",
                    "Implicit and Parametric Functions: Differentiate implicit and parametric functions.",
                    "Logarithmic Differentiation: Use logarithms to differentiate complicated functions.",
                    "Higher Order Derivatives: Calculate second and higher order derivatives of functions."
                ],
                "7 Probability Distributions": [
                    "Random Variables: Define random variables and classify them as discrete or continuous.",
                    "Probability Distribution: Understand the probability distribution of a random variable and the probability mass function (p.m.f.).",
                    "Expected Value and Variance: Calculate the expected value (mean) and variance of a discrete random variable.",
                    "Cumulative Distribution Function: Define the cumulative distribution function (c.d.f.) for a discrete random variable."
                ],
                "8 Binomial Distribution": [
                    "Bernoulli Trials: Understand the concept of Bernoulli trials and their properties.",
                    "Binomial Distribution: Define and apply the binomial distribution.",
                    "Probabilities: Find the probability of a specific number of successes in a series of trials."
                ]
            },
            "Information Technology": {
                "1 Advanced Web Designing": [
                    "HTML5 Forms: Use new HTML5 input types like color, date, email, and number. Apply input restrictions such as required and pattern for validation.",
                    "Meta Tag: Understand the purpose of the <meta> tag and its attributes like name and content for describing webpage content.",
                    "CSS: Learn the syntax and types of CSS: inline, internal, and external. Use different selectors (ID, class, group) and properties (font, color, padding, border) to style webpages. Understand CSS positioning and floating properties."
                ],
                "2 Introduction to SEO": [
                    "SEO Concepts: Define SEO and its importance for website ranking. Differentiate between on-page and off-page SEO.",
                    "Techniques: Compare White Hat and Black Hat SEO techniques.",
                    "Optimization: Learn how to optimize a website by using proper page structure, relevant keywords, social bookmarking, and backlinks."
                ],
                "3 Advanced JavaScript": [
                    "Control Structures: Use if...else if... and switch...case conditional statements. Implement for, while, and do...while loops for repetitive tasks.",
                    "Objects: Understand and use JavaScript's built-in objects like Window, String, Math, Number, and Array to create dynamic and interactive webpages."
                ]
            },
            "English": {
                "1 Prose": [
                    "1.2 On Saying \"Please\": An essay that highlights the importance of good manners, courtesy, and politeness in daily life.",
                    "1.3 The Cop and the Anthem: A story about a vagabond named Soapy and his attempts to get arrested to escape the severe winter, which ends unexpectedly with a wonderful change in his soul.",
                    "1.6 Into the Wild: A personal narrative of a wildlife expert who gets lost in the jungle and learns valuable life lessons from nature and animals."
                ],
                "2 Poetry": [
                    "2.1 Song of the Open Road: A poem about freedom, democratic values, and embracing life's journey.",
                    "2.3 The Inchcape Rock: A narrative poem about poetic justice and the triumph of good over evil.",
                    "2.4 Have you Earned your Tomorrow: A reflective poem that prompts readers to be virtuous and kind."
                ],
                "3 Writing Skills": [
                    "3.1 Summary Writing: Learn the skill of condensing a text to its main points without adding personal opinions or new information.",
                    "3.2 Mind-Mapping: A creative and visual note-making technique that helps organize ideas and concepts.",
                    "3.3 Note-Making: A skill of extracting and structuring key points from a source, which can be presented in various formats like tables or diagrams.",
                    "3.4 Statement of Purpose (SOP): A formal document explaining your purpose for applying to a specific course or university, highlighting your skills and experiences.",
                    "3.5 Drafting a Virtual Message: A concise form of communication used to convey urgent or important information briefly and politely.",
                    "3.6 Group Discussion: A conversational activity that helps develop critical thinking, communication, and teamwork skills."
                ],
                "4 Novel Genre": [
                    "4.1 History of Novel: Understand the evolution of the novel as a literary genre and its key elements: theme, plot, and character.",
                    "4.2 To Sir, with Love: A novel that explores the theme of student-teacher relationships, prejudice, and racism.",
                    "4.3 Around the World in Eighty Days: An adventure novel about Phileas Fogg's journey around the world, full of excitement and unexpected events."
                ]
            }
        }
    }
};
