import RightPanel from "./right-panel.vue";
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
    [propName: string]: any;
  };
}

export interface SettingData {
  sidebarLogo?: boolean;
  contentWidth?: 'fullWidth' | 'boxed';
  appBarType?: 'fixed' | 'static';
  footerType?: 'fixed' | 'static' | 'hidden';
  menuLayout?: 'vertical' | 'horizontal';
  menuCollapsed?: any;
  menuHidden?: boolean;
  [propName: string]: any;
}

export default RightPanel
