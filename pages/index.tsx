import Container from "../components/container";
import { Github, Linkedin, Globe } from 'lucide-react';

function Home() {
  return (
    <Container>
      <header className="flex flex-col items-center justify-center py-12 bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-md mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-2">Lucas Brogni</h1>
        <p className="text-2xl text-gray-700 font-medium mb-2">Senior Software Engineer & Engineering Leader</p>
        <p className="text-gray-500 mb-4">lucasbrogni16@gmail.com</p>
        <div className="flex space-x-6 mb-2">
          <a href="https://vykwqnnvfkuxybai.public.blob.vercel-storage.com/Lucas%20Brogni%20-%20Senior%20Software%20Engineer.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600" title="Personal Website">
            <Globe size={28} />
          </a>
          <a href="https://github.com/brognilucas" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800" title="GitHub">
            <Github size={28} />
          </a>
          <a href="https://linkedin.com/in/lucas-brogni" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700" title="LinkedIn">
            <Linkedin size={28} />
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">About Me</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            I am a passionate Senior Software Engineer and Engineering Leader with over 10 years of experience building scalable, reliable, and high-performance systems. My journey has taken me across Brazil, Portugal, Denmark, and Germany, where I have contributed to and led teams in startups, consultancies, and global tech companies. I thrive in collaborative, multicultural environments and enjoy mentoring engineers, driving technical excellence, and delivering impactful solutions.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">What I Do</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>Design and implement backend and cloud architectures (microservices, serverless, event-driven)</li>
            <li>Lead technical initiatives, migrations, and testing strategies</li>
            <li>Mentor and grow engineering teams</li>
            <li>Drive DevOps culture: CI/CD, infrastructure as code, monitoring, and automation</li>
            <li>Advocate for clean code, best practices, and continuous improvement</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Technologies</h2>
          <div className="flex flex-wrap gap-3 text-gray-700 text-lg">
            <span className="bg-gray-100 rounded px-3 py-1">TypeScript</span>
            <span className="bg-gray-100 rounded px-3 py-1">Node.js</span>
            <span className="bg-gray-100 rounded px-3 py-1">React</span>
            <span className="bg-gray-100 rounded px-3 py-1">Java</span>
            <span className="bg-gray-100 rounded px-3 py-1">Kotlin</span>
            <span className="bg-gray-100 rounded px-3 py-1">AWS</span>
            <span className="bg-gray-100 rounded px-3 py-1">Terraform</span>
            <span className="bg-gray-100 rounded px-3 py-1">PostgreSQL</span>
            <span className="bg-gray-100 rounded px-3 py-1">MySQL</span>
            <span className="bg-gray-100 rounded px-3 py-1">MongoDB</span>
            <span className="bg-gray-100 rounded px-3 py-1">DynamoDB</span>
            <span className="bg-gray-100 rounded px-3 py-1">Kafka</span>
            <span className="bg-gray-100 rounded px-3 py-1">RabbitMQ</span>
            <span className="bg-gray-100 rounded px-3 py-1">Jest</span>
            <span className="bg-gray-100 rounded px-3 py-1">Cypress</span>
            <span className="bg-gray-100 rounded px-3 py-1">CI/CD</span>
            <span className="bg-gray-100 rounded px-3 py-1">Agile</span>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Education & Certifications</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>Postgraduate Degree in Tech Management, FIAP (2025 – Present)</li>
            <li>MBA in Software Architecture, IGTI (2020 – 2021)</li>
            <li>Bachelor of Technology in Internet Systems, SENAI (2016 – 2019)</li>
            <li>SFPC - Scrum Foundation Professional Certification</li>
            <li>JSNSD - OpenJS Node.JS Services Developer</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Languages</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>Portuguese (Native)</li>
            <li>English (Fluent)</li>
            <li>Italian (Intermediate)</li>
          </ul>
        </section>
      </main>
    </Container>
  );
}

Home.displayName = 'Home';

export default Home;