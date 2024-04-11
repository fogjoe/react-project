import { CatalogType } from "@/enums";

export const API_MENU_CONFIG = {
  [CatalogType.Overview]: {
    title: '项目概况',
    newLabel: '',
    tipTitle: '',
    accentColor: '',
  },
  [CatalogType.Recycle]: {
    title: '回收站',
    newLabel: '',
    tipTitle: '',
    accentColor: '',
  },
  [CatalogType.Http]: {
    title: '接口',
    newLabel: '新建接口',
    tipTitle: '添加接口',
    accentColor: '#eb2f96',
  },
  [CatalogType.Schema]: {
    title: '数据模型',
    newLabel: '新建数据模型',
    tipTitle: '添加数据模型',
    accentColor: '#9373ee',
  },
  [CatalogType.Request]: {
    title: '快捷请求',
    newLabel: '新建快捷请求',
    tipTitle: '添加快捷请求',
    accentColor: 'rgb(95 128 233)',
  },
  [CatalogType.Markdown]: {
    title: 'Markdown',
    newLabel: '新建 Markdown',
    tipTitle: '添加 Markdown',
    accentColor: '#13c2c2',
  },
} as const satisfies Record<
  CatalogType,
  { title: string; tipTitle: string; newLabel: string; accentColor: string }
>

