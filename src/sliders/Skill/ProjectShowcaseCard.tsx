import { normalizeStr } from "../../Utils";
import project_sample from "../../assets/project_sample.png";
interface IProjectShowcaseCardProps {
  name: string;
  description: string;
  url: string;
}

export function ProjectShowcaseCard(props: IProjectShowcaseCardProps) {
  return (
    <div class="w-full h-fit overflow-hidden p-4  bg-[rgba(255,255,255,.05)] flex flex-col gap-2 rounded-lg">
      <h2>{normalizeStr(props.name)}</h2>

      <div
        style={{
          "background-image":
            "url(https://raw.githubusercontent.com/Febri-i/" +
            props.name +
            "/main/thumbnail.png)",
        }}
        class=" flex flex-auto thumbnailPict justify-center items-center w-full bg-cover bg-no-repeat bg-center aspect-[16/9] rounded-lg overflow-hidden"
      ></div>
      <p>{props.description}</p>
    </div>
  );
}
