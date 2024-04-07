export function getPageTitle(title?: string): string {
  const mainTitle = 'Apifox UI'

  return title ? `${title} - ${mainTitle}` : mainTitle
}

