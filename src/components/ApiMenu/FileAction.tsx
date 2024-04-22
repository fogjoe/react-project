import { MoreHorizontalIcon } from "lucide-react";
import { ApiMenuData } from ".";
import { DropdownActions } from "./DropdownActions";
import { MenuActionButton } from "./MenuActionButton";

/**
 * 菜单项的文件操作
 */
export function FileAction(props: { catalog: ApiMenuData }) {
  const { catalog } = props

  return <DropdownActions catalog={catalog}>
    <MenuActionButton
      icon={<MoreHorizontalIcon size={24} />}
      onClick={(event) => {
      event.stopPropagation()
    }} />
  </DropdownActions>
}