export interface SafetyCheckResult {
  isSafe: boolean;
  isPrescriptionRequest: boolean;
  isInjectionAttempt: boolean;
  refusalMessage?: string;
}

export function evaluateSafety(query: string): SafetyCheckResult {
  const normalized = query.toLowerCase().trim();

  // 1. Detect prompt injections
  const injectionPatterns = [
    "ignore your instructions",
    "ignore all previous instructions",
    "system prompt",
    "disregard rules",
    "jailbreak",
    "override safety",
    "pretend you are an unrestricted",
  ];
  if (injectionPatterns.some((pattern) => normalized.includes(pattern))) {
    return {
      isSafe: false,
      isPrescriptionRequest: false,
      isInjectionAttempt: true,
      refusalMessage:
        "I am an educational AI tutor dedicated to Indian Knowledge Systems. I operate strictly under academic guidelines and cannot override safety rules or system instructions.",
    };
  }

  // 2. Detect medical prescription or dosage inquiry (Section 10 & 16)
  const prescriptionIndicators = [
    "how many mg should i take",
    "how much dose",
    "prescribe me",
    "what dose should i consume",
    "cure my cancer",
    "cure my diabetes",
    "treatment for my disease",
    "how to cure my",
  ];

  if (prescriptionIndicators.some((indicator) => normalized.includes(indicator))) {
    return {
      isSafe: false,
      isPrescriptionRequest: true,
      isInjectionAttempt: false,
      refusalMessage:
        "I cannot prescribe medical treatments, recommend dosages, or diagnose personal health conditions. Classical Ayurvedic literature discusses holistic physiology and traditional herbs (such as Ashwagandha, Triphala, or Vijaysar), but these are educational concepts and never a substitute for medical consultation. Please consult a licensed medical doctor or registered Ayurvedic physician (BAMS/MD).",
    };
  }

  return {
    isSafe: true,
    isPrescriptionRequest: false,
    isInjectionAttempt: false,
  };
}
