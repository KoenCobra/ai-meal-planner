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
              <a href="#privacy-data" className="text-blue-600 hover:underline">
                Privacy and Data Collection
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

      <Card className="mb-6" id="privacy-data">
        <CardHeader>
          <CardTitle>Privacy and Data Collection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-semibold">Data Collection</h3>
          <p className="leading-relaxed">
            We collect and process personal data as described in our Privacy
            Policy. By using this Application, you consent to our data
            collection and processing practices.
          </p>

          <h3 className="text-lg font-semibold">Health Information</h3>
          <p className="leading-relaxed">
            Any health or dietary information you provide is collected and
            processed at your own risk. We cannot guarantee the security or
            confidentiality of health information transmitted through the
            Application.
          </p>

          <h3 className="text-lg font-semibold">Third-Party Services</h3>
          <p className="leading-relaxed">
            The Application may integrate with third-party services, including
            AI providers. These services have their own privacy policies and
            terms of service, which you should review.
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
