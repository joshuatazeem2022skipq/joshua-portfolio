import * as THREE from "three";

export interface JourneySection {
  id: string;
  label: string;
  /** Which side the HTML panel sits on; the planet occupies the other side. */
  panelSide: "left" | "right" | "center";
}

export const JOURNEY_SECTIONS: JourneySection[] = [
  { id: "hero", label: "Launch", panelSide: "center" },
  { id: "about", label: "About", panelSide: "left" },
  { id: "skills", label: "Skills", panelSide: "right" },
  { id: "experience", label: "Experience", panelSide: "left" },
  { id: "projects", label: "Projects", panelSide: "right" },
  { id: "resume", label: "Resume", panelSide: "left" },
  { id: "contact", label: "Contact", panelSide: "center" },
];

const SPACING = 20;

/** Camera waypoints — a meandering path deeper into the galaxy. */
export const WAYPOINTS = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(4.5, 1.2, -SPACING),
  new THREE.Vector3(-4.5, -1, -SPACING * 2),
  new THREE.Vector3(5, 1.8, -SPACING * 3),
  new THREE.Vector3(-5, -1.5, -SPACING * 4),
  new THREE.Vector3(4, 1, -SPACING * 5),
  new THREE.Vector3(0, 0.2, -SPACING * 6),
];

export const CAMERA_CURVE = new THREE.CatmullRomCurve3(
  WAYPOINTS,
  false,
  "catmullrom",
  0.4
);

/** Planet anchor for each section — offset to the side opposite its panel. */
export function planetPosition(index: number): THREE.Vector3 {
  const wp = WAYPOINTS[index];
  const side = JOURNEY_SECTIONS[index].panelSide;
  const sign = side === "left" ? 1 : side === "right" ? -1 : 0;
  return new THREE.Vector3(
    wp.x + sign * 6.5,
    wp.y + (index % 2 === 0 ? 1 : -1) * 0.8,
    wp.z - 6
  );
}
