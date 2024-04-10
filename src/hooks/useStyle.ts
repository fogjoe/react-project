import { theme } from 'antd'

type Theme = ReturnType<typeof theme.useToken>

type StyleFunction<T> = (token: Theme) => T

/**
 * 其实可以在每个文件中定义一个 item 的类型，然后再引入 Theme，这样比较麻烦，
 * 于是封装为一个 hooks，便于共享
 * @param fn 参数为 token，结果为传入的泛型的函数
 * @returns 传入的泛型类型
 */
export function useStyles<T>(fn: StyleFunction<T>): {
  styles: ReturnType<StyleFunction<T>>
} {
  return { styles: fn(theme.useToken()) }
}
