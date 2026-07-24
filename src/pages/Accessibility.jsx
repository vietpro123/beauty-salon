import React from "react";
import Reveal from "@/components/shared/Reveal";

export default function Accessibility() {
  return (
    <section className="pt-40 md:pt-52 pb-28 px-6 md:px-10">
      <div className="max-w-[800px] mx-auto">
        <Reveal>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl">Accessibility Statement</h1>
        </Reveal>

        <div className="mt-12 space-y-10 text-foreground/75 leading-[1.8]">
          <p>
            The purpose of the following template is to assist you in writing your accessibility
            statement. Please note that you are responsible for ensuring that your site's statement
            meets the requirements of the local law in your area or region.
          </p>

          <p className="text-sm text-foreground/50 italic">
            *Note: This page currently has several sections. Once you complete editing the
            Accessibility Statement below, you need to delete this section.
          </p>

          <p>
            To learn more about this, check out our article{" "}
            <a href="#" className="underline hover:text-foreground">
              "Accessibility: Adding an Accessibility Statement to Your Site"
            </a>
            .
          </p>

          <section>
            <h2 className="font-serif text-2xl mb-3 text-foreground">Accessibility Statement</h2>
            <p>This statement was last updated on [enter relevant date].</p>
            <p className="mt-3">
              We at [enter organization / business name] are working to make our site
              [enter site name and address] accessible to people with disabilities.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-3 text-foreground">What Web Accessibility Is</h2>
            <p>
              An accessible site allows visitors with disabilities to browse the site with the same
              or a similar level of ease and enjoyment as other visitors. This can be achieved with
              the capabilities of the system on which the site is operating, and through assistive
              technologies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-3 text-foreground">Accessibility Adjustments on This Site</h2>
            <p>
              We have adapted this site in accordance with WCAG [2.0 / 2.1 / 2.2 — select relevant
              option] guidelines, and have made the site accessible to the level of [A / AA / AAA —
              select relevant option]. This site's contents have been adapted to work with assistive
              technologies, such as screen readers and keyboard use. As part of this effort, we have
              also [remove irrelevant information]:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Used the Accessibility Wizard to find and fix potential accessibility issues</li>
              <li>Set the language of the site</li>
              <li>Set the content order of the site's pages</li>
              <li>Defined clear heading structures on all of the site's pages</li>
              <li>Added alternative text to images</li>
              <li>Implemented color combinations that meet the required color contrast</li>
              <li>Reduced the use of motion on the site</li>
              <li>Ensured all videos, audio, and files on the site are accessible</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-3 text-foreground">
              Declaration of Partial Compliance With the Standard Due to Third-Party Content
            </h2>
            <p className="text-sm text-foreground/50 italic">[only add if relevant]</p>
            <p className="mt-3">
              The accessibility of certain pages on the site depend on contents that do not belong
              to the organization, and instead belong to [enter relevant third-party name]. The
              following pages are affected by this: [list the URLs of the pages]. We therefore
              declare partial compliance with the standard for these pages.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-3 text-foreground">
              Accessibility Arrangements in the Organization
            </h2>
            <p className="text-sm text-foreground/50 italic">[only add if relevant]</p>
            <p className="mt-3">
              [Enter a description of the accessibility arrangements in the physical offices /
              branches of your site's organization or business. The description can include all
              current accessibility arrangements — starting from the beginning of the service
              (e.g., the parking lot and / or public transportation stations) to the end (such as
              the service desk, restaurant table, classroom etc.). It is also required to specify
              any additional accessibility arrangements, such as disabled services and their
              location, and accessibility accessories (e.g. in audio inductions and elevators)
              available for use]
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-3 text-foreground">Requests, Issues, and Suggestions</h2>
            <p>
              If you find an accessibility issue on the site, or if you require further assistance,
              you are welcome to contact us through the organization's accessibility coordinator:
            </p>
            <p className="mt-3">
              [Name of the accessibility coordinator]<br />
              [Telephone number of the accessibility coordinator]<br />
              [Email address of the accessibility coordinator]<br />
              [Enter any additional contact details if relevant / available]
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}