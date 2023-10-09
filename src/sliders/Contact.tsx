import { useTheJazz } from "../App";
import ParticleBackground from "./Contact/ParticleBackground";
import { IoMail, IoLogoGithub, IoHome } from "solid-icons/io";

export function Contact() {
  const doTheJazz = useTheJazz();
  const email = "febribayun@gmail.com";
  const nama = "Febri Bayu Nurcahyo";
  const posisi = "Front-End Developer";
  const alamat = "Semanu Selatan, Semanu, Semanu, Gunungkidul, DI Yogyakarta";
  const nickname = "Febri-i";
  const githubProfile = "https://github.com/Febri-i";

  return (
    <div class="w-full landscape:h-full landscape:z-20 relative landscape:bg-black">
      {doTheJazz() && (
        <div class="absolute inset-0">
          <ParticleBackground
            trailColor={{ r: 135, g: 206, b: 235 }}
            headColor={{ r: 255, g: 255, b: 255 }}
          />
        </div>
      )}

      {doTheJazz() ? (
        <div class="w-full h-full z-10 relative flex bg-transparent items-center justify-center">
          <div class="landscape:text-black" id="bussinesCard">
            <div class="flex justify-between">
              <p>
                {" "}
                <a href={"mailto:" + email}>{email}</a>
              </p>
              <a
                href={githubProfile}
                target="_blank"
                class="font-script febriLogoScript"
              >
                {nickname}
              </a>
            </div>
            <div class="flex items-center justify-center ">
              <div class="flex flex-col items-center">
                <h2 class="font-important">{nama}</h2>
                <p>{posisi}</p>
              </div>
            </div>
            <p class="text-center">{alamat}</p>
          </div>
        </div>
      ) : (
        <div class="flex flex-col gap-1">
          <h1>Contact me: </h1>
          <p class="block">{nama}</p>

          <a href={"mailto:" + email} class="flex gap-2 items-center fancyLink">
            <IoMail /> {email}
          </a>
          <a href={githubProfile} class="flex gap-2 items-center fancyLink">
            <IoLogoGithub /> {githubProfile}
          </a>
          <p>{alamat}</p>
          <h1 class="mt-10 font-script febriLogoScript inline-block ml-auto">
            {nickname}
          </h1>
        </div>
      )}
    </div>
  );
}
