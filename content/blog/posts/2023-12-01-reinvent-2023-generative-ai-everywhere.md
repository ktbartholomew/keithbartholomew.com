---
title: "AWS re:Invent 2023: Generative AI Everywhere"
date: 2023-12-01T17:00:00.000Z
excerpt: |
  At AWS re:Invent 2023, beyond the chatbot buzz, Amazon urges action with a "Now Go Build" ethos, introducing AI tools seamlessly embedded in the development process, highlighting sustainability priorities, emphasizing the ongoing relevance of serverless options, and advocating for code reduction in favor of fully-managed services.
---

I'm wrapping up a week in Las Vegas at [AWS re:Invent][reinvent], their _massive_ annual tech conference. I'll admit I had low expectations for the conference this year, mostly because I knew the recent frenzy around generative AI and chatbots was going to absolutely dominate the conversation. I was right about that, but there was a lot more to the discussion than just playing with chat bots. By the end of the conference I was still feeling that usual buzz of excitement, ready to get back to work and conquer the world.


## "Now go build"

The catchphrase of many of the keynotes this year was "Now Go Build". It usually followed announcements of new and exciting developer tools, and it was a really powerful call to action. Amazon always brags about being customer-obsessed, and I think they did a good job of demonstrating that at this conference. The point of the conference wasn't to thoughtfully learn and contemplate life and then keep doing things the way you'd always been doing them, but to collect a bunch of new and _very powerful_ tools, then get out there and build amazing things with them.

## Generative AI is not a toy

Generative AI was everywhere at re:Invent. One of the more technical sessions I went to even brought up a "Generative AI" slide towards then end and joked that they _had to_ because it's 2023 and that's what you do.

Most people only see generative AI as "ChatGPT and friends", a chat-based toy to which you can ask questions and get convincing-but-hallucinated answers. I was worried that the re:Invent story around generative AI would be much of the same; a lot of "we slapped chat on it!" and nothing more.  Boy, was I wrong!

It was clear from the start that Amazon's vision for AI on AWS was to integrate AI into every part of the [software development lifecycle][sdlc]. That means using typical chat-based tools to help brainstorm ideas during the design phase, then using newly-announced tools like [Amazon Q][q] to help shape your architecture decisions as you make them. Because Amazon Q is trained on AWS-specific domain knowledge, it can give you advice about good ways to leverage AWS products to meet your goals, and is even able to adjust its plans as you give it more information about your requirements.

The AI party continues as you get deep into writing your code, where tools like [GitHub Copilot][copilot] or [Amazon CodeWhisperer][codewhisperer] give you auto-complete on steroids. In many cases, you can just write a comment explaining what you want to do next and it can write the entire function for you! I’ve already been using Copilot on a daily basis, and it really is helpful. It’s not that I don't know how to do what I want, it's that Copilot is able to suggest what I want to do faster than I can write it, and sometimes comes up with novel approaches to problems that I might not have considered otherwise.

Amazon also announced AI-powered tools for "day-two" operations like [Amazon DevOps Guru][devops-guru], which collects tons of data about your applications and then provides machine-learning insights about opportunities to make those applications more reliable. This is a big leap forward that solves one of the biggest problems of traditional DevOps: to prevent outages, you either have to anticipate what to create alarms for, or know what to look for in your traces. Tools like DevOps Guru promise to identify those things for you, which is pretty exciting if it actually works. DevOps Guru monitoring is priced per-resource, per-hour, which means that complex applications could quickly cost a lot to monitor.

Finally, there are opportunities to use Generative AI to speed up or improve the quality of the tasks that developers _don't_ enjoy doing, like writing JIRA tickets, pull request descriptions, or other documentation or reports. Consider leveraging generative AI tools to help you write acceptance criteria for a bug, to describe your changes in a pull request description, or to proofread your documentation to be sure it's clear and concise.

## Sustainability and security are non-negotiable

A common refrain at AWS (they love catchphrases) is that ["Security is job zero"][security-at-aws]. This means that in everything they do, security is the very first priority. Sustainability, or minimizing that amount of energy required to run an application in the cloud, has been bubbling up as a consistent topic for the past few years. But this year, it shot straight to the top of the priority list.

When Dr. Werner Vogels stepped on stage to deliver his [iconic keynote][vogels-keynote], he spent almost the entire first hour of his speech talking exclusively about sustainability, and how to build applications that consume less energy and require less money to run. This is probably the only time I’ve heard somebody from AWS actively encourage all their developers to spend _less_ money on their platform. With the worldwide climate crisis worsening, the path forward is clear: we _must_ design our systems with sustainability as the top concern, and refuse to make design decisions that needlessly consume more money or energy than are absolutely necessary.

I think the most unexpected way that this mindset takes shape is related to developer experience and developer productivity. Developers are already a pretty privileged group of people, but I've found myself in countless discussions where we make decisions based on what's easiest for our developers. Is a big over-provisioned web server easier to run than a hyper-elastic set of Lambda functions? Yes, but what's the trade-off? A large, always-on EC2 instance will burn money and fossil fuels at a constant rate regardless of how much it's really needed. Is that additional energy usage worth it? Is it worthwhile to spend some more time building a more sustainable solution? I think it's time we start saying "yes" to sustainability.

## "Fully-managed" and "Serverless" still matter

"Serverless" and "fully-managed" services seem like bygone buzzwords now that generative AI has taken center stage, but it was clear that these things are still vitally important; they've just moved away from the peak of the hype cycle and down into a calmer, more rational space.

"Serverless" can mean a lot of things, but generally means spending your time thinking about how your service delivers value to customers and less time wondering if your server is running. As a happy by-product, serverless services are usually more sustainable because they're also more elastic and scale to meet user demand without excess waste.

The serverless announcement I was most excited about was [Amazon ElastiCache Serverless for Redis][elasticache-serverless]. Redis is an essential part of many of my applications, and up until now has been one of the few services that I had to deliberately provision (and over-provision) servers for. No more! ElastiCache Serverless bills per-request, and dynamically scales up and down to meet those needs. I think this will transform Redis on AWS into being a service as loved and heavily-used as DynamoDB.

Amazon's fully-managed services really shine when they give you immediate benefits with almost zero effort on your part. One of those was the announcement that you can now [use Amazon GuardDuty to do runtime monitoring of ECS Fargate containers][guardduty-fargate]. All you have to do is set a tag like `GuardDutyManaged: true` on your service, and GuardDuty will automatically inject its agent and start observing everything your application does and using—you guessed it—AI to analyze that behavior for anomalies. The moment your application unexpectedly elevates Linux permissions or starts communicating with a botnet somewhere, an alert will be raised in the AWS Security Hub! All that magic comes at a surprisingly friendly price; ECS runtime monitoring is $1.50 per vCPU, per month.

## Write less code, unless it boosts vendor lock-in

Another catchphrase at re:Invent is that "code is a liability" (I'm telling you, they _really, really_ like catchphrases. Don't get me started on "undifferentiated heavy lifting," "the innovation flywheel", or "everything fails all the time"). "Code is a liability" is the AWS way of saying that the more code you write, the more complexity and maintenance you introduce, so you should just replace that code with a fully-managed AWS service instead.

This advice makes a lot of sense for complex integrations where there's a single drop-in replacement, but the advice falls flat when replacing simple "glue code" with AWS-specific integrations. One that continues to bother me is [AWS Step Functions][step-functions], which lets you link together inputs and outputs of almost any AWS service without writing any code. It's really amazing what it can do, and AWS serverless advocates will often brag about how they can get a complex system to work using only Step Functions.

In reality, AWS Step Functions still requires a lot of configuration, and you should be expressing that [configuration as code][iac]. So now, instead of having a Lambda that directly does the thing you want it to do, you have a bunch of domain-specific language (DSL) code that abstracts your task into a Step Functions state machine. You're still writing code, but I would argue that the code you're writing is now more difficult to understand on its own, and even more difficult to maintain and extend over time.


[reinvent]: https://reinvent.awsevents.com/
[sdlc]: https://en.wikipedia.org/wiki/Systems_development_life_cycle
[q]: https://aws.amazon.com/q/
[copilot]: https://github.com/features/copilot
[codewhisperer]: https://docs.aws.amazon.com/codewhisperer/latest/userguide/what-is-cwspr.html
[devops-guru]: https://aws.amazon.com/devops-guru/
[security-at-aws]: https://aws.amazon.com/blogs/enterprise-strategy/security-at-aws/
[vogels-keynote]: https://www.youtube.com/watch?v=UTRBVPvzt9w
[elasticache-serverless]: https://aws.amazon.com/blogs/aws/amazon-elasticache-serverless-for-redis-and-memcached-now-generally-available/
[guardduty-fargate]: https://aws.amazon.com/about-aws/whats-new/2023/11/amazon-guardduty-ecs-runtime-monitoring-fargate/
[step-functions]: https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html
[iac]: https://www.redhat.com/en/topics/automation/what-is-infrastructure-as-code-iac