import { MenuItemType } from "@/enums"

export function useHelpers() {
  const createApiDetails = () => {
    console.log('createApiDetails')
  }

  const createApiRequest = () => {
    console.log('createApiRequest')
  }

  const createDoc = () => {
    console.log('createDoc')
  }

  const createApiSchema = () => {
    console.log('createApiSchema')
  }

  return {
    createApiDetails,
    createApiRequest,
    createDoc,
    createApiSchema,

    createTableItem: (item: MenuItemType) => {
      switch (item) {
        case MenuItemType.ApiDetail:
          createApiDetails()
          break
        
        case MenuItemType.HttpRequest:
          createApiRequest()
          break

        case MenuItemType.Doc:
          createDoc()
          break
        
        case MenuItemType.ApiSchema:
          createApiSchema()
          break
      }
    }
  }
}