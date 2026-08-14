import { TextReveal } from "../ui/text-reveal";

export function TextRevealSection() {
  return (
    <section className="w-full bg-neutral-50 relative z-20">
      <TextReveal>
        {"Grounded in Human-Computer Interaction, I design products where AI accelerates exploration and human judgment shapes meaningful experiences."}
      </TextReveal>
    </section>
  );
}
