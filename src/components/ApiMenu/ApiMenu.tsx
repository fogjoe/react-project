import { useGlobalContext } from "@/contexts/global"
import { TreeProps } from "antd"
import { useApiMenuContext } from "./ApiMenuContext"
import { useMenuTabContext, useMenuTabHelpers } from "@/contexts/menu-tab-settings"

type TreeOnSelect = NonNullable<TreeProps['onSelect']>

/**
 * 侧边的菜单目录，以文件树的形式展示
 * 
 * 相关概念：
 * - 名词解释：菜单/目录（Menu）、文件夹（Folder）、文件（File），Folder 和 File 统称为 Menu。
 * - 文件夹可以包含文件和另一个文件夹，包含的关系以层级递进的形式展示。
 */

export function ApiMenu() {
  const { moveMenuItem } = useGlobalContext()
  const { expandedMenuKeys, addExpandedMenuKeys, removeExpandedMenuKeys,menuTree } = useApiMenuContext()

  const { } = useMenuTabContext()
  const {} = useMenuTabHelpers()
  return <></>
}
