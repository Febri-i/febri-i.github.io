import FractalTreeBackground from "./Project/FractalTreeBackground";
import { capitalize, normalizeStr } from "../Utils";
import {
  For,
  Show,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import { useTheJazz } from "../App";

export interface ProjectInfo {
  name: string;
  topics: string[];
  description: string;
  url: string;
}

function fetchProjectList(): Promise<ProjectInfo[]> {
  return fetch("https://api.github.com/users/febri-i/repos")
    .then((response) => response.json())
    .then((projects: any[]) => {
      return projects
        .filter((data: any) => data.topics.includes("personal-finished"))
        .map((data: any) => {
          return {
            name: data.name,
            url: data.homepage || data.html_url,
            description: data.description,
            topics: data.topics,
          };
        });
    });
}

const [projectList] = createResource<ProjectInfo[]>(fetchProjectList);

export function useProjectList() {
  return projectList;
}

export default function Project() {
  const doTheJazz = useTheJazz();

  return (
    <>
      <div class="landscape:absolute portrait:hidden  bg-black inset-0">
        <FractalTreeBackground
          totalTree={50}
          duration={5}
          getColor={(brightness: number) => {
            return `rgb(${5 + 250 * brightness},0,0)`;
          }}
        ></FractalTreeBackground>
      </div>
      <div class="relative w-full landscape:flex justify-center items-center h-full">
        {/* <div class="bg-[red] portrait:aspect-square portrait:mb-10  portrait:w-full"></div> */}
        <div>
          <h1 class="portrait:mt-10">Projects:</h1>
          <Show when={projectList()}>
            <ul>
              <For each={projectList()}>
                {(project, index) => {
                  return (
                    <li class="portrait:mb-2">
                      <h2>
                        <a target="_blank" href={project.url} class="fancyLink">
                          {normalizeStr(project.name)}
                        </a>
                      </h2>
                      {!doTheJazz() && (
                        <p class="ml-2">{project.description}</p>
                      )}
                    </li>
                  );
                }}
              </For>
            </ul>
          </Show>
        </div>
      </div>
    </>
  );
}
