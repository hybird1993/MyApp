export class TreeData {
  id: number | string;
  title: string;
  checked?: boolean;
  indeterminate?: boolean;
  isCollapsed?: boolean;   // 是否收起子目录
  children?: TreeData[];
}


