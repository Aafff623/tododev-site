/**
 * state.ts — demo 的集中状态机（useReducer，research/02）。
 * Tier A 交互全部走这里；mock-only，可随时 RESET/REPLAY。
 */
export type DemoScreen = "workspace" | "schedules" | "connections" | "skills";
export type PaletteTab = "all" | "tasks" | "topics";

export type DemoState = {
  screen: DemoScreen;
  sidebarExpanded: boolean;
  /** 展开态的自定义宽度（clamp 200–320），折叠时固定 52 */
  sidebarWidth: number;
  paletteOpen: boolean;
  paletteTab: PaletteTab;
  paletteQuery: string;
  projectsOpen: boolean;
  resourcesOpen: boolean;
  /** 移动端 chat ↔ board 互斥显示 */
  mobileBoard: boolean;
  mobileNavOpen: boolean;
  /** 剧情引擎（research/08 自创创新 6）：已推进到的 beat 序号 */
  storyBeat: number;
  /** 自动播放/idle 导览开关（用户交互即暂停） */
  autoplay: boolean;
};

export const SIDEBAR_COLLAPSED = 52;
export const SIDEBAR_MIN = 200;
export const SIDEBAR_MAX = 320;

export const initialDemoState: DemoState = {
  screen: "workspace",
  sidebarExpanded: false,
  sidebarWidth: 240,
  paletteOpen: false,
  paletteTab: "all",
  paletteQuery: "",
  projectsOpen: false,
  resourcesOpen: false,
  mobileBoard: false,
  mobileNavOpen: false,
  storyBeat: 0,
  autoplay: true,
};

export type DemoAction =
  | { type: "navigate"; screen: DemoScreen }
  | { type: "toggle-sidebar" }
  | { type: "set-sidebar-width"; width: number }
  | { type: "open-palette" }
  | { type: "close-palette" }
  | { type: "set-palette-query"; query: string }
  | { type: "set-palette-tab"; tab: PaletteTab }
  | { type: "toggle-projects" }
  | { type: "toggle-resources" }
  | { type: "toggle-mobile-board" }
  | { type: "set-mobile-nav"; open: boolean }
  | { type: "story-advance"; to?: number }
  | { type: "set-autoplay"; value: boolean }
  | { type: "replay" }
  | { type: "hydrate"; patch: Partial<DemoState> };

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "navigate":
      return {
        ...state,
        screen: action.screen,
        mobileNavOpen: false,
        autoplay: false,
      };
    case "toggle-sidebar":
      return { ...state, sidebarExpanded: !state.sidebarExpanded };
    case "set-sidebar-width": {
      const width = clamp(action.width, SIDEBAR_MIN, SIDEBAR_MAX);
      return { ...state, sidebarWidth: width, sidebarExpanded: true };
    }
    case "open-palette":
      return { ...state, paletteOpen: true, paletteQuery: "", paletteTab: "all" };
    case "close-palette":
      return { ...state, paletteOpen: false };
    case "set-palette-query":
      return { ...state, paletteQuery: action.query };
    case "set-palette-tab":
      return { ...state, paletteTab: action.tab };
    case "toggle-projects":
      return { ...state, projectsOpen: !state.projectsOpen };
    case "toggle-resources":
      return { ...state, resourcesOpen: !state.resourcesOpen };
    case "toggle-mobile-board":
      return { ...state, mobileBoard: !state.mobileBoard };
    case "set-mobile-nav":
      return { ...state, mobileNavOpen: action.open };
    case "story-advance":
      return { ...state, storyBeat: action.to ?? state.storyBeat + 1 };
    case "set-autoplay":
      return { ...state, autoplay: action.value };
    case "replay":
      return {
        ...initialDemoState,
        sidebarExpanded: state.sidebarExpanded,
        sidebarWidth: state.sidebarWidth,
      };
    case "hydrate":
      return { ...state, ...action.patch };
    default:
      return state;
  }
}
