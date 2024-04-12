import { HTTP_METHOD_CONFIG } from '@/configs/static'
import { HttpMethod } from '@/enums'

interface HttpIconProps {
  method?: HttpMethod
  className?: string
  text?: string
}

export function HttpMethodText({ method, className = '', text }: HttpIconProps) {
  if (!method) return
  try {
    const httpHethod = HTTP_METHOD_CONFIG[method]
    return (
      <span className={className} style={{ color: `var(${httpHethod.color})` }}>
        {text || httpHethod.text}
      </span>
    )
  } catch {
    return null
  }
}
