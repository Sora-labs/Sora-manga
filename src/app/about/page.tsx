import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

enum Tab {
  about = "about",
  tos = "tos",
  policy = "policy",
  permission = "permission",
}

export default function About() {
  return (
    <div className="page-container my-14 px-8">
      <Tabs defaultValue={Tab.about}>
        <TabsList>
          <TabsTrigger className="cursor-pointer" value={Tab.about}>
            About
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value={Tab.tos}>
            Term of service
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value={Tab.policy}>
            Policy
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value={Tab.permission}>
            User permission
          </TabsTrigger>
        </TabsList>

        <AboutTab />
        <TosTab />
        <PolicyTab />
        <UserPermissionTab />
      </Tabs>
    </div>
  );
}

function AboutTab() {
  return (
    <TabsContent value={Tab.about}>
      <h2 className="text-lg font-semibold mb-2">About Sora Manga</h2>
      <div className="flex flex-col gap-4">
        <p>
          Sora Manga is a part of the Sora ecosystem. The Sora ecosystem is a
          mega project founded by Akashic, Founder of Sora labs. You can find
          more details about this project{" "}
          <span className="text-blue-600">here</span>.
        </p>
        <p>
          Sora Manga provides variety of manga. Yep unlimited, even pirating
          manga and we won't remove them even if we're asked to do so.
        </p>
        <p>
          The ultimate platform for manga lovers! Our goal is to provide a
          seamless and unrestricted experience for readers and creators alike,
          where manga enthusiasts can explore, read, and share their passion for
          manga freely.
        </p>
        <p>
          We believe in supporting artistic expression without censorship, which
          means you'll have access to a diverse range of manga content from
          various genres, including those often overlooked or underrepresented.
          Whether you're a reader, artist, or publisher, Sora Manga is your
          space to discover, engage, and contribute to the world of manga. By
          using our platform, you are part of a global community united by a
          love for manga in all its forms. The sky is the limit. Happy reading!
        </p>
      </div>
    </TabsContent>
  );
}

function TosTab() {
  return (
    <TabsContent value={Tab.tos}>
      <h2 className="flex justify-between text-lg font-semibold mb-2">
        Terms of service
        <span className="text-sm">Last update: 9/9/2025</span>
      </h2>
      <div className="flex flex-col gap-4">
        <p>
          1. Acceptance of Terms By accessing or using Sora Manga, you agree to
          comply with and be bound by these Terms of Service. If you do not
          agree to these terms, please do not use the Platform.
        </p>
        <p>
          2. User Accounts To access certain features of the Platform, you may
          be required to create a user account. You agree to provide accurate
          and complete information during the registration process and to keep
          your account information up to date.
        </p>
        <p>
          3. Age Restriction Due to the nature of some content, users must be at
          least 18 years old to access certain sections of the Platform. If you
          are under 18, you may not use these specific features and must refrain
          from submitting any content that may be inappropriate for your age
          group.
        </p>
        <p>
          4. Content Ownership and Licensing All manga content uploaded by users
          is considered the intellectual property of the respective creators or
          copyright holders unless otherwise specified. By submitting content,
          you retain your rights to the content but grant [Your App Name] a
          non-exclusive, worldwide, royalty-free license to host, display, and
          distribute your content on the Platform.
        </p>
        <p>
          5. Usage Guideline: We discourage any malicious action like scamming
          or attacking our platform or other users with tools such as: Malware,
          viruses, or other harmful software.
        </p>
        <p>
          6. No Censorship Policy We uphold a strict no-censorship policy with
          the understanding that manga is an art form that thrives on freedom of
          expression. However, content must still adhere to local laws and
          regulations, and users must take full responsibility for the content
          they upload.
        </p>
        <p>
          7. User Conduct You agree to use the Platform in a manner that is
          respectful to others and does not interfere with the normal
          functioning of the Platform. Prohibited actions include, but are not
          limited to: Engaging in spamming or flooding. Attempting to access
          unauthorized areas of the Platform. Using the Platform to distribute
          malware or other harmful materials.
        </p>
        <p>
          8. Third-Party Content The Platform may feature third-party
          advertisements, links, or integrations. We are not responsible for the
          content or accuracy of these third-party resources.
        </p>
        <p>
          9. Termination of Account We reserve the right to suspend or terminate
          your account at any time if we believe you have violated these Terms
          of Service, local laws, or engaged in inappropriate conduct.
        </p>
        <p>
          10. Disclaimers The Platform is provided "as-is" without any
          warranties, express or implied, including but not limited to the
          accuracy, reliability, or completeness of the content. We do not
          guarantee the availability of the Platform or that it will meet your
          expectations.
        </p>
        <p>
          11. Limitation of Liability In no event shall [Your App Name] be
          liable for any indirect, incidental, special, or consequential damages
          arising from your use of the Platform or any third-party content.
        </p>
        <p>
          12. Changes to Terms We reserve the right to update or modify these
          Terms of Service at any time. We will notify users of significant
          changes via the Platform. Continued use of the Platform after changes
          to the Terms of Service will constitute acceptance of the updated
          terms.
        </p>
        <p className="text-red-600">
          All kind of violation will result a ban from using and accessing the
          platform
        </p>
      </div>
    </TabsContent>
  );
}

function PolicyTab() {
  return (
    <TabsContent value={Tab.policy}>
      <h2 className="flex justify-between text-lg font-semibold mb-2">
        Private Policy
        <span className="text-sm">Last update: 9/9/2025</span>
      </h2>
      <div className="flex flex-col gap-4">
        <p>
          1. Introduction Sora Manga respects your privacy and is committed to
          protecting the personal information you share with us. This Privacy
          Policy explains what information we collect, how we use it, and the
          steps we take to protect your data.
        </p>
        <p>
          2. Information We Collect We collect the following types of
          information: Personal Information: This includes your name, email
          address, date of birth, and any other details you provide when
          creating an account or interacting with the Platform. Usage Data: We
          collect data related to how you use the Platform, including page
          visits, clicks, and interactions with content. Cookies: We use cookies
          to enhance your experience on the Platform. You can manage your cookie
          preferences through your browser settings.
        </p>
        <p>
          3. How We Use Your Information Your information is used for the
          following purposes: To provide you with a personalized experience on
          the Platform. To communicate with you about updates, new features, and
          promotions. To improve the functionality and user experience of the
          Platform. To ensure compliance with legal obligations and prevent
          fraudulent activity.
        </p>
        <p>
          4. Sharing Your Information We do not sell or rent your personal
          information to third parties. However, we may share your data in the
          following circumstances: With service providers who help us operate
          the Platform. With law enforcement or regulatory authorities if
          required by law. In the event of a business transfer (e.g., merger or
          acquisition).
        </p>
        <p>
          5. Data Security We take reasonable steps to protect your personal
          information from unauthorized access or disclosure. However, no system
          is completely secure, and we cannot guarantee the security of your
          data.
        </p>
        <p>
          6. Your Rights You have the right to access, correct, or delete the
          personal information we hold about you. You can also withdraw consent
          for the collection of your data at any time by contacting us.
        </p>
        <p>
          7. Children’s Privacy We do not knowingly collect personal information
          from individuals under the age of 13. If you believe we have collected
          such information, please contact us immediately, and we will take
          steps to remove it.
        </p>
        <p>
          8. Changes to Privacy Policy We may update this Privacy Policy
          periodically. When we make significant changes, we will notify you
          through the Platform. Your continued use of the Platform after any
          changes constitutes acceptance of the revised policy.
        </p>
      </div>
    </TabsContent>
  );
}

function UserPermissionTab() {
  return (
    <TabsContent value={Tab.permission}>
      <h2 className="flex justify-between text-lg font-semibold mb-2">
        User permission
        <span className="text-sm">Last update: 9/9/2025</span>
      </h2>
      <div className="flex flex-col gap-4">
        <p>
          Users do not need to create an account to access to our available
          contents, this user permission also known as{" "}
          <span className="font-semibold">Default user</span>
        </p>
        <p>
          <span className="font-semibold">Registered users</span> get all
          permissions that <span className="font-semibold">Default users</span>{" "}
          have with few additional permissions: manage your own mangas and fully
          managing your own profile
        </p>
        <p>
          Sora Manga do not ask your email address when you first register your
          account. However, when you lose your account like forgetting your
          password then we need your email to send a verification to reset your
          password so we highly recommend you to verify your account as soon as
          possible. Only if you cherish your account that is.{" "}
          <span className="font-semibold">Verified users</span> will receive a
          little bit special permission to add tags as well manage tags but any
          malicious actions to mess this tag system up will result{" "}
          <span className="text-red-600">a permanent ban </span>
          without advance notice
        </p>
        <p>
          Long time access, contributing and trusted users will receive an
          exclusive permission to become{" "}
          <span className="font-semibold">a new admin </span>
          to help grow our platform. We will update a system to choose and
          voting among the existing admins later!
        </p>
      </div>
    </TabsContent>
  );
}
