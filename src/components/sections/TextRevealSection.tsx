import { TextReveal } from "../ui/text-reveal";
import { TextCarousel } from "../ui/text-carousel";
import { ShinyPill } from "../ui/ShinyPill";
import { JellyToggle } from "../ui/JellyToggle";

export function TextRevealSection() {
  return (
    <section className="w-full bg-fog-white relative z-20">
      <TextReveal
        customSlots={[
          {
            key: "{{SHINY_HCD}}",
            component: (
              <ShinyPill
                text="Human-centered design,"
                textColor="#0D0D0D"
                shineColor="#2F5BF9"
                speed={2}
                font={{
                  fontFamily: 'var(--font-sans, "TraditionalAmpersand", "Stack Sans Text", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
                  fontSize: "inherit",
                  fontWeight: 700,
                  lineHeight: "inherit",
                  letterSpacing: "-0.01em",
                }}
              />
            ),
          },
          {
            key: "{{CAROUSEL}}",
            component: (
              <TextCarousel
                texts={["design", "aesthetics", "technology", "business"]}
                badgeBackground="#FF7523"
                color="#ffffff"
                badgeRadius={999}
                badgePaddingX={14}
                badgePaddingY={2}
                fixedWidth="6.5em"
                splitBy="characters"
                interval={2200}
                font={{
                  fontFamily: 'var(--font-sans, "TraditionalAmpersand", "Stack Sans Text", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
                  fontSize: "inherit",
                  fontWeight: 700,
                  lineHeight: "inherit",
                  letterSpacing: "-0.01em",
                }}
              />
            ),
          },
          {
            key: "{{JELLY_TOGGLE}}",
            component: ({ progress, range }: { progress: any; range: [number, number] }) => (
              <JellyToggle
                defaultChecked={false}
                offKnobColor="#FF7523"
                onKnobColor="#2F5BF9"
                trackBackground="rgba(207, 207, 207, 0.15)"
                trackBorderColor="rgba(255, 255, 255, 0.1)"
                size="inline"
                progress={progress}
                range={range}
              />
            ),
          },
        ]}
      >
        {"Grounded in {{SHINY_HCD}} <br/> I bridge {{CAROUSEL}} to build products where AI accelerates exploration while human judgment shapes meaningful experiences. I explore problems beyond the initial brief, seeking to understand the product, people, context, and what is actually happening. When challenges block progress, I look for alternatives {{JELLY_TOGGLE}}, seek expertise, and keep moving toward a realistic solution. I work across design, research, business, and engineering to bring different perspectives into a shared direction. I also question my design decisions and outcomes, learn from different perspectives, and reflect on what I could do differently next time, using those insights to continuously improve my work."}
      </TextReveal>
    </section>
  );
}
