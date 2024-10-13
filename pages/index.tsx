import Container from "../components/container";
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Resume() {
  return (
    <Container>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Lucas Brogni</h1>
        <p className="text-xl text-gray-600">Software Engineer</p>
        <p className="text-gray-600">lucasbrogni16@gmail.com</p>

        <div className="mt-4 flex justify-center space-x-6">
          <a href="https://github.com/brognilucas" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
            <FaGithub size={30} />
          </a>
          <a href="https://linkedin.com/in/lucas-brogni" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
            <FaLinkedin size={30} />
          </a>
        </div>
      </header>


      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Summary</h2>
        <p className="text-gray-700">
          With extensive experience as a Software Engineer, I have worked with a diverse range of technologies including NodeJS, Typescript, AWS, React, Java, Kotlin, GraphQL, MySQL, Postgres, and MongoDB at companies such as Hoist Group, Avalara, Pleo, and Taxdoo. Most recently, I served as the engineering manager for my team, stepping in for the previous manager during their 10-month maternity leave.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Last 3 Professional Experiences</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Senior Software Engineer / Team Lead</h3>
          <p className="text-gray-600">Taxdoo | Mar 2023 - Present</p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Developed new features, collaborating in the entire Software Development lifecycle</li>
            <li>Management of infrastructure using IaC with AWS CDK</li>
            <li>Drove technical initiatives from system design to implementation</li>
            <li>Designed the team's testing strategy</li>
            <li>Mentored engineers through Taxdoo's mentorship program</li>
            <li>Worked across multiple projects such as defining a new testing strategy for the team and decoupling login from the legacy app migrating to AWS Cognito</li>
            <li>For 10 months, worked as the team's temporary Engineering Manager</li>
          </ul>
          <p className="text-gray-600 mt-2"><strong>Technologies:</strong> NodeJS, TypeScript, React, Cypress, Jest, MySQL, AWS, AWS CDK, DynamoDB, and AWS Lambda</p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Backend Software Engineer</h3>
          <p className="text-gray-600">Pleo | Feb 2022 - Mar 2023</p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Development of new features extending the existing product collaborating in the entire Software Development lifecycle</li>
            <li>Collaboration on pair programming sessions and code reviews of team members</li>
            <li>Management of infrastructure using IaC with Terraform</li>
            <li>Worked on multiple projects including enablement of multi-entities and transaction reviews for multi-entities teams</li>
          </ul>
          <p className="text-gray-600 mt-2"><strong>Technologies:</strong> NodeJS, Typescript, Kotlin, JUnit, Jest, Postgres, Kubernetes, Docker, AWS, and Terraform</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Senior Backend Software Engineer</h3>
          <p className="text-gray-600">Learningbank | Aug 2021 - Feb 2022</p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Built features extending the existing product utilizing NodeJS and Typescript</li>
            <li>Collaboration on pair programming sessions and code reviews of team members</li>
            <li>Worked closely with the frontend team to ensure seamless integration between frontend and backend</li>
            <li>Wrote technical documentation such as RFCs, ADRs, etc.</li>
            <li>Worked on projects such as redesigning APIs to follow RESTFUL standards, creating a default template for new NodeJS services, and designing a solution for asynchronous communication between services</li>
          </ul>
          <p className="text-gray-600 mt-2"><strong>Technologies:</strong> NodeJS, Jest, AWS, and MySQL</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Previous Professional Experiences</h2>
        <p className="text-gray-700">
        5 other years of experience across multiple industries between Brazil and Portugal. Such experiences include startups, consultancies, and corporates. During this time, I worked on multiple projects and was mostly responsible for developing solutions.         </p>
        <p className="text-gray-600 mt-2"><strong>Technologies:</strong> Javascript, Typescript, NodeJS, React, Angular, Java, and PHP.</p>
      </section>


      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Personal Projects</h2>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">API for Prospect Analysis in College Football to NFL Transition</h3>
          <p className="text-gray-700 mt-2">
            Created a fully serverless API as a proof of concept for a Master's Degree in software architecture. Achieved a project grade of 9/10.
          </p>
          <p className="text-gray-600 mt-2"><strong>Technologies:</strong> TypeScript, AWS, MongoDB, Serverless</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Education</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Master in Software Architecture</h3>
          <p className="text-gray-600">IGTI (Brazil) | 2020 - 2021</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">College degree in Web Software Development</h3>
          <p className="text-gray-600">SENAI (Brazil) | 2016 - 2019</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Languages</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Portuguese (Native)</li>
          <li>English (Fluent/Proficient)</li>
          <li>Italian (Elementary)</li>
        </ul>
      </section>
    </Container>
  );
}

Resume.displayName = 'Resume';

export default Resume;
