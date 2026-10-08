import React from "react";
import Link from "next/link";
import { ShieldCheck, AlertTriangle, ArrowLeft } from "lucide-react";

export default function DisclaimerPage() {
  return (
    <div className="py-12 sm:py-16 bg-[#FFFDF9] dark:bg-[#0B0F19]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-saffron-700 dark:text-saffron-400 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div>
          <span className="text-xs uppercase font-bold text-amber-600 tracking-wider">
            Mandatory Statutory Notice
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mt-1">
            Academic & Healthcare Disclaimer
          </h1>
          <p className="text-xs text-stone-500 mt-1">Last updated: October 2026</p>
        </div>

        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
          <div className="space-y-2 text-sm text-amber-900 dark:text-amber-200">
            <strong className="block font-bold">Important Summary:</strong>
            <p>
              BharatGyaan is an educational and scholarly platform dedicated to the study of Indian Knowledge Systems (IKS). The information provided on this platform—including discussions on Ayurveda, dietetics (Ahara), herbal formulations, and Yogic practices—is strictly for historical, cultural, and academic reference.
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
            1. No Medical Advice or Treatment
          </h2>
          <p>
            None of the content, lessons, or AI tutor responses constitute medical advice, diagnosis, prescription, or therapeutic recommendations. Ancient Ayurvedic texts (such as the Charaka Samhita and Sushruta Samhita) provide profound historical insights into ancient biology and health traditions, but they must not be used to self-diagnose or self-medicate.
          </p>

          <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
            2. Physical Practice Safety (Yoga & Pranayama)
          </h2>
          <p>
            Yogic asanas, pranayamas, and meditation practices should be undertaken only under the direct guidance of certified, experienced instructors. Individuals with existing medical conditions (such as cardiovascular conditions, hypertension, glaucoma, spinal injuries, or pregnancy) must obtain clearance from a licensed healthcare physician prior to engaging in physical routines.
          </p>

          <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
            3. AI Tutor Limitations & Refusal Architecture
          </h2>
          <p>
            Our grounded AI tutor is programmed with strict guardrails to automatically refuse medical diagnosis, prescriptive inquiries, dosage questions, and unauthorized therapeutic claims. Any attempt to bypass these guardrails violates our Terms of Learning.
          </p>
        </div>
      </div>
    </div>
  );
}
