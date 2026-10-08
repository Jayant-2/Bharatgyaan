import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding BharatGyaan IKS Platform comprehensive database...");

  // Clean existing data for clean seed
  await prisma.lessonSource.deleteMany();
  await prisma.lessonKeyTerm.deleteMany();
  await prisma.lessonVideo.deleteMany();
  await prisma.video.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.keyTerm.deleteMany();
  await prisma.source.deleteMany();
  await prisma.subtopic.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.contentCategory.deleteMany();

  // 1. Content Categories (Section 6 & 12)
  const catKnowledge = await prisma.contentCategory.create({
    data: {
      name: "Knowledge & Science",
      slug: "knowledge-science",
      description: "Mathematical treatises, astronomical models, metallurgical wonders, and engineering marvels of ancient India.",
      icon: "Binary",
      sortOrder: 1,
    },
  });

  const catHealth = await prisma.contentCategory.create({
    data: {
      name: "Health & Lifestyle",
      slug: "health-lifestyle",
      description: "Holistic well-being, preventative healthcare, mind-body equilibrium, and seasonal nutrition rooted in classical traditions.",
      icon: "HeartPulse",
      sortOrder: 2,
    },
  });

  const catPhilosophy = await prisma.contentCategory.create({
    data: {
      name: "Philosophy & Education",
      slug: "philosophy-education",
      description: "Epistemological inquiry, the six classical Darshanas, residential universities, and pedagogical traditions.",
      icon: "Compass",
      sortOrder: 3,
    },
  });

  const catCulture = await prisma.contentCategory.create({
    data: {
      name: "Culture & Arts",
      slug: "culture-arts",
      description: "Aesthetics (Rasa), performing arts, classical architecture, iconography, and enduring literary treasures.",
      icon: "Palette",
      sortOrder: 4,
    },
  });

  // 2. Sources Registry (Section 12 & Appendix B)
  const sourceSulba = await prisma.source.create({
    data: {
      sourceType: "digitised_text",
      title: "Baudhayana Sulba Sutras: Geometry in Vedic Rituals",
      authors: "Baudhayana (Trans. B.B. Datta)",
      publisher: "Calcutta University Press / Motilal Banarsidass",
      year: 1932,
      reliabilityTier: 1,
      notes: "Primary geometric treatise containing the Pythagorean theorem and square-circle transformation.",
    },
  });

  const sourceAryabhatiya = await prisma.source.create({
    data: {
      sourceType: "digitised_text",
      title: "Aryabhatiya of Aryabhata (Critical Edition with English Translation)",
      authors: "Aryabhata (Ed. K.S. Shukla and K.V. Sarma)",
      publisher: "Indian National Science Academy (INSA), New Delhi",
      year: 1976,
      reliabilityTier: 1,
      notes: "Astronomical and mathematical treatise composed in 499 CE in Kusumapura (Pataliputra).",
    },
  });

  const sourceBrahmasphuta = await prisma.source.create({
    data: {
      sourceType: "digitised_text",
      title: "Brahmasphutasiddhanta of Brahmagupta",
      authors: "Brahmagupta (Ed. Ram Swarup Sharma)",
      publisher: "Indian Institute of Astronomical and Sanskrit Research, New Delhi",
      year: 1966,
      reliabilityTier: 1,
      notes: "Landmark 628 CE text formalizing mathematical zero, positive/negative arithmetic operations, and quadratic solutions.",
    },
  });

  const sourceCharaka = await prisma.source.create({
    data: {
      sourceType: "book",
      title: "Charaka Samhita: Text with English Translation",
      authors: "Agnivesha / Charaka (Trans. P.V. Sharma)",
      publisher: "Chaukhambha Orientalia, Varanasi",
      year: 1981,
      reliabilityTier: 1,
      notes: "Foundational classical encyclopedia of internal medicine, Tridosha physiology, and herbal Rasayana.",
    },
  });

  const sourceYogaSutras = await prisma.source.create({
    data: {
      sourceType: "book",
      title: "The Yoga Sutras of Patanjali: Translation and Commentary",
      authors: "Patanjali (Trans. Swami Vivekananda / Georg Feuerstein)",
      publisher: "Advaita Ashrama / Inner Traditions",
      year: 1989,
      reliabilityTier: 1,
      notes: "Classical aphorisms defining Raja Yoga, Ashtanga eightfold path, and meditative epistemology.",
    },
  });

  const sourceNalanda = await prisma.source.create({
    data: {
      sourceType: "university",
      title: "The Nalanda Mahavihara: Education and Monastic Architecture",
      authors: "Sukumar Dutt / Radhakumud Mookerji",
      publisher: "Munshiram Manoharlal Publishers",
      year: 1962,
      reliabilityTier: 2,
      notes: "Exhaustive historical analysis of Nalanda, student entrance examinations, curricula, and library Dharmaganja.",
    },
  });

  const sourceVastu = await prisma.source.create({
    data: {
      sourceType: "book",
      title: "Manasara: Architecture and Sculpture (Vastu Shastra)",
      authors: "P.K. Acharya",
      publisher: "Oxford University Press / Manasara Series",
      year: 1934,
      reliabilityTier: 1,
      notes: "Standard canonical treatise on Indian town planning, proportions (Talamana), and temple structures.",
    },
  });

  const sourceDarshanas = await prisma.source.create({
    data: {
      sourceType: "book",
      title: "Outlines of Indian Philosophy",
      authors: "M. Hiriyanna",
      publisher: "George Allen & Unwin / Motilal Banarsidass",
      year: 1932,
      reliabilityTier: 1,
      notes: "Standard scholarly manual detailing the six orthodox Darshanas and their epistemological Pramanas.",
    },
  });

  const sourceKrishi = await prisma.source.create({
    data: {
      sourceType: "digitised_text",
      title: "Krishi-Parashara (Agriculture by Parashara)",
      authors: "Sage Parashara (Ed. G.P. Majumdar and S.C. Banerji)",
      publisher: "The Asiatic Society, Kolkata",
      year: 1960,
      reliabilityTier: 1,
      notes: "Ancient manual on agro-meteorology, cattle care, soil preservation, and crop yields.",
    },
  });

  const sourceMetallurgy = await prisma.source.create({
    data: {
      sourceType: "journal_article",
      title: "Rustless Iron Pillar of Delhi and Ancient Indian Metallurgy",
      authors: "R. Balasubramaniam",
      publisher: "Indian Institute of Metals / Springer",
      year: 2002,
      reliabilityTier: 2,
      notes: "Material science analysis of the 1600-year-old iron pillar and passive protective phosphate film.",
    },
  });

  // 3. Key Terms (Sanskrit Glossary with transliteration)
  const termShulba = await prisma.keyTerm.create({
    data: {
      term: "Sulba",
      transliteration: "Śulba",
      devanagari: "शुल्ब",
      meaning: "Literally 'a measuring cord or rope'; ancient geometric manuals for fire-altar construction.",
    },
  });

  const termShunya = await prisma.keyTerm.create({
    data: {
      term: "Shunya",
      transliteration: "Śūnya",
      devanagari: "शून्य",
      meaning: "Void, emptiness; formalized mathematically as zero by Brahmagupta, functioning both as a placeholder and an operational numeral.",
    },
  });

  const termDosha = await prisma.keyTerm.create({
    data: {
      term: "Tridosha",
      transliteration: "Tridoṣa",
      devanagari: "त्रिदोष",
      meaning: "The three primary functional principles (Vata, Pitta, Kapha) governing psychophysiological dynamics in Ayurveda.",
    },
  });

  const termChittaVritti = await prisma.keyTerm.create({
    data: {
      term: "Chitta Vritti Nirodha",
      transliteration: "Citta-vṛtti-nirodha",
      devanagari: "चित्तवृत्तिनिरोधः",
      meaning: "The cessation or stilling of the fluctuations and modifications of the mind-field (Patanjali 1.2).",
    },
  });

  const termPramana = await prisma.keyTerm.create({
    data: {
      term: "Pramana",
      transliteration: "Pramāṇa",
      devanagari: "प्रमाण",
      meaning: "Valid means of obtaining knowledge in Indian epistemology (Pratyaksha perception, Anumana inference, Shabda testimony).",
    },
  });

  const termVastu = await prisma.keyTerm.create({
    data: {
      term: "Vastu Purusha Mandala",
      transliteration: "Vāstu-puruṣa-maṇḍala",
      devanagari: "वास्तुपुरुषमण्डल",
      meaning: "The sacred geometric grid diagram synthesizing spatial orientation, cosmic energy, and architectural symmetry.",
    },
  });

  // 4. Topics
  const topicMath = await prisma.topic.create({
    data: {
      categoryId: catKnowledge.id,
      title: "Indian Mathematics",
      slug: "mathematics",
      summary: "Explore the discovery of zero, the place-value decimal system, algebraic geometry, and the Kerala School calculus lineage.",
      coverImageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80",
      sortOrder: 1,
      status: "published",
      disclaimerType: "none",
    },
  });

  const topicAstronomy = await prisma.topic.create({
    data: {
      categoryId: catKnowledge.id,
      title: "Indian Astronomy",
      slug: "astronomy",
      summary: "Understand Aryabhata's planetary models, the ecliptic coordinates, observational yantras, and sidereal calendars.",
      coverImageUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200&auto=format&fit=crop&q=80",
      sortOrder: 2,
      status: "published",
      disclaimerType: "none",
    },
  });

  const topicAyurveda = await prisma.topic.create({
    data: {
      categoryId: catHealth.id,
      title: "Ayurveda",
      slug: "ayurveda",
      summary: "The holistic science of life: understanding Panchamahabhuta, Tridosha harmony, seasonal nutrition, and preventive wellness.",
      coverImageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=80",
      sortOrder: 3,
      status: "published",
      disclaimerType: "medical",
    },
  });

  const topicYoga = await prisma.topic.create({
    data: {
      categoryId: catHealth.id,
      title: "Yoga & Mind-Body Science",
      slug: "yoga",
      summary: "Ashtanga yoga, Patanjali's psychological taxonomy, pranayama physiology, and classical meditative disciplines.",
      coverImageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&auto=format&fit=crop&q=80",
      sortOrder: 4,
      status: "published",
      disclaimerType: "physical_practice",
    },
  });

  const topicArchitecture = await prisma.topic.create({
    data: {
      categoryId: catKnowledge.id,
      title: "Indian Architecture",
      slug: "architecture",
      summary: "Vastu Shastra, sacred temple geometry, Dravidian and Nagara styles, stepwells, and rock-cut acoustics.",
      coverImageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80",
      sortOrder: 5,
      status: "published",
      disclaimerType: "none",
    },
  });

  const topicEducation = await prisma.topic.create({
    data: {
      categoryId: catPhilosophy.id,
      title: "Ancient Indian Education",
      slug: "education",
      summary: "Gurukula pedagogy, universal debate traditions (Vada), and global residential universities like Nalanda, Takshashila, and Vallabhi.",
      coverImageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200&auto=format&fit=crop&q=80",
      sortOrder: 6,
      status: "published",
      disclaimerType: "none",
    },
  });

  const topicPhilosophy = await prisma.topic.create({
    data: {
      categoryId: catPhilosophy.id,
      title: "Indian Philosophy",
      slug: "philosophy",
      summary: "The six orthodox schools (Shad-Darshana) — Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, and Vedanta.",
      coverImageUrl: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1200&auto=format&fit=crop&q=80",
      sortOrder: 7,
      status: "published",
      disclaimerType: "none",
    },
  });

  const topicFood = await prisma.topic.create({
    data: {
      categoryId: catHealth.id,
      title: "Indian Food & Traditional Recipes",
      slug: "food-recipes",
      summary: "Ahara Vijnana, the science of six tastes (Shad-Rasa), fermentation traditions, and seasonal culinary wisdom.",
      coverImageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1200&auto=format&fit=crop&q=80",
      sortOrder: 8,
      status: "published",
      disclaimerType: "medical",
    },
  });

  const topicLifestyle = await prisma.topic.create({
    data: {
      categoryId: catHealth.id,
      title: "Ancient Indian Lifestyle",
      slug: "ancient-lifestyle",
      summary: "Dinacharya (daily regimen), Ritucharya (seasonal adaptations), and environmental balance in daily living.",
      coverImageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&auto=format&fit=crop&q=80",
      sortOrder: 9,
      status: "published",
      disclaimerType: "none",
    },
  });

  const topicAgriculture = await prisma.topic.create({
    data: {
      categoryId: catKnowledge.id,
      title: "Indian Agriculture",
      slug: "agriculture",
      summary: "Krishi Shastra, ancient soil classification, crop rotation, monsoon prediction models, and indigenous seed conservation.",
      coverImageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80",
      sortOrder: 10,
      status: "published",
      disclaimerType: "none",
    },
  });

  const topicLiterature = await prisma.topic.create({
    data: {
      categoryId: catPhilosophy.id,
      title: "Indian Literature",
      slug: "literature",
      summary: "Kavya traditions, Nataka dramaturgy, epics (Mahabharata, Ramayana), and classical regional languages.",
      coverImageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80",
      sortOrder: 11,
      status: "published",
      disclaimerType: "none",
    },
  });

  const topicArt = await prisma.topic.create({
    data: {
      categoryId: catCulture.id,
      title: "Indian Art & Culture",
      slug: "art-culture",
      summary: "Natya Shastra, Indian classical music (Raga & Tala systems), Shilpa Shastra, and bronze metallurgy.",
      coverImageUrl: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=1200&auto=format&fit=crop&q=80",
      sortOrder: 12,
      status: "published",
      disclaimerType: "none",
    },
  });

  const topicTech = await prisma.topic.create({
    data: {
      categoryId: catKnowledge.id,
      title: "Traditional Science & Technology",
      slug: "science-technology",
      summary: "Wootz steel, rustless iron pillar metallurgy, stepwell hydraulic engineering, and distillation chemistry.",
      coverImageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
      sortOrder: 13,
      status: "published",
      disclaimerType: "none",
    },
  });

  // 5. Lessons & Sources Across All Disciplines

  // Math Lesson 1: Sulba Sutras
  const lessonSulba = await prisma.lesson.create({
    data: {
      topicId: topicMath.id,
      title: "The Baudhayana Sulba Sutras: Geometry and the Cord",
      slug: "baudhayana-sulba-sutras-geometry",
      intro: "Centuries before Pythagoras, Indian ritual mathematicians formulated precise geometric theorems using ropes (sulba) to design elaborate fire altars.",
      bodyJson: JSON.stringify({
        sections: [
          {
            type: "intro",
            title: "Historical Context & Purpose",
            claimType: "historical",
            content: "The Sulba Sutras form a crucial sub-branch of the Kalpa Vedanga, specifically designed for constructing Vedic fire-altars (Vedi and Chiti). These altars required exact geometrical areas to conform to ritual prescriptions, necessitating sophisticated solutions for squaring circles, doubling square areas, and constructing right-angled triangles.",
          },
          {
            type: "explanation",
            title: "The Theorem of the Diagonal",
            claimType: "scholarly",
            content: "In Baudhayana Sulba Sutra (1.48), the author states: 'dīrghacaturasrasyākṣṇayā rajjuḥ pārśvamānī tiryaṅmānī ca yatpṛthagbhūte kurutastadubhayaṁ karoti' — 'The diagonal of a rectangle produces by itself both the areas which a lengthwise side and crosswise side produce separately.' This is the explicit statement of the Pythagorean theorem, utilized systematically with integer triples such as (3,4,5), (5,12,13), and (8,15,17).",
          },
        ],
      }),
      difficulty: "intermediate",
      estMinutes: 8,
      region: "Northern & Central India",
      period: "c. 800–600 BCE",
      status: "published",
      sortOrder: 1,
    },
  });

  await prisma.lessonSource.create({
    data: {
      lessonId: lessonSulba.id,
      sourceId: sourceSulba.id,
      locator: "Sutra 1.48–1.62",
      citationNote: "Primary verse formulation of the diagonal theorem and square root approximation of 2.",
      claimType: "historical",
    },
  });

  // Math Lesson 2: Brahmagupta & Zero
  const lessonZero = await prisma.lesson.create({
    data: {
      topicId: topicMath.id,
      title: "The Discovery of Zero (Shunya) and Brahmagupta's Arithmetic",
      slug: "discovery-of-zero-brahmagupta-arithmetic",
      intro: "India gave the world not merely zero as an empty placeholder, but zero (Shunya) as a fully operational mathematical number with formal algebraic rules.",
      bodyJson: JSON.stringify({
        sections: [
          {
            type: "intro",
            title: "From Placeholder to Number",
            claimType: "historical",
            content: "While earlier civilizations used symbols for empty columns in counting boards, Indian mathematicians treated zero as a number in its own right. The Bakshali Manuscript (radiocarbon dated between 3rd and 8th century CE) demonstrates the earliest recorded dot symbol for zero in mathematical calculations.",
          },
          {
            type: "explanation",
            title: "Brahmagupta's Operational Rules (628 CE)",
            claimType: "scholarly",
            content: "In chapter 18 of the Brahmasphutasiddhanta, Brahmagupta provided the first systematic rules for arithmetic with zero and negative numbers: positive minus zero is positive; negative minus zero is negative; zero times any number is zero; and zero divided by zero is zero (later refined by Bhaskara II).",
          },
        ],
      }),
      difficulty: "beginner",
      estMinutes: 7,
      region: "Ujjain, Central India",
      period: "628 CE",
      status: "published",
      sortOrder: 2,
    },
  });

  await prisma.lessonSource.create({
    data: {
      lessonId: lessonZero.id,
      sourceId: sourceBrahmasphuta.id,
      locator: "Chapter 18 (Kuttaka Adhyaya)",
      citationNote: "Formal mathematical rules for zero, positive, and negative numbers.",
      claimType: "historical",
    },
  });

  await prisma.lessonKeyTerm.create({
    data: {
      lessonId: lessonZero.id,
      keyTermId: termShunya.id,
    },
  });

  // Astronomy Lesson: Aryabhata & Planetary Motion
  const lessonAstronomy = await prisma.lesson.create({
    data: {
      topicId: topicAstronomy.id,
      title: "Aryabhata's Astronomy: Earth's Rotation and Planetary Models",
      slug: "aryabhata-astronomy-earth-rotation",
      intro: "In 499 CE, Aryabhata postulated that the Earth rotates daily on its axis and that lunar and solar eclipses are natural shadow phenomena rather than mythological occurrences.",
      bodyJson: JSON.stringify({
        sections: [
          {
            type: "intro",
            title: "The Diurnal Rotation of the Earth",
            claimType: "historical",
            content: "In the Golapada section of the Aryabhatiya (4.9), Aryabhata uses the poetic boat analogy: 'Just as a man in a boat moving forward sees the stationary objects on the bank moving backward, so the stationary stars are seen by people on Earth moving due west because of the Earth's daily rotation.'",
          },
          {
            type: "explanation",
            title: "Scientific Theory of Eclipses",
            claimType: "scholarly",
            content: "Aryabhata dismissed the Rahu-Ketu mythological swallowing myth, demonstrating mathematically that a lunar eclipse is caused by the Moon entering the Earth's shadow cone, while a solar eclipse occurs when the Moon obstructs the sunlight falling on the observer.",
          },
        ],
      }),
      difficulty: "intermediate",
      estMinutes: 8,
      region: "Pataliputra (Patna), Bihar",
      period: "499 CE",
      status: "published",
      sortOrder: 1,
    },
  });

  await prisma.lessonSource.create({
    data: {
      lessonId: lessonAstronomy.id,
      sourceId: sourceAryabhatiya.id,
      locator: "Golapada 4.9 & 4.37-39",
      citationNote: "Primary verses on the Earth's rotation and eclipse mechanics.",
      claimType: "historical",
    },
  });

  // Ayurveda Lesson 1: Tridosha
  const lessonDosha = await prisma.lesson.create({
    data: {
      topicId: topicAyurveda.id,
      title: "Understanding Tridosha: Vata, Pitta, and Kapha",
      slug: "understanding-tridosha-vata-pitta-kapha",
      intro: "Ayurveda describes health not merely as the absence of disease, but as the dynamic equilibrium of three bio-regulatory energies known as Doshas.",
      bodyJson: JSON.stringify({
        sections: [
          {
            type: "intro",
            title: "The Three Bio-Energies",
            claimType: "traditional",
            content: "The three doshas — Vata (kinetic/movement), Pitta (transformation/metabolism), and Kapha (structure/stability) — represent expressions of the five universal elements (Panchamahabhuta). In balance, they maintain homeostatic wellness; in disturbance, they cause illness.",
          },
          {
            type: "explanation",
            title: "Attributes of the Doshas",
            claimType: "traditional",
            content: "• Vata (Space + Air): Dry, cold, light, mobile. Controls nerve impulses and respiration.\n• Pitta (Fire + Water): Hot, sharp, slightly unctuous. Controls digestion and enzymatic metabolism.\n• Kapha (Earth + Water): Heavy, slow, oily, cool. Controls lubrication and physical cellular immunity.",
          },
        ],
      }),
      difficulty: "beginner",
      estMinutes: 6,
      region: "Pan-India",
      period: "c. 1000 BCE – 500 CE",
      status: "published",
      sortOrder: 1,
    },
  });

  await prisma.lessonSource.create({
    data: {
      lessonId: lessonDosha.id,
      sourceId: sourceCharaka.id,
      locator: "Sutrasthana Chapter 1, Verses 56-59",
      citationNote: "Definition of bodily and mental doshas and their causative attributes.",
      claimType: "traditional",
    },
  });

  await prisma.lessonKeyTerm.create({
    data: {
      lessonId: lessonDosha.id,
      keyTermId: termDosha.id,
    },
  });

  // Ayurveda Lesson 2: Classical Herbalism (Ashwagandha, Triphala, Tulsi)
  const lessonHerbs = await prisma.lesson.create({
    data: {
      topicId: topicAyurveda.id,
      title: "Classical Ayurvedic Herbs & Rasayana in the Charaka Samhita",
      slug: "classical-ayurvedic-herbs-rasayana",
      intro: "An educational overview of how classical Ayurvedic texts classify medicinal plants into adaptogens (Rasayana), digestives (Deepana), and detoxifiers (Shodhana).",
      bodyJson: JSON.stringify({
        sections: [
          {
            type: "intro",
            title: "The Concept of Rasayana",
            claimType: "traditional",
            content: "In the Charaka Samhita (Chikitsasthana, Chapter 1), 'Rasayana' is defined as that which enhances the quality of Rasa and vital bodily tissues (Dhatus), promoting longevity, memory, and cognitive vitality.",
          },
          {
            type: "explanation",
            title: "Classical Botanical Examples",
            claimType: "scholarly",
            content: "• Ashwagandha (Withania somnifera): Classified as a Balya (strength-promoter) and Medhya (nootropic adaptogen).\n• Triphala: A synergy of three fruits (Amalaki, Haritaki, Bibhitaki) cited for gentle digestive regulation and antioxidant rejuvenation.\n• Tulsi (Ocimum sanctum): Praised for respiratory equilibrium and balancing Kapha and Vata.",
          },
          {
            type: "important_points",
            title: "Safety & Non-Prescription Notice",
            claimType: "scholarly",
            content: "Classical texts mandate that herbs must be processed with specific carriers (Anupana like honey, warm water, or ghee) and tailored strictly to an individual's constitution (Prakriti). They should never be consumed indiscriminately as over-the-counter remedies without qualified professional supervision.",
          },
        ],
      }),
      difficulty: "beginner",
      estMinutes: 7,
      region: "Ancient India",
      period: "Classical Era",
      status: "published",
      sortOrder: 2,
    },
  });

  await prisma.lessonSource.create({
    data: {
      lessonId: lessonHerbs.id,
      sourceId: sourceCharaka.id,
      locator: "Chikitsasthana Chapter 1 (Rasayanadhyaya)",
      citationNote: "Treatise on restorative plants and physiological nourishment.",
      claimType: "traditional",
    },
  });

  // Yoga Lesson: Patanjali
  const lessonYoga = await prisma.lesson.create({
    data: {
      topicId: topicYoga.id,
      title: "Patanjali's Definition of Yoga and the Nature of Mind",
      slug: "patanjali-definition-yoga-mind",
      intro: "Unlike popular modern perceptions centered solely on physical flexibility, classical Yoga is an empirical science of mind management and consciousness purification.",
      bodyJson: JSON.stringify({
        sections: [
          {
            type: "intro",
            title: "The Foundational Aphorism",
            claimType: "historical",
            content: "The second sutra of Patanjali's Yoga Sutras presents the formal definition of Yoga: 'Yogaścittavṛttinirodhaḥ' — 'Yoga is the conscious stilling of the modifications and turbulence of the mind-stuff.'",
          },
          {
            type: "explanation",
            title: "The Eightfold Path (Ashtanga)",
            claimType: "traditional",
            content: "1. Yama (ethical restraints towards society)\n2. Niyama (personal observances)\n3. Asana (steady, comfortable posture for meditation)\n4. Pranayama (regulation of vital breath dynamics)\n5. Pratyahara (inward withdrawal of sensory faculties)\n6. Dharana (focused single-point concentration)\n7. Dhyana (unbroken meditative absorption)\n8. Samadhi (unified state of superconscious stillness)",
          },
        ],
      }),
      difficulty: "beginner",
      estMinutes: 7,
      region: "North India",
      period: "c. 200 BCE – 300 CE",
      status: "published",
      sortOrder: 1,
    },
  });

  await prisma.lessonSource.create({
    data: {
      lessonId: lessonYoga.id,
      sourceId: sourceYogaSutras.id,
      locator: "Samadhi Pada 1.1–1.12",
      citationNote: "Definition of Yoga, the modifications of chitta, and Ashtanga yoga.",
      claimType: "scholarly",
    },
  });

  await prisma.lessonKeyTerm.create({
    data: {
      lessonId: lessonYoga.id,
      keyTermId: termChittaVritti.id,
    },
  });

  // Architecture Lesson: Vastu & Sacred Geometry
  const lessonArchitecture = await prisma.lesson.create({
    data: {
      topicId: topicArchitecture.id,
      title: "Vastu Shastra and the Geometry of Indian Temples",
      slug: "vastu-shastra-geometry-indian-temples",
      intro: "Indian temple architecture is not merely aesthetic ornamentation, but a sophisticated spatial science integrating geometric mandalas, acoustic resonance, and cosmic orientation.",
      bodyJson: JSON.stringify({
        sections: [
          {
            type: "intro",
            title: "The Vastu Purusha Mandala",
            claimType: "scholarly",
            content: "At the core of Indian architectural design is the Vastu Purusha Mandala, typically an 8x8 (Manduka) or 9x9 (Paramasayika) mathematical grid. The center (Brahmasthana) is kept unencumbered, symbolizing cosmic source consciousness, while perimeter cells house functional and elemental spaces.",
          },
          {
            type: "explanation",
            title: "Acoustic Engineering & Hydraulic Stepwells",
            claimType: "historical",
            content: "Temples like Brihadisvara (Thanjavur) and the Sun Temple (Modhera) integrated micro-acoustics in the Garbhagriha to amplify resonance frequencies. Simultaneously, stepwells (Baolis) like Rani ki Vav utilized inverted temple geometry to harvest subterranean water and provide microclimate cooling.",
          },
        ],
      }),
      difficulty: "intermediate",
      estMinutes: 8,
      region: "Western & Southern India",
      period: "600–1200 CE",
      status: "published",
      sortOrder: 1,
    },
  });

  await prisma.lessonSource.create({
    data: {
      lessonId: lessonArchitecture.id,
      sourceId: sourceVastu.id,
      locator: "Chapters 7–12 (Mandala Vidhana)",
      citationNote: "Systematic grid layouts and architectural proportion rules.",
      claimType: "scholarly",
    },
  });

  await prisma.lessonKeyTerm.create({
    data: {
      lessonId: lessonArchitecture.id,
      keyTermId: termVastu.id,
    },
  });

  // Education Lesson: Nalanda
  const lessonNalanda = await prisma.lesson.create({
    data: {
      topicId: topicEducation.id,
      title: "Nalanda Mahavihara: The Global Residential University",
      slug: "nalanda-mahavihara-global-residential-university",
      intro: "Flourishing from the 5th to the 12th century CE, Nalanda attracted over 10,000 scholars from China, Korea, Tibet, and Central Asia to study philosophy, logic, medicine, and linguistics.",
      bodyJson: JSON.stringify({
        sections: [
          {
            type: "intro",
            title: "The Entrance Examination (Dvara Pandita)",
            claimType: "historical",
            content: "As documented by Chinese traveler Xuanzang, admission to Nalanda was rigorous. Candidates were tested at the gate by the Dvara Pandita (Gatekeeper Scholar) on complex philosophical logic; only two or three out of ten applicants succeeded.",
          },
          {
            type: "explanation",
            title: "Curriculum and the Dharmaganja Library",
            claimType: "scholarly",
            content: "The university offered a multi-disciplinary curriculum: Hetuvidya (Logic), Sabdavidya (Grammar/Linguistics), Chikitsavidya (Medicine), and the Darshanas. Its nine-story library, Dharmaganja, comprised millions of manuscripts across three repositories: Ratnasagara, Ratnodadhi, and Ratnaranjaka.",
          },
        ],
      }),
      difficulty: "beginner",
      estMinutes: 8,
      region: "Magadha (Bihar)",
      period: "5th–12th Century CE",
      status: "published",
      sortOrder: 1,
    },
  });

  await prisma.lessonSource.create({
    data: {
      lessonId: lessonNalanda.id,
      sourceId: sourceNalanda.id,
      locator: "Pages 112–145",
      citationNote: "Historical documentation of academic life, examinations, and faculties.",
      claimType: "historical",
    },
  });

  // Philosophy Lesson: Six Darshanas
  const lessonPhilosophy = await prisma.lesson.create({
    data: {
      topicId: topicPhilosophy.id,
      title: "The Six Classical Darshanas (Shad-Darshana) and Pramanas",
      slug: "six-classical-darshanas-pramanas",
      intro: "Indian philosophy comprises six orthodox schools (Shad-Darshana) that systematically analyze reality, consciousness, epistemology, and liberation.",
      bodyJson: JSON.stringify({
        sections: [
          {
            type: "intro",
            title: "The Six Schools",
            claimType: "scholarly",
            content: "The six orthodox schools are:\n1. Nyaya (Gautama): Formal logic and theory of knowledge (Pramana).\n2. Vaisheshika (Kanada): Atomic physics and ontological categorization.\n3. Samkhya (Kapila): Dualism between Purusha (consciousness) and Prakriti (matter).\n4. Yoga (Patanjali): Practical cognitive psychology and meditative stilling.\n5. Mimamsa (Jaimini): Hermeneutics, ethics, and ritual linguistics.\n6. Vedanta (Badarayana): Non-dual metaphysics and ultimate reality (Brahman).",
          },
          {
            type: "explanation",
            title: "The Theory of Knowledge (Pramana Vada)",
            claimType: "scholarly",
            content: "Indian epistemologists evaluated knowledge claims using Pramanas: Pratyaksha (direct sensory perception), Anumana (valid inference via invariable concomitance/Vyapti), Upamana (analogy), and Shabda (trustworthy testimonial authority).",
          },
        ],
      }),
      difficulty: "intermediate",
      estMinutes: 9,
      region: "Pan-India",
      period: "Classical Philosophical Period",
      status: "published",
      sortOrder: 1,
    },
  });

  await prisma.lessonSource.create({
    data: {
      lessonId: lessonPhilosophy.id,
      sourceId: sourceDarshanas.id,
      locator: "Chapters 8–14",
      citationNote: "Comprehensive treatment of Nyaya-Vaisheshika, Samkhya-Yoga, and Vedanta.",
      claimType: "scholarly",
    },
  });

  await prisma.lessonKeyTerm.create({
    data: {
      lessonId: lessonPhilosophy.id,
      keyTermId: termPramana.id,
    },
  });

  // Technology Lesson: Metallurgy (Delhi Iron Pillar & Wootz Steel)
  const lessonTech = await prisma.lesson.create({
    data: {
      topicId: topicTech.id,
      title: "Ancient Indian Metallurgy: The Delhi Iron Pillar and Wootz Steel",
      slug: "ancient-indian-metallurgy-iron-pillar-wootz-steel",
      intro: "Ancient Indian metallurgists pioneered forge-welding and high-carbon crucible steel (Wootz) renowned worldwide for centuries.",
      bodyJson: JSON.stringify({
        sections: [
          {
            type: "intro",
            title: "The Rustless Iron Pillar of Delhi (c. 400 CE)",
            claimType: "scientific",
            content: "Standing over 7 meters tall and weighing over 6 tonnes, the Delhi Iron Pillar has resisted corrosion for over 1,600 years. Modern metallurgical analysis by IIT Kanpur (Prof. R. Balasubramaniam) revealed that high phosphorus content in the slag, combined with forge-welding, created a protective passive film of crystalline iron hydrogen phosphate hydrate (misawite), halting oxidation.",
          },
          {
            type: "explanation",
            title: "Wootz Crucible Steel (Ukku)",
            claimType: "historical",
            content: "Originating in Southern India (Karnataka, Tamil Nadu, Telangana), Wootz steel was produced by co-melting wrought iron and carbon-rich biochar inside sealed terracotta crucibles. The resulting ultra-high carbon steel (1.5% C) featured micro-carbide banding, later celebrated as Damascus blades for their razor sharpness and wavy surface patterns.",
          },
        ],
      }),
      difficulty: "intermediate",
      estMinutes: 8,
      region: "North & South India",
      period: "c. 400 CE – 1700 CE",
      status: "published",
      sortOrder: 1,
    },
  });

  await prisma.lessonSource.create({
    data: {
      lessonId: lessonTech.id,
      sourceId: sourceMetallurgy.id,
      locator: "Pages 15–42",
      citationNote: "Chemical and metallurgical breakdown of misawite protective layer and crucible process.",
      claimType: "scientific",
    },
  });

  // Agriculture Lesson: Krishi Parashara
  const lessonAgri = await prisma.lesson.create({
    data: {
      topicId: topicAgriculture.id,
      title: "Krishi Shastra: Traditional Agro-Ecology and Seed Preservation",
      slug: "krishi-shastra-traditional-agro-ecology",
      intro: "Ancient Indian agricultural manuals detailed soil texture analysis, lunar-monsoon rain forecasts, and organic bio-fertilizers like Kunapajala.",
      bodyJson: JSON.stringify({
        sections: [
          {
            type: "intro",
            title: "Eco-Centric Farming Principles",
            claimType: "traditional",
            content: "Treatises such as the Krishi-Parashara and Vrikshayurveda viewed the soil as a living entity. They classified soils by color, moisture-retention, and microbial fertility, prohibiting harmful chemicals and recommending multi-cropping with nitrogen-fixing pulses.",
          },
          {
            type: "explanation",
            title: "Kunapajala: Ancient Fermented Liquid Bio-Fertilizer",
            claimType: "scientific",
            content: "The Vrikshayurveda of Surapala describes Kunapajala, a fermented liquid fertilizer prepared from natural organic residues, pulses, milk, and herbs. Modern agricultural trials validate that Kunapajala enriches soil microbial count and nitrogen availability, functioning as a potent organic bio-stimulant.",
          },
        ],
      }),
      difficulty: "beginner",
      estMinutes: 7,
      region: "Ancient Bengal / Pan-India",
      period: "c. 5th–10th Century CE",
      status: "published",
      sortOrder: 1,
    },
  });

  await prisma.lessonSource.create({
    data: {
      lessonId: lessonAgri.id,
      sourceId: sourceKrishi.id,
      locator: "Verses 45–98",
      citationNote: "Traditional methods of seed sorting, soil health, and weather observation.",
      claimType: "traditional",
    },
  });

  // Videos (capture into variables to link to lessons)
  const videoMath = await prisma.video.create({
    data: {
      youtubeVideoId: "r-jGgB3e5vU",
      url: "https://www.youtube.com/watch?v=r-jGgB3e5vU",
      title: "Indian Mathematics: From Sulba Sutras to Kerala School",
      description: "An academic discourse on how Indian mathematicians developed geometric algorithms, trigonometry, and infinite series calculus.",
      thumbnailUrl: "https://img.youtube.com/vi/r-jGgB3e5vU/hqdefault.jpg",
      channelName: "IKS Division - Ministry of Education",
      durationSeconds: 2740,
      language: "en",
      topicId: topicMath.id,
      sortOrder: 1,
      status: "active",
    },
  });

  const videoAyurveda = await prisma.video.create({
    data: {
      youtubeVideoId: "k5i_lV_n8jY",
      url: "https://www.youtube.com/watch?v=k5i_lV_n8jY",
      title: "Science of Ayurveda: Epistemology & Bio-Energetics",
      description: "Comprehensive lecture examining classical texts, the Dosha framework, and holistic prevention.",
      thumbnailUrl: "https://img.youtube.com/vi/k5i_lV_n8jY/hqdefault.jpg",
      channelName: "IIT Gandhinagar IKS",
      durationSeconds: 3120,
      language: "en",
      topicId: topicAyurveda.id,
      sortOrder: 1,
      status: "active",
    },
  });

  const videoYoga = await prisma.video.create({
    data: {
      youtubeVideoId: "s3G9X7z-4y8",
      url: "https://www.youtube.com/watch?v=s3G9X7z-4y8",
      title: "Patanjali's Ashtanga Yoga in Classical Perspective",
      description: "Exploration of the psychological architecture and cognitive discipline of the Yoga Sutras.",
      thumbnailUrl: "https://img.youtube.com/vi/s3G9X7z-4y8/hqdefault.jpg",
      channelName: "Center for Indic Studies",
      durationSeconds: 2450,
      language: "en",
      topicId: topicYoga.id,
      sortOrder: 1,
      status: "active",
    },
  });

  // LessonVideo join rows — link each video to its primary lesson(s)
  await prisma.lessonVideo.createMany({
    data: [
      // Math video → Sulba Sutras lesson (most directly relevant)
      { lessonId: lessonSulba.id, videoId: videoMath.id, sortOrder: 1 },
      // Math video → Zero / Brahmagupta lesson (same topic)
      { lessonId: lessonZero.id, videoId: videoMath.id, sortOrder: 1 },
      // Ayurveda video → Tridosha lesson (primary match)
      { lessonId: lessonDosha.id, videoId: videoAyurveda.id, sortOrder: 1 },
      // Ayurveda video → Herbs / Rasayana lesson
      { lessonId: lessonHerbs.id, videoId: videoAyurveda.id, sortOrder: 1 },
      // Yoga video → Classical Yoga lesson
      { lessonId: lessonYoga.id, videoId: videoYoga.id, sortOrder: 1 },
    ],
  });

  console.log("✅ Seed completed successfully! Created full curriculum across Indian Mathematics, Astronomy, Ayurveda, Yoga, Architecture, Education, Philosophy, Metallurgy, and Agriculture!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
