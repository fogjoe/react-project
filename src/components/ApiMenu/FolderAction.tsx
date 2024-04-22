import { forwardRef } from "react";
import { ApiMenuData } from ".";
import { getCatalogType, getCreateType } from "@/helpers";
import { API_MENU_CONFIG } from "@/configs/static";
import { useHelpers } from "@/hooks/useHelpers";
import { Tooltip } from "antd";
import { MenuActionButton } from "./MenuActionButton";
import { MoreHorizontalIcon, PlusIcon } from "lucide-react";
import { DropdownActions } from "./DropdownActions";

/**
 * 菜单项的文件夹操作
 */
export function FolderAction(props: { catalog: ApiMenuData }) {
  const { catalog } = props

  const catalogType = getCatalogType(catalog.type)
  const { tipTitle } = API_MENU_CONFIG[catalogType]

  const { createTableItem } = useHelpers()

  return <>
    <Tooltip title={tipTitle}>
      <MenuActionButton icon={<PlusIcon size={14} />}
        onClick={(event) => {
          event.stopPropagation()
          createTableItem(getCreateType(catalog.type))
        }} />
    </Tooltip>

    <DropdownActions isFolder catalog={catalog}>
      <MenuActionButton
        icon={<MoreHorizontalIcon size={14} />}
        onClick={(ev) => {
          ev.stopPropagation()
        }}
      />
    </DropdownActions>
  </>
}