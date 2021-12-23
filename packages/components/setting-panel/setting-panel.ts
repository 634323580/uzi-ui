export interface SettingDesc {
  type: string;
  label: string;
  options?: { text: string; value: any }[];
  subComponent?: string;
  attrs?: {
    [propName: string]: any
  };
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
  contentWidth?: "fullWidth" | "boxed";
  appBarType?: "fixed" | "static";
  footerType?: "fixed" | "static" | "hidden";
  menuLayout?: "vertical" | "horizontal";
  menuCollapsed?: boolean;
  menuHidden?: boolean;
  [propName: string]: any;
}

export const CATCH_KEY = '__panelData__'

export const defaultSetting: Setting[] = [
  {
    title: "Page style setting",
    desc: {
      sidebarLogo: {
        type: "el-switch",
        label: "Sidebar Logo",
      },
    },
  },
  {
    title: "Layout",
    desc: {
      contentWidth: {
        type: "el-radio-group",
        label: "Content Width",
        subComponent: "el-radio",
        options: [
          {
            text: "Full Width",
            value: "fullWidth",
          },
          {
            text: "Boxed",
            value: "boxed",
          },
        ],
        attrs: {
          style: {
            width: "100%",
          },
        },
      },
      appBarType: {
        type: "el-radio-group",
        label: "AppBar Type",
        subComponent: "el-radio",
        options: [
          {
            text: "Fixed",
            value: "fixed",
          },
          {
            text: "Static",
            value: "static",
          },
        ],
        attrs: {
          style: {
            width: "100%",
          },
        },
      },
      footerType: {
        type: "el-radio-group",
        label: "Footer Type",
        subComponent: "el-radio",
        options: [
          {
            text: "Fixed",
            value: "fixed",
          },
          {
            text: "Static",
            value: "static",
          },
          {
            text: "Hidden",
            value: "hidden",
          },
        ],
        attrs: {
          style: {
            width: "100%",
          },
        },
      },
    },
  },
  {
    title: "MENU",
    desc: {
      menuLayout: {
        type: "el-radio-group",
        label: "Menu Layout",
        subComponent: "el-radio",
        options: [
          {
            text: "Vertical",
            value: "vertical",
          },
          {
            text: "Horizontal",
            value: "horizontal",
          },
        ],
        attrs: {
          style: {
            width: "100%",
          },
        },
      },
      menuCollapsed: {
        type: "el-switch",
        label: "Menu Collapsed",
      },
      menuHidden: {
        type: "el-switch",
        label: "Menu Hidden",
      },
    },
  },
];
