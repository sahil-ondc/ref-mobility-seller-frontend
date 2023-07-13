import React from 'react'
import { Tabs } from 'antd'
import { CommonTabsProps } from 'interfaces'

const { TabPane } = Tabs

const CommonTabs: React.FC<CommonTabsProps> = ({ items }) => {
  const handleChange = (key: string) => {
    key
  }

  return (
    <Tabs defaultActiveKey={items[0].key} onChange={handleChange}>
      {items.map((item) => (
        <TabPane key={item.key} tab={item.label}>
          {item.children}
        </TabPane>
      ))}
    </Tabs>
  )
}

export default CommonTabs
