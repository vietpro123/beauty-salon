import React from "react";
import Reveal from "@/components/shared/Reveal";

export default function Terms() {
  return (
    <section className="pt-40 md:pt-52 pb-28 px-6 md:px-10">
      <div className="max-w-[800px] mx-auto">
        <Reveal>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl">Terms &amp; Conditions</h1>
        </Reveal>

        <div className="mt-12 space-y-10 text-foreground/75 leading-[1.8]">
          <p className="font-serif text-xl italic text-foreground/60">
            A legal disclaimer
          </p>

          <p>
            The explanations and information provided on this page are only general and high-level
            explanations and information on how to write your own document of Terms &amp; Conditions.
            You should not rely on this article as legal advice or as recommendations regarding what
            you should actually do, because we cannot know in advance what are the specific terms you
            wish to establish between your business and your customers and visitors. We recommend that
            you seek legal advice to help you understand and to assist you in the creation of your own
            Terms &amp; Conditions.
          </p>

          <section>
            <h2 className="font-serif text-2xl mb-3 text-foreground">Terms &amp; Conditions — the basics</h2>
            <p>
              Having said that, Terms and Conditions ("T&C") are a set of legally binding terms defined
              by you, as the owner of this website. The T&C set forth the legal boundaries governing the
              activities of the website visitors, or your customers, while they visit or engage with this
              website. The T&C are meant to establish the legal relationship between the site visitors
              and you as the website owner.
            </p>
          </section>

          <p>
            T&C should be defined according to the specific needs and nature of each website. For example,
            a website offering products to customers in e-commerce transactions requires T&C that are
            different from the T&C of a website only providing information (like a blog, a landing page,
            and so on).
          </p>

          <p>
            T&C provide you as the website owner the ability to protect yourself from potential legal
            exposure, but this may differ from jurisdiction to jurisdiction, so make sure to receive
            local legal advice if you are trying to protect yourself from legal exposure.
          </p>

          <section>
            <h2 className="font-serif text-2xl mb-3 text-foreground">What to include in the T&C document</h2>
            <p>
              Generally speaking, T&C often address these types of issues: Who is allowed to use the
              website; the possible payment methods; a declaration that the website owner may change his
              or her offering in the future; the types of warranties the website owner gives his or her
              customers; a reference to issues of intellectual property or copyrights, where relevant;
              the website owner's right to suspend or cancel a member's account; and much, much more.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}