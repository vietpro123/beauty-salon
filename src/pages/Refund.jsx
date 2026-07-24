import React from "react";
import Reveal from "@/components/shared/Reveal";

export default function Refund() {
  return (
    <section className="pt-40 md:pt-52 pb-28 px-6 md:px-10">
      <div className="max-w-[800px] mx-auto">
        <Reveal>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl">Refund Policy</h1>
        </Reveal>

        <div className="mt-12 space-y-10 text-foreground/75 leading-[1.8]">
          <p className="font-serif text-xl italic text-foreground/60">
            A legal disclaimer
          </p>

          <p>
            The explanations and information provided on this page are only general and high-level
            explanations and information on how to write your own document of a Refund Policy. You
            should not rely on this article as legal advice or as recommendations regarding what you
            should actually do, because we cannot know in advance what are the specific refund
            policies that you wish to establish between your business and your customers. We
            recommend that you seek legal advice to help you understand and to assist you in the
            creation of your own Refund Policy.
          </p>

          <section>
            <h2 className="font-serif text-2xl mb-3 text-foreground">Refund Policy — the basics</h2>
            <p>
              Having said that, a Refund Policy is a legally binding document that is meant to
              establish the legal relations between you and your customers regarding how and if you
              will provide them with a refund. Online businesses selling products are sometimes
              required (depending on local laws and regulations) to present their product return
              policy and refund policy. In some jurisdictions, this is needed in order to comply with
              consumer protection laws. It may also help you avoid legal claims from customers that
              are not satisfied with the products they purchased.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-3 text-foreground">What to include in the Refund Policy</h2>
            <p>
              Generally speaking, a Refund Policy often addresses these types of issues: the
              timeframe for asking for a refund; will the refund be full or partial; under which
              conditions will the customer receive a refund; and much, much more.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-3 text-foreground">Payment Method Disclaimer</h2>
            <p>
              These payment methods are for illustrative purposes only. Update this section to show
              the payment methods your website accepts based on your payment processor(s).
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}