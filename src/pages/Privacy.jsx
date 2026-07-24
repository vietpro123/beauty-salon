import React from "react";
import Reveal from "@/components/shared/Reveal";

export default function Privacy() {
  return (
    <section className="pt-40 md:pt-52 pb-28 px-6 md:px-10">
      <div className="max-w-[800px] mx-auto">
        <Reveal>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl">Privacy Policy</h1>
        </Reveal>

        <div className="mt-12 space-y-10 text-foreground/75 leading-[1.8]">
          <p className="font-serif text-xl italic text-foreground/60">
            A legal disclaimer
          </p>

          <p>
            The explanations and information provided on this page are only general and high-level
            explanations and information on how to write your own document of a Privacy Policy. You
            should not rely on this article as legal advice or as recommendations regarding what you
            should actually do, because we cannot know in advance what are the specific privacy
            policies you wish to establish between your business and your customers and visitors. We
            recommend that you seek legal advice to help you understand and to assist you in the
            creation of your own Privacy Policy.
          </p>

          <section>
            <h2 className="font-serif text-2xl mb-3 text-foreground">Privacy Policy — the basics</h2>
            <p>
              Having said that, a privacy policy is a statement that discloses some or all of the
              ways a website collects, uses, discloses, processes, and manages the data of its
              visitors and customers. It usually also includes a statement regarding the website's
              commitment to protecting its visitors' or customers' privacy, and an explanation about
              the different mechanisms the website is implementing in order to protect privacy.
            </p>
          </section>

          <p>
            Different jurisdictions have different legal obligations of what must be included in a
            Privacy Policy. You are responsible to make sure you are following the relevant
            legislation to your activities and location.
          </p>

          <section>
            <h2 className="font-serif text-2xl mb-3 text-foreground">What to include in the Privacy Policy</h2>
            <p>
              Generally speaking, a Privacy Policy often addresses these types of issues: the types
              of information the website is collecting and the manner in which it collects the data;
              an explanation about why is the website collecting these types of information; what are
              the website's practices on sharing the information with third parties; ways in which
              your visitors and customers can exercise their rights according to the relevant privacy
              legislation; the specific practices regarding minors' data collection; and much, much
              more.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}