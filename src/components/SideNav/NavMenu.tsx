import React from 'react'

interface NavItemProps {
  active?: boolean
  name: string
  icon: React.ReactNode
}


function NavItem(props: NavItemProps) {
  const { active, name, icon } = props
}

export function NavMenu() {
  return <div>NavMenu</div>
}
