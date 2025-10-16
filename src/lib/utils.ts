import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_URL = "https://api.vizbl.us";

export type ObjectMaterial = {
  name: string;
  previews?: Array<{ url?: string; subRes?: { small?: string } }>;
  native?: { glbUrl?: string };
  hid: string;
  [key: string]: unknown;
};

export type ObjectDetails = {
  uuid: string;
  tinuuid: string;
  name: string;
  hashtags?: string;
  materials?: ObjectMaterial[];
  covers?: { url: string; imgOrientation: "vertical" | "horizontal" }[];
};

export async function fetchObjectDetails(
  tinuuid: string
): Promise<ObjectDetails | null> {
  try {
    const response = await fetch(`${API_URL}/obj/Fetch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tinuuid }),
    });

    if (!response.ok) return null;
    return (await response.json()) as ObjectDetails;
  } catch (error) {
    console.error("fetchObjectDetails", error);
    return null;
  }
}
