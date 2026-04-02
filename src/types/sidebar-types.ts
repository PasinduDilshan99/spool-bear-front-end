// types/sidebar.ts
export interface SidebarItem {
  id: number;
  parentId: number | null;
  name: string;
  description: string;
  privilegeName: string;
  status: string;
  url: string | null;
  children: SidebarItem[] | null;
}

export interface SidebarResponse {
  code: number;
  status: string;
  message: string;
  data: SidebarItem[];
  timestamp: string;
}

