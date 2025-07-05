import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfServicePage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground">bubuaimealplanner.com</p>
        <p className="text-sm text-muted-foreground mt-2">
          Latest update: January 15, 2025
        </p>
      </div>

      <Card className="mb-6 border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800">
            ⚠️ IMPORTANT HEALTH & SAFETY DISCLAIMER
          </CardTitle>
        </CardHeader>
        <CardContent className="text-red-700">
          <p className="leading-relaxed font-semibold mb-4">
            THIS APPLICATION PROVIDES AI-GENERATED RECIPE SUGGESTIONS FOR
            INFORMATIONAL PURPOSES ONLY. CONSULT WITH A QUALIFIED HEALTHCARE
            PROFESSIONAL, LICENSED DIETITIAN, OR YOUR PHYSICIAN BEFORE MAKING
            ANY DIETARY CHANGES OR FOLLOWING ANY RECIPES PROVIDED BY THIS
            APPLICATION.
          </p>
          <p className="leading-relaxed">
            The AI-generated content may contain errors, inaccuracies, or
            suggestions that could be harmful to your health. We strongly
            recommend consulting with medical professionals before implementing
            any dietary recommendations, especially if you have food allergies,
            medical conditions, or dietary restrictions.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Agreement to Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed">
            By accessing and using bubuaimealplanner.com (&quot;the
            Service&quot;, &quot;the Application&quot;, &quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;), you agree to be bound by these
            Terms of Service (&quot;Terms&quot;). If you do not agree to these
            Terms, you must not use this Service. Your use of the Service
            constitutes acceptance of these Terms.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Table of Contents</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <a
                href="#ai-disclaimers"
                className="text-blue-600 hover:underline"
              >
                AI Recipe Generation Disclaimers
              </a>
            </li>
            <li>
              <a
                href="#health-disclaimers"
                className="text-blue-600 hover:underline"
              >
                Health & Food Safety Disclaimers
              </a>
            </li>
            <li>
              <a
                href="#liability-limitations"
                className="text-blue-600 hover:underline"
              >
                Liability Limitations
              </a>
            </li>
            <li>
              <a
                href="#user-responsibilities"
                className="text-blue-600 hover:underline"
              >
                User Responsibilities
              </a>
            </li>
            <li>
              <a
                href="#prohibited-uses"
                className="text-blue-600 hover:underline"
              >
                Prohibited Uses
              </a>
            </li>
            <li>
              <a
                href="#intellectual-property"
                className="text-blue-600 hover:underline"
              >
                Intellectual Property
              </a>
            </li>
            <li>
              <a
                href="#data-collection"
                className="text-blue-600 hover:underline"
              >
                Types of Data Collected
              </a>
            </li>
            <li>
              <a
                href="#data-processing"
                className="text-blue-600 hover:underline"
              >
                Mode and Place of Processing the Data
              </a>
            </li>
            <li>
              <a
                href="#processing-purposes"
                className="text-blue-600 hover:underline"
              >
                The Purposes of Processing
              </a>
            </li>
            <li>
              <a
                href="#cookie-policy"
                className="text-blue-600 hover:underline"
              >
                Cookie Policy
              </a>
            </li>
            <li>
              <a href="#eu-users" className="text-blue-600 hover:underline">
                Further Information for Users in the European Union
              </a>
            </li>
            <li>
              <a
                href="#additional-data-info"
                className="text-blue-600 hover:underline"
              >
                Additional Information about Data Collection and Processing
              </a>
            </li>
            <li>
              <a href="#termination" className="text-blue-600 hover:underline">
                Termination
              </a>
            </li>
            <li>
              <a
                href="#indemnification"
                className="text-blue-600 hover:underline"
              >
                Indemnification
              </a>
            </li>
            <li>
              <a
                href="#governing-law"
                className="text-blue-600 hover:underline"
              >
                Governing Law
              </a>
            </li>
            <li>
              <a href="#changes" className="text-blue-600 hover:underline">
                Changes to Terms
              </a>
            </li>
            <li>
              <a href="#definitions" className="text-blue-600 hover:underline">
                Definitions and Legal References
              </a>
            </li>
            <li>
              <a href="#contact" className="text-blue-600 hover:underline">
                Contact Information
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6" id="ai-disclaimers">
        <CardHeader>
          <CardTitle>AI Recipe Generation Disclaimers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              AI-Generated Content Warning
            </h3>
            <p className="leading-relaxed text-yellow-700">
              All recipes, meal plans, and nutritional information provided by
              this Application are generated by artificial intelligence and are
              for informational purposes only. AI-generated content may contain
              errors, inaccuracies, or potentially harmful suggestions.
            </p>
          </div>

          <h3 className="text-lg font-semibold">No Accuracy Guarantee</h3>
          <p className="leading-relaxed">
            We make no representations or warranties regarding the accuracy,
            completeness, reliability, or suitability of any AI-generated
            recipes, nutritional information, or meal suggestions. The AI system
            may produce content that is:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Factually incorrect or misleading</li>
            <li>Nutritionally unbalanced or inappropriate</li>
            <li>Potentially dangerous food combinations</li>
            <li>Unsuitable for specific dietary needs or restrictions</li>
            <li>Containing allergens not properly identified</li>
            <li>Including unsafe cooking methods or temperatures</li>
          </ul>

          <h3 className="text-lg font-semibold">User Verification Required</h3>
          <p className="leading-relaxed">
            Users are solely responsible for verifying all AI-generated content
            before use. This includes but is not limited to checking ingredient
            safety, cooking methods, nutritional accuracy, and suitability for
            individual dietary needs and restrictions.
          </p>

          <h3 className="text-lg font-semibold">No Professional Advice</h3>
          <p className="leading-relaxed">
            AI-generated recipes and nutritional information do not constitute
            professional nutritional advice, medical advice, or professional
            cooking guidance. Always consult with qualified professionals before
            making dietary changes or following unfamiliar recipes.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6" id="health-disclaimers">
        <CardHeader>
          <CardTitle>Health & Food Safety Disclaimers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Medical Consultation Required
            </h3>
            <p className="leading-relaxed text-red-700">
              ALWAYS consult with a qualified healthcare provider, licensed
              dietitian, or your physician before making any dietary changes,
              especially if you have medical conditions, food allergies, dietary
              restrictions, or are taking medications.
            </p>
          </div>

          <h3 className="text-lg font-semibold">Food Safety Warnings</h3>
          <p className="leading-relaxed">
            We do not guarantee the food safety of any AI-generated recipes.
            Users must:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Verify safe cooking temperatures and methods</li>
            <li>Check for proper food storage and handling instructions</li>
            <li>Ensure ingredients are safe for consumption</li>
            <li>Verify expiration dates and freshness of ingredients</li>
            <li>Follow proper food safety protocols and hygiene practices</li>
            <li>Be aware of cross-contamination risks</li>
          </ul>

          <h3 className="text-lg font-semibold">Allergen Warnings</h3>
          <p className="leading-relaxed">
            AI-generated recipes may not accurately identify all allergens or
            provide complete allergen information. Users with food allergies or
            sensitivities must:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Carefully review all ingredients for potential allergens</li>
            <li>
              Consult with healthcare providers about dietary restrictions
            </li>
            <li>Cross-reference ingredients with known allergen databases</li>
            <li>Exercise extreme caution when trying new recipes</li>
            <li>
              Have emergency medical treatment readily available if needed
            </li>
          </ul>

          <h3 className="text-lg font-semibold">Special Dietary Conditions</h3>
          <p className="leading-relaxed">
            This Application is not suitable for individuals with serious
            medical conditions requiring specialized diets without professional
            medical supervision. This includes but is not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Diabetes and blood sugar management disorders</li>
            <li>Cardiovascular disease and heart conditions</li>
            <li>Kidney disease and renal disorders</li>
            <li>Liver disease and hepatic conditions</li>
            <li>Eating disorders and mental health conditions</li>
            <li>Pregnancy and breastfeeding</li>
            <li>Pediatric nutrition needs</li>
            <li>Geriatric nutrition requirements</li>
          </ul>

          <h3 className="text-lg font-semibold">
            No Medical or Nutritional Advice
          </h3>
          <p className="leading-relaxed">
            This Application does not provide medical advice, nutritional
            counseling, or therapeutic guidance. All content is for
            informational purposes only and should not replace professional
            medical or nutritional advice, diagnosis, or treatment.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6" id="liability-limitations">
        <CardHeader>
          <CardTitle>Liability Limitations and Disclaimers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              COMPLETE DISCLAIMER OF LIABILITY
            </h3>
            <p className="leading-relaxed text-gray-700 font-semibold">
              YOU USE THIS APPLICATION ENTIRELY AT YOUR OWN RISK. WE DISCLAIM
              ALL LIABILITY FOR ANY HARM, INJURY, ILLNESS, OR DAMAGE ARISING
              FROM THE USE OF THIS APPLICATION.
            </p>
          </div>

          <h3 className="text-lg font-semibold">
            No Responsibility for Outcomes
          </h3>
          <p className="leading-relaxed">
            We explicitly disclaim all responsibility for any outcomes,
            consequences, or results arising from the use of this Application,
            including but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Food poisoning or foodborne illness</li>
            <li>Allergic reactions or adverse health effects</li>
            <li>Nutritional deficiencies or imbalances</li>
            <li>Weight gain or weight loss</li>
            <li>Digestive issues or gastrointestinal problems</li>
            <li>Worsening of existing medical conditions</li>
            <li>Drug interactions or medication complications</li>
            <li>Kitchen accidents or cooking-related injuries</li>
            <li>Financial losses from ingredient purchases</li>
            <li>Time lost or wasted effort</li>
          </ul>

          <h3 className="text-lg font-semibold">Limitation of Damages</h3>
          <p className="leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL WE BE
            LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
            PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO PERSONAL INJURY,
            DEATH, PROPERTY DAMAGE, OR LOST PROFITS, REGARDLESS OF THE THEORY OF
            LIABILITY AND EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF
            SUCH DAMAGES.
          </p>

          <h3 className="text-lg font-semibold">Maximum Liability Cap</h3>
          <p className="leading-relaxed">
            Our total liability to you for all damages, losses, and causes of
            action shall not exceed the amount you paid to access this
            Application (if any), or $1.00 USD, whichever is less.
          </p>

          <h3 className="text-lg font-semibold">Service Availability</h3>
          <p className="leading-relaxed">
            We make no guarantees about the availability, reliability, or
            functionality of this Application. The Service may be interrupted,
            suspended, or terminated at any time without notice.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6" id="user-responsibilities">
        <CardHeader>
          <CardTitle>User Responsibilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-semibold">User Obligations</h3>
          <p className="leading-relaxed">
            By using this Application, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use the Service at your own risk and discretion</li>
            <li>
              Consult with healthcare professionals before making dietary
              changes
            </li>
            <li>Verify all AI-generated content before use</li>
            <li>Follow proper food safety and hygiene practices</li>
            <li>Check for allergens and dietary restrictions</li>
            <li>
              Use accurate and truthful information when interacting with the AI
            </li>
            <li>
              Not rely solely on AI-generated content for nutritional needs
            </li>
            <li>
              Take full responsibility for any consequences of using the Service
            </li>
          </ul>

          <h3 className="text-lg font-semibold">Age Restrictions</h3>
          <p className="leading-relaxed">
            This Application is not intended for use by minors under 18 years of
            age without parental supervision. Parents and guardians are
            responsible for monitoring and supervising minors&apos; use of this
            Application.
          </p>

          <h3 className="text-lg font-semibold">Accuracy of Information</h3>
          <p className="leading-relaxed">
            You are responsible for providing accurate information about your
            dietary preferences, allergies, and health conditions when using the
            Application. Providing false or misleading information may result in
            inappropriate or dangerous recommendations.
          </p>

          <h3 className="text-lg font-semibold">Third-Party Personal Data</h3>
          <p className="leading-relaxed">
            Users are responsible for any third-party Personal Data obtained,
            published or shared through this Application. You must ensure you
            have proper authorization to share such information.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6" id="prohibited-uses">
        <CardHeader>
          <CardTitle>Prohibited Uses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="leading-relaxed">
            You may not use this Application for:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Medical diagnosis or treatment purposes</li>
            <li>Professional nutritional counseling or therapy</li>
            <li>
              Commercial food service or restaurant operations without proper
              verification
            </li>
            <li>
              Creating content for vulnerable populations without professional
              oversight
            </li>
            <li>
              Generating recipes for individuals with serious medical conditions
            </li>
            <li>Any illegal or harmful purposes</li>
            <li>Circumventing safety measures or warnings</li>
            <li>Distributing AI-generated content as professional advice</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6" id="intellectual-property">
        <CardHeader>
          <CardTitle>Intellectual Property</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-semibold">Ownership</h3>
          <p className="leading-relaxed">
            The Application, its design, functionality, and underlying
            technology are owned by us and protected by intellectual property
            laws. You may not copy, modify, or distribute the Application
            without explicit written permission.
          </p>

          <h3 className="text-lg font-semibold">User-Generated Content</h3>
          <p className="leading-relaxed">
            By submitting any content to the Application, you grant us a
            non-exclusive, worldwide, royalty-free license to use, modify, and
            distribute such content in connection with the Service.
          </p>

          <h3 className="text-lg font-semibold">AI-Generated Content</h3>
          <p className="leading-relaxed">
            AI-generated recipes and content are provided as-is for your
            personal use. You may not claim ownership of AI-generated content or
            use it for commercial purposes without proper verification and
            professional oversight.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6" id="data-collection">
        <CardHeader>
          <CardTitle>Types of Data Collected</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Data Collection</h3>
          <p className="leading-relaxed">
            Complete details on each type of Personal Data collected are
            provided in the dedicated sections of this privacy policy or by
            specific explanation texts displayed prior to the Data collection.
          </p>
          <p className="leading-relaxed">
            Personal Data may be freely provided by the User, or, in case of
            Usage Data, collected automatically when using this Application.
            Unless specified otherwise, all Data requested by this Application
            is mandatory and failure to provide this Data may make it impossible
            for this Application to provide its services.
          </p>
          <p className="leading-relaxed">
            In cases where this Application specifically states that some Data
            is not mandatory, Users are free not to communicate this Data
            without consequences to the availability or the functioning of the
            Service.
          </p>
          <p className="leading-relaxed">
            Users who are uncertain about which Personal Data is mandatory are
            welcome to contact the Owner.
          </p>

          <h3 className="text-lg font-semibold">Cookies and Tracking Tools</h3>
          <p className="leading-relaxed">
            Any use of Cookies – or of other tracking tools — by this
            Application or by the owners of third-party services used by this
            Application serves the purpose of providing the Service required by
            the User, in addition to any other purposes described in the present
            document and in the Cookie Policy.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6" id="data-processing">
        <CardHeader>
          <CardTitle>Mode and Place of Processing the Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-semibold">Methods of Processing</h3>
          <p className="leading-relaxed">
            The Owner takes appropriate security measures to prevent
            unauthorized access, disclosure, modification, or unauthorized
            destruction of the Data.
          </p>
          <p className="leading-relaxed">
            The Data processing is carried out using computers and/or IT enabled
            tools, following organizational procedures and modes strictly
            related to the purposes indicated. In addition to the Owner, in some
            cases, the Data may be accessible to certain types of persons in
            charge, involved with the operation of this Application
            (administration, sales, marketing, legal, system administration) or
            external parties (such as third-party technical service providers,
            mail carriers, hosting providers, IT companies, communications
            agencies) appointed, if necessary, as Data Processors by the Owner.
          </p>
          <p className="leading-relaxed">
            The updated list of these parties may be requested from the Owner at
            any time.
          </p>

          <h3 className="text-lg font-semibold">Place of Processing</h3>
          <p className="leading-relaxed">
            The Data is processed at the Owner&apos;s operating offices and in
            any other places where the parties involved in the processing are
            located.
          </p>
          <p className="leading-relaxed">
            Depending on the User&apos;s location, data transfers may involve
            transferring the User&apos;s Data to a country other than their own.
            To find out more about the place of processing of such transferred
            Data, Users can check the section containing details about the
            processing of Personal Data.
          </p>

          <h3 className="text-lg font-semibold">Retention Time</h3>
          <p className="leading-relaxed">
            Unless specified otherwise in this document, Personal Data shall be
            processed and stored for as long as required by the purpose they
            have been collected for and may be retained for longer due to
            applicable legal obligation or based on the Users&apos; consent.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6" id="processing-purposes">
        <CardHeader>
          <CardTitle>The Purposes of Processing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="leading-relaxed">
            The Data concerning the User is collected to allow the Owner to
            provide its Service, comply with its legal obligations, respond to
            enforcement requests, protect its rights and interests (or those of
            its Users or third parties), detect any malicious or fraudulent
            activity, as well as the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Providing AI-generated recipe and meal planning services</li>
            <li>User authentication and account management</li>
            <li>Service improvement and optimization</li>
            <li>Communication with users</li>
            <li>Legal compliance and security</li>
            <li>Analytics and performance monitoring</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6" id="cookie-policy">
        <CardHeader>
          <CardTitle>Cookie Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="leading-relaxed">
            This Application uses Trackers. To learn more about the use of
            Trackers and how Users can manage their preferences, Users may
            consult the Cookie Policy or contact the Owner directly.
          </p>
          <p className="leading-relaxed">
            Cookies and similar tracking technologies are used to enhance user
            experience, analyze usage patterns, and provide personalized
            content. Users can manage their cookie preferences through their
            browser settings.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6" id="eu-users">
        <CardHeader>
          <CardTitle>
            Further Information for Users in the European Union
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-semibold">Legal Basis of Processing</h3>
          <p className="leading-relaxed">
            The Owner may process Personal Data relating to Users if one of the
            following applies:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Users have given their consent for one or more specific purposes
            </li>
            <li>
              Provision of Data is necessary for the performance of an agreement
              with the User and/or for any pre-contractual obligations thereof
            </li>
            <li>
              Processing is necessary for compliance with a legal obligation to
              which the Owner is subject
            </li>
            <li>
              Processing is related to a task that is carried out in the public
              interest or in the exercise of official authority vested in the
              Owner
            </li>
            <li>
              Processing is necessary for the purposes of the legitimate
              interests pursued by the Owner or by a third party
            </li>
          </ul>
          <p className="leading-relaxed">
            In any case, the Owner will gladly help to clarify the specific
            legal basis that applies to the processing, and in particular
            whether the provision of Personal Data is a statutory or contractual
            requirement, or a requirement necessary to enter into a contract.
          </p>

          <h3 className="text-lg font-semibold">
            Further Information about Retention Time
          </h3>
          <p className="leading-relaxed">
            Unless specified otherwise in this document, Personal Data shall be
            processed and stored for as long as required by the purpose they
            have been collected for and may be retained for longer due to
            applicable legal obligation or based on the Users&apos; consent.
          </p>
          <p className="leading-relaxed">Therefore:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Personal Data collected for purposes related to the performance of
              a contract between the Owner and the User shall be retained until
              such contract has been fully performed
            </li>
            <li>
              Personal Data collected for the purposes of the Owner&apos;s
              legitimate interests shall be retained as long as needed to
              fulfill such purposes
            </li>
            <li>
              The Owner may be allowed to retain Personal Data for a longer
              period whenever the User has given consent to such processing, as
              long as such consent is not withdrawn
            </li>
            <li>
              The Owner may be obliged to retain Personal Data for a longer
              period whenever required to fulfill a legal obligation or upon
              order of an authority
            </li>
          </ul>
          <p className="leading-relaxed">
            Once the retention period expires, Personal Data shall be deleted.
            Therefore, the right of access, the right to erasure, the right to
            rectification and the right to data portability cannot be enforced
            after expiration of the retention period.
          </p>

          <h3 className="text-lg font-semibold">
            The Rights of Users Based on the General Data Protection Regulation
            (GDPR)
          </h3>
          <p className="leading-relaxed">
            Users may exercise certain rights regarding their Data processed by
            the Owner. In particular, Users have the right to do the following,
            to the extent permitted by law:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Withdraw their consent at any time:</strong> Users have
              the right to withdraw consent where they have previously given
              their consent to the processing of their Personal Data
            </li>
            <li>
              <strong>Object to processing of their Data:</strong> Users have
              the right to object to the processing of their Data if the
              processing is carried out on a legal basis other than consent
            </li>
            <li>
              <strong>Access their Data:</strong> Users have the right to learn
              if Data is being processed by the Owner, obtain disclosure
              regarding certain aspects of the processing and obtain a copy of
              the Data undergoing processing
            </li>
            <li>
              <strong>Verify and seek rectification:</strong> Users have the
              right to verify the accuracy of their Data and ask for it to be
              updated or corrected
            </li>
            <li>
              <strong>Restrict the processing of their Data:</strong> Users have
              the right to restrict the processing of their Data. In this case,
              the Owner will not process their Data for any purpose other than
              storing it
            </li>
            <li>
              <strong>
                Have their Personal Data deleted or otherwise removed:
              </strong>{" "}
              Users have the right to obtain the erasure of their Data from the
              Owner
            </li>
            <li>
              <strong>
                Receive their Data and have it transferred to another
                controller:
              </strong>{" "}
              Users have the right to receive their Data in a structured,
              commonly used and machine readable format and, if technically
              feasible, to have it transmitted to another controller without any
              hindrance
            </li>
            <li>
              <strong>Lodge a complaint:</strong> Users have the right to bring
              a claim before their competent data protection authority
            </li>
          </ul>

          <h3 className="text-lg font-semibold">
            Details About the Right to Object to Processing
          </h3>
          <p className="leading-relaxed">
            Where Personal Data is processed for a public interest, in the
            exercise of an official authority vested in the Owner or for the
            purposes of the legitimate interests pursued by the Owner, Users may
            object to such processing by providing a ground related to their
            particular situation to justify the objection.
          </p>
          <p className="leading-relaxed">
            Users must know that, however, should their Personal Data be
            processed for direct marketing purposes, they can object to that
            processing at any time, free of charge and without providing any
            justification. Where the User objects to processing for direct
            marketing purposes, the Personal Data will no longer be processed
            for such purposes.
          </p>

          <h3 className="text-lg font-semibold">
            How to Exercise These Rights
          </h3>
          <p className="leading-relaxed">
            Any requests to exercise User rights can be directed to the Owner
            through the contact details provided in this document. Such requests
            are free of charge and will be answered by the Owner as early as
            possible and always within one month, providing Users with the
            information required by law.
          </p>
          <p className="leading-relaxed">
            Any rectification or erasure of Personal Data or restriction of
            processing will be communicated by the Owner to each recipient, if
            any, to whom the Personal Data has been disclosed unless this proves
            impossible or involves disproportionate effort. At the Users&apos;
            request, the Owner will inform them about those recipients.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6" id="additional-data-info">
        <CardHeader>
          <CardTitle>
            Additional Information about Data Collection and Processing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-semibold">Legal Action</h3>
          <p className="leading-relaxed">
            The User&apos;s Personal Data may be used for legal purposes by the
            Owner in Court or in the stages leading to possible legal action
            arising from improper use of this Application or the related
            Services.
          </p>
          <p className="leading-relaxed">
            The User declares to be aware that the Owner may be required to
            reveal personal data upon request of public authorities.
          </p>

          <h3 className="text-lg font-semibold">
            Additional Information about User&apos;s Personal Data
          </h3>
          <p className="leading-relaxed">
            In addition to the information contained in this privacy policy,
            this Application may provide the User with additional and contextual
            information concerning particular Services or the collection and
            processing of Personal Data upon request.
          </p>

          <h3 className="text-lg font-semibold">System Logs and Maintenance</h3>
          <p className="leading-relaxed">
            For operation and maintenance purposes, this Application and any
            third-party services may collect files that record interaction with
            this Application (System logs) or use other Personal Data (such as
            the IP Address) for this purpose.
          </p>

          <h3 className="text-lg font-semibold">
            Information Not Contained in This Policy
          </h3>
          <p className="leading-relaxed">
            More details concerning the collection or processing of Personal
            Data may be requested from the Owner at any time. Please see the
            contact information at the beginning of this document.
          </p>

          <h3 className="text-lg font-semibold">
            Changes to This Privacy Policy
          </h3>
          <p className="leading-relaxed">
            The Owner reserves the right to make changes to this privacy policy
            at any time by notifying its Users on this page and possibly within
            this Application and/or - as far as technically and legally feasible
            - sending a notice to Users via any contact information available to
            the Owner.
          </p>
          <p className="leading-relaxed">
            It is strongly recommended to check this page often, referring to
            the date of the last modification listed at the bottom. Should the
            changes affect processing activities performed on the basis of the
            User&apos;s consent, the Owner shall collect new consent from the
            User, where required.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6" id="termination">
        <CardHeader>
          <CardTitle>Termination</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-semibold">Termination Rights</h3>
          <p className="leading-relaxed">
            We reserve the right to terminate or suspend your access to the
            Application at any time, with or without cause, and with or without
            notice, including if you violate these Terms.
          </p>

          <h3 className="text-lg font-semibold">Effect of Termination</h3>
          <p className="leading-relaxed">
            Upon termination, your right to use the Application ceases
            immediately. All provisions of these Terms that by their nature
            should survive termination shall survive, including liability
            limitations, indemnification, and dispute resolution.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6" id="indemnification">
        <CardHeader>
          <CardTitle>Indemnification</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed">
            You agree to indemnify, defend, and hold harmless the Application,
            its owners, operators, employees, and affiliates from any claims,
            damages, losses, liabilities, and expenses (including reasonable
            attorneys&apos; fees) arising from your use of the Application,
            violation of these Terms, or any harm resulting from AI-generated
            content you use or distribute.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6" id="governing-law">
        <CardHeader>
          <CardTitle>Governing Law and Dispute Resolution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-semibold">Governing Law</h3>
          <p className="leading-relaxed">
            These Terms are governed by and construed in accordance with the
            law, without regard to conflict of law principles.
          </p>

          <h3 className="text-lg font-semibold">Dispute Resolution</h3>
          <p className="leading-relaxed">
            Any disputes arising from these Terms or your use of the Application
            shall be resolved through binding arbitration in accordance with the
            law. You waive any right to participate in class-action lawsuits or
            class-wide arbitration.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6" id="changes">
        <CardHeader>
          <CardTitle>Changes to Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed">
            We reserve the right to modify these Terms at any time. Changes will
            be posted on this page with an updated effective date. Your
            continued use of the Application after changes constitutes
            acceptance of the new Terms.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6" id="definitions">
        <CardHeader>
          <CardTitle>Definitions and Legal References</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Data (or Data)</h3>
          <p className="leading-relaxed">
            Any information that directly, indirectly, or in connection with
            other information — including a personal identification number —
            allows for the identification or identifiability of a natural
            person.
          </p>

          <h3 className="text-lg font-semibold">Usage Data</h3>
          <p className="leading-relaxed">
            Information collected automatically through this Application (or
            third-party services employed in this Application), which can
            include: the IP addresses or domain names of the computers utilized
            by the Users who use this Application, the URI addresses (Uniform
            Resource Identifier), the time of the request, the method utilized
            to submit the request to the server, the size of the file received
            in response, the numerical code indicating the status of the
            server&apos;s answer (successful outcome, error, etc.), the country
            of origin, the features of the browser and the operating system
            utilized by the User, the various time details per visit (e.g., the
            time spent on each page within the Application) and the details
            about the path followed within the Application with special
            reference to the sequence of pages visited, and other parameters
            about the device operating system and/or the User&apos;s IT
            environment.
          </p>

          <h3 className="text-lg font-semibold">User</h3>
          <p className="leading-relaxed">
            The individual using this Application who, unless otherwise
            specified, coincides with the Data Subject.
          </p>

          <h3 className="text-lg font-semibold">Data Subject</h3>
          <p className="leading-relaxed">
            The natural person to whom the Personal Data refers.
          </p>

          <h3 className="text-lg font-semibold">
            Data Processor (or Processor)
          </h3>
          <p className="leading-relaxed">
            The natural or legal person, public authority, agency or other body
            which processes Personal Data on behalf of the Controller, as
            described in this privacy policy.
          </p>

          <h3 className="text-lg font-semibold">Data Controller (or Owner)</h3>
          <p className="leading-relaxed">
            The natural or legal person, public authority, agency or other body
            which, alone or jointly with others, determines the purposes and
            means of the processing of Personal Data, including the security
            measures concerning the operation and use of this Application. The
            Data Controller, unless otherwise specified, is the Owner of this
            Application.
          </p>

          <h3 className="text-lg font-semibold">This Application</h3>
          <p className="leading-relaxed">
            The means by which the Personal Data of the User is collected and
            processed.
          </p>

          <h3 className="text-lg font-semibold">Service</h3>
          <p className="leading-relaxed">
            The service provided by this Application as described in the
            relative terms (if available) and on this site/application.
          </p>

          <h3 className="text-lg font-semibold">European Union (or EU)</h3>
          <p className="leading-relaxed">
            Unless otherwise specified, all references made within this document
            to the European Union include all current member states to the
            European Union and the European Economic Area.
          </p>

          <h3 className="text-lg font-semibold">Legal Information</h3>
          <p className="leading-relaxed">
            This privacy policy relates solely to this Application, if not
            stated otherwise within this document.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6" id="contact">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed">
            For questions about these Terms of Service, please contact us at:
          </p>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold">Legal Department</p>
            <p>bubuaimealplanner.com</p>
            <p>Email: legal@bubuaimealplanner.com</p>
            <p>
              Please allow 5-10 business days for response to legal inquiries.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Final Acknowledgment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed font-semibold">
            By using this Application, you acknowledge that you have read,
            understood, and agree to be bound by these Terms of Service. You
            understand that AI-generated content may contain errors and that you
            use this Application entirely at your own risk.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfServicePage;
