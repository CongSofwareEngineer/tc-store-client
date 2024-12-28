import { INIT_ZUSTAND, TYPE_ZUSTAND, ZUSTAND } from '@/constant/zustand'
import ClientApi from '@/services/clientApi'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// export const createCategoryMenuStore = (
//   initState: CategoryMenuStoreState = {
//     [ZUSTAND.CategoryMenu]: INIT_ZUSTAND[ZUSTAND.CategoryMenu],
//   },
// ) => {
//   return createStore<CategoryMenuStore>()(
//     devtools(
//       (set) => ({
//         ...initState,
//         setCategoryMenu: (categoryMenu: CategoryMenuStoreState) => set(categoryMenu),
//         fetchData: async () => {
//           try {
//             const menuCategory = await ClientApi.getCategory(true)
//             set(menuCategory?.data || [])
//           } catch (error) {}
//         },
//       }),
//       { name: ZUSTAND.CategoryMenu },
//     ),
//   )
// }
type CategoryData = TYPE_ZUSTAND[ZUSTAND.CategoryMenu]

type CategoryMenuStoreState = {
  [ZUSTAND.CategoryMenu]: CategoryData
}

type CategoryMenuStoreActions = {
  setCategoryMenu: (nextCategoryMenu: CategoryData) => void
  fetchData: () => Promise<void>
}

type CategoryMenuStore = CategoryMenuStoreState & CategoryMenuStoreActions

const zustandCategoryMenu = create<CategoryMenuStore>()(
  devtools(
    persist(
      (set) => ({
        [ZUSTAND.CategoryMenu]: INIT_ZUSTAND[ZUSTAND.CategoryMenu],
        setCategoryMenu: (categoryMenu: CategoryData) => {
          set({ [ZUSTAND.CategoryMenu]: categoryMenu })
        },
        fetchData: async () => {
          const menuCategory = await ClientApi.getCategory(true)
          set(menuCategory?.data || [])
        },
      }),
      {
        name: `zustand-${ZUSTAND.CategoryMenu}`,
      }
    ),
    {
      name: `zustand-${ZUSTAND.CategoryMenu}`,
      enabled: process.env.NODE_ENV !== 'production',
    }
  )
)

export const useCategoryMenu = () => {
  const data = zustandCategoryMenu((state) => state[ZUSTAND.CategoryMenu])
  const setCategoryMenu = zustandCategoryMenu((state) => state.setCategoryMenu)
  const fetchData = zustandCategoryMenu((state) => state.fetchData)

  return {
    categoryMenu: data,
    setCategoryMenu,
    fetchData,
  }
}
