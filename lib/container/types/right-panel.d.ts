export interface SettingDesc {
  type: string;
  label: string;
  options?: { text: string; value: any }[];
  subComponent?: string;
  attrs?: any;
}

export interface Setting {
  title: string;
  desc: {
    sidebarLogo?: SettingDesc;
    contentWidth?: SettingDesc;
    appBarType?: SettingDesc;
    footerType?: SettingDesc;
    menuLayout?: SettingDesc;
    menuCollapsed?: SettingDesc;
    menuHidden?: SettingDesc;
    [propName: string]: SettingDesc;
  };
}

export interface SettingData {
  sidebarLogo?: boolean;
  contentWidth?: string;
  appBarType?: string;
  footerType?: string;
  menuLayout?: string;
  menuCollapsed?: any;
  menuHidden?: boolean;
  [propName: string]: any;
}
