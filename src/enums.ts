/** 接口菜单顶级目录的分类类型。 */
export const enum CatalogType {
  /** 项目概况。 */
  Overview = 'overview',
  /** 接口。 */
  Http = 'http',
  /** 数据模型。 */
  Schema = 'schema',
  /** 快捷请求。 */
  Request = 'request',
  /** 回收站。 */
  Recycle = 'recycle',
  /** Markdown 文件。 */
  Markdown = 'markdown',
}

export const enum MenuItemType {
  ApiDetail = 'apiDetail',
  ApiDetailFolder = 'apiDetailFolder',
  ApiSchema = 'apiSchema',
  ApiSchemaFolder = 'apiSchemaFolder',
  RequestFolder = 'requestFolder',
  HttpRequest = 'httpRequest',
  Doc = 'doc'
}
