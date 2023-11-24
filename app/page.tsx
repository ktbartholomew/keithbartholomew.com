import Image from "next/image";

export default function Page() {
  return (
    <>
      <h1>Keith Bartholomew</h1>
      <Image
        src={
          "https://secure.gravatar.com/avatar/b52cebf584041044d87df10ea9afdf7f5aa09c4ff66182d4bcbca25f507414c7?s=512"
        }
        alt="profile picture of Keith Bartholomew"
        width="512"
        height="512"
        className="block align-center w-[256px] h-[256px] mb-8"
      />
      <p>
        Hey there! I’m Keith, a software engineer from Dallas, Texas. I’ve been
        building websites and distributed cloud systems for over 10 years. My
        experience has taken me everywhere from building boutique agency
        websites to massive enterprise systems.
      </p>
      <p>
        Professionally, I’m very interested in developer experience. I’ve seen
        firsthand the difference good tools can make in a developer’s life, so
        building those tools has been a big part of my work.
      </p>
      <p>
        I’m an avid racing cyclist, and I enjoy cycling and cooking whenever I’m
        not at work.
      </p>
    </>
  );
}
