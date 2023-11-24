export default function Page() {
  return (
    <>
      <h1>Keith Bartholomew</h1>
      <p>
        I am an ambitious, strategic full-stack engineer with broad, extensive
        experience building web applications, the backend systems that drive
        them, and the DevOps platforms that keep them running.
      </p>
      <ul>
        <li>
          Email:{" "}
          <a href="mailto:keith@keithbartholomew.com">
            keith@keithbartholomew.com
          </a>
        </li>
        <li>
          Website:{" "}
          <a href="https://keithbartholomew.com/">keithbartholomew.com</a>
        </li>
        <li>
          GitHub: <a href="https://github.com/ktbartholomew">ktbartholomew</a>
        </li>
      </ul>

      <h2>Work Experience</h2>
      <h3>
        GoDaddy &ndash; Senior Software Engineer &ndash; <em>2019-present</em>
      </h3>

      <p>
        I provided technical leadership to a team of engineers to build a
        cloud-native internal development platform. The platform integrated with
        a wide variety of internal systems and tools to accelerate developers’
        ability to create and ship projects. The platform leveraged technologies
        like Amazon ECS, Lambda, SNS, and SQS to achieve a resilient and
        cost-effective platform.
      </p>
      <p>
        In addition to building the development platform, I also participated in
        many internal open-source and developer experience projects, including
        building and maintaining librariese and CLI utilities, coaching junior
        engineers on best practices, and publishing an internal podcast to boost
        developer engagement.
      </p>
      <h3>Rackspace &ndash; Full-stack Engineer &ndash; 2015-2019</h3>
      <p>
        I was solely responsible for building a web control panel to manage
        Kubernetes clusters. The React+Redux frontend coupled closely with a
        Golang backend to make complex Kubernetes tasks intuitive for any user.
        To enable this app, I also built an OIDC system to allow the control
        panel, Kubernetes itself, and multiple related web apps to share SSO
        with cloud providers like AWS, Azure, and Openstack. Prior to this, I
        built a distributed content-management system that enabled the
        publishing of docs from many content platforms like Jekyll and Sphinx to
        a single web portal. During my time at Rackspace, I used a myriad of
        languages and tools, including Golang, Node.js (and browser-side
        JavaScript), Python, Ansible, Kubernetes, and Ansible.
      </p>
      <h3>70kft &ndash; Web Developer &ndash; 2013-2015</h3>
      <p>
        As a web developer for a digital agency, I was responsible for rapidly
        producing accessible and search-optimized websites for a variety of
        clients. I used CMS’s like Craft, ExpressionEngine, and WordPress to
        build flexible content systems, wrote PHP to enable custom backend
        functionality, and wrote all the HTML, CSS (via Sass), and JavaScript
        necessary to build the front-end. For several months, I led a team of
        engineers at a major telecommunications company to architect and build a
        massive Angular web console for their private cloud service.
      </p>

      <h2>Education</h2>
      <h3>University of Texas at Arlington</h3>
      <p>B.A. in Communication Technology, graduated Cum Laude in 2011</p>
    </>
  );
}
