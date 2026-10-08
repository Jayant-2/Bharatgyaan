import { evaluateSafety } from "./safety";
import { retrieveGroundedContext, RetrievedChunk } from "./retriever";
import { ClaimType } from "@/lib/utils";

export interface TutorResponse {
  answer: string;
  citations: string[];
  claimType: ClaimType;
  confidence: number;
  isRefusal: boolean;
  relatedLessons?: Array<{ title: string; slug: string }>;
  suggestedQuestions?: string[];
}

export async function generateTutorAnswer(
  query: string,
  scope?: string
): Promise<TutorResponse> {
  // 1. Safety Filter Evaluation (Section 10 & 16)
  const safety = evaluateSafety(query);
  if (!safety.isSafe) {
    return {
      answer: safety.refusalMessage || "Safety policy refusal.",
      citations: safety.isPrescriptionRequest
        ? ["Charaka Samhita (Chikitsasthana)", "Sushruta Samhita"]
        : [],
      claimType: "traditional",
      confidence: 0.95,
      isRefusal: true,
      suggestedQuestions: [
        "What are the classical concepts of Tridosha?",
        "How is Dinacharya (daily routine) described in Ayurveda?",
        "What does classical literature say about Ashwagandha and Rasayana?",
      ],
    };
  }

  // 2. Grounded Database Retrieval (Section 11)
  const chunks = await retrieveGroundedContext(query, scope);

  // 3. Optional LLM Adapter if AI_API_KEY is configured
  if (process.env.AI_API_KEY && chunks.length > 0) {
    try {
      // If user configures Gemini or external provider, call LLM
      const contextText = chunks
        .map(
          (c, idx) =>
            `[Chunk ${idx + 1}] (Claim: ${c.claimType}, Source: ${c.citation})\n${c.content}`
        )
        .join("\n\n");

      const systemPrompt = `You are the BharatGyaan Grounded AI Tutor. Answer ONLY from the provided IKS context. Never extrapolate or invent modern claims. Attribute statements using [1], [2] to the cited chunks.
Context:
${contextText}`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.AI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `${systemPrompt}\n\nStudent Question: ${query}` }],
              },
            ],
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const llmAnswer = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (llmAnswer) {
          const uniqueCitations = Array.from(new Set(chunks.map((c) => c.citation)));
          return {
            answer: llmAnswer,
            citations: uniqueCitations,
            claimType: chunks[0].claimType,
            confidence: 0.95,
            isRefusal: false,
            relatedLessons: chunks.slice(0, 3).map((c) => ({
              title: c.lessonTitle,
              slug: c.lessonSlug,
            })),
          };
        }
      }
    } catch {
      // Fall through to deterministic curriculum synthesis engine
    }
  }

  // 4. Deterministic Grounded Curriculum Synthesis Engine
  if (chunks.length > 0) {
    const topChunk = chunks[0];
    const uniqueCitations = Array.from(new Set(chunks.map((c) => c.citation)));
    const relatedLessons = Array.from(
      new Map(chunks.map((c) => [c.lessonSlug, { title: c.lessonTitle, slug: c.lessonSlug }])).values()
    );

    // Synthesize structured answer from retrieved chunks
    let answerText = "";
    if (chunks.length === 1) {
      answerText = `${topChunk.content}\n\nThis insight is derived from the module on **${topChunk.lessonTitle}** within our *${topChunk.topicTitle}* curriculum.`;
    } else {
      const mainContent = topChunk.content;
      const supportingChunk = chunks[1];
      answerText = `${mainContent}\n\nFurthermore, in ${supportingChunk.lessonTitle}, primary sources note: ${supportingChunk.content}`;
    }

    return {
      answer: answerText,
      citations: uniqueCitations,
      claimType: topChunk.claimType,
      confidence: Math.min(0.98, 0.75 + topChunk.relevanceScore * 0.005),
      isRefusal: false,
      relatedLessons: relatedLessons.slice(0, 3),
      suggestedQuestions: [
        `What are the key terms in ${topChunk.lessonTitle}?`,
        `Which historical period does ${topChunk.lessonTitle} belong to?`,
        `Explore more on ${topChunk.topicTitle}`,
      ],
    };
  }

  // 5. Out-of-Domain Graceful Guidance (Instead of dead-end refusal)
  return {
    answer:
      "I couldn't locate direct textual evidence in the registered knowledge base for that specific query. \n\nBharatGyaan's verified curriculum currently includes peer-reviewed modules on:\n• **Indian Mathematics:** Baudhayana Sulba geometry, discovery of zero (Shunya), and Brahmagupta's arithmetic.\n• **Indian Astronomy:** Aryabhata's planetary models, diurnal rotation of Earth, and eclipse science.\n• **Ayurveda:** Foundational Tridosha theory (Vata, Pitta, Kapha) and classical Rasayana herbs.\n• **Yoga & Mind Science:** Patanjali's Yoga Sutras and Ashtanga eightfold path.\n• **Architecture & Metallurgy:** Vastu Shastra, sacred acoustics, and the rustless Delhi Iron Pillar.\n• **Ancient Universities & Philosophy:** Nalanda Mahavihara, the Six Darshanas, and Pramana epistemology.\n\nPlease ask about any of these subjects, or choose a recommended prompt below!",
    citations: [],
    claimType: "scholarly",
    confidence: 0.3,
    isRefusal: true,
    suggestedQuestions: [
      "What is the Pythagorean theorem formulation in Baudhayana Sulba Sutras?",
      "How did Brahmagupta define mathematical zero in 628 CE?",
      "Explain the concept of Tridosha in Ayurveda.",
      "What did Aryabhata discover about the Earth's rotation?",
      "Tell me about the Nalanda University entrance exam.",
    ],
  };
}
