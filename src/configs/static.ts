import { CatalogType, HttpMethod } from '@/enums'

/** 根目录 ID。 */
export const ROOT_CATALOG = '_'

/** 服务 ID： 继承自父级。 */
export const SERVER_INHERIT = ''

/** 有关 HTTP 方法的用于展示配置。 */
export const HTTP_METHOD_CONFIG = {
  [HttpMethod.Get]: {
    text: HttpMethod.Get,
    color: '--color-green-6'
  },
  [HttpMethod.Post]: {
    text: HttpMethod.Post,
    color: '--color-orange-6'
  },
  [HttpMethod.Put]: {
    text: HttpMethod.Put,
    color: '--color-blue-6'
  },
  [HttpMethod.Delete]: {
    text: 'DEL',
    color: '--color-volcano-6'
  },
  [HttpMethod.Options]: {
    text: 'OPT',
    color: '--color-blue-6'
  },
  [HttpMethod.Head]: {
    text: HttpMethod.Head,
    color: '--color-blue-6'
  },
  [HttpMethod.Patch]: {
    text: 'PAT',
    color: '--color-pink-6'
  },
  [HttpMethod.Trace]: {
    text: 'TRA',
    color: '--color-geekblue-6'
  }
} as const satisfies Record<
  HttpMethod,
  {
    text: string
    color: string
  }
>

export const API_MENU_CONFIG = {
  [CatalogType.Overview]: {
    title: '项目概况',
    newLabel: '',
    tipTitle: '',
    accentColor: ''
  },
  [CatalogType.Recycle]: {
    title: '回收站',
    newLabel: '',
    tipTitle: '',
    accentColor: ''
  },
  [CatalogType.Http]: {
    title: '接口',
    newLabel: '新建接口',
    tipTitle: '添加接口',
    accentColor: '#eb2f96'
  },
  [CatalogType.Schema]: {
    title: '数据模型',
    newLabel: '新建数据模型',
    tipTitle: '添加数据模型',
    accentColor: '#9373ee'
  },
  [CatalogType.Request]: {
    title: '快捷请求',
    newLabel: '新建快捷请求',
    tipTitle: '添加快捷请求',
    accentColor: 'rgb(95 128 233)'
  },
  [CatalogType.Markdown]: {
    title: 'Markdown',
    newLabel: '新建 Markdown',
    tipTitle: '添加 Markdown',
    accentColor: '#13c2c2'
  }
} as const satisfies Record<CatalogType, { title: string; tipTitle: string; newLabel: string; accentColor: string }>
